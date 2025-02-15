import { z } from 'zod';
import { useState } from 'react';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import type { UseMutationResult } from '@tanstack/react-query';

import { API } from '@/@types';

interface IUseFormMutation<TResponse, TRequest, TValues> {
  /** The mutation hook from react-query */
  mutation: UseMutationResult<any, unknown, TRequest, unknown>;

  /** The zod-ready validation schema for the request (will be passed to zod.object) */
  validators: Record<keyof TValues, any>;

  /** The callback to be executed on success */
  onSuccess?: (data: API.SuccessResponse<TResponse>) => Promise<void>;

  /** The initial values for a form (optional) */
  initialValues?: Record<string, any>;
}

const useFormMutation = <
  TResponse,
  TRequest,
  TValues extends Record<string, any>,
>({
  mutation,
  validators,
  onSuccess,
  initialValues,
}: IUseFormMutation<TResponse, TRequest, TValues>) => {
  /**
   * Create types for the fields and state so that it
   * auto-completes the fields and their values when typing (based on the validators object)
   */
  type TFields = keyof typeof validators;

  type TState = {
    [K in TFields]: {
      value: any;
      error: string;
    };
  };

  const initialState = Object.fromEntries(
    Object.keys(validators).map((key) => [
      key,
      { value: initialValues ? initialValues[key] : undefined, error: '' },
    ]),
  ) as TState;

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);

  /**
   * Take the internal state and transform it into a state that can be used
   * for data submission and validators: {key: key, key2: key2, etc: etc}
   */
  const transformedState = Object.fromEntries(
    Object.entries(state).map(([key, value]) => [key, value.value]),
  );

  /**
   * Set the value of a field in the state, this is essentially a more
   * controlled version of the normal setState function in React
   */
  const setValue = (key: TFields, value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        value,
        error: '', // Clear the error when the value is changed
      },
    }));
  };

  /**
   * Set the error of a field in the state, this is essentially a more
   * controlled version of the normal setState function in React
   */
  const setError = (key: TFields, error: string) => {
    setState((prev) => ({
      ...prev,
      [key]: {
        value: prev[key].value,
        error,
      },
    }));
  };

  /**
   * Checks whether form is valid & sets the error fields in the state. Can be used
   * to check the state before submission. **Note**: This function will automatically
   * run when the form is submitted
   */
  const validateState = () => {
    const validatorsSchema = z.object(validators);
    const validatorsResult = validatorsSchema.safeParse(transformedState);

    if (validatorsResult.success === false) {
      const errors = validatorsResult.error.errors;

      for (const error of errors) {
        const field = error.path.join('.');

        setError(field as TFields, error.message);
      }

      return false;
    }

    return true;
  };

  /**
   * The main function that will be used to submit the form. This function
   * will handle the validators and the API call, along with
   * error handling and loading state
   */
  const handleSubmission = async () => {
    setLoading(true);

    /** Step 1: Validate the form client side */
    const isStateValid = validateState();

    if (isStateValid === false) {
      setLoading(false);
      return;
    }

    /** Step 2: Call the API */
    try {
      const res = await mutation.mutateAsync(transformedState as TRequest);

      if ('error' in res) return;

      await onSuccess?.(res);
    } catch (err) {
      if (err instanceof AxiosError) {
        const error = (err.response?.data as API.ErrorResponse).error;
        const errorField = error.field as string; // We can assume the field will be defined, because we catch all errors with no field in the Axios Provider

        const isFieldInState = Object.keys(state).includes(errorField);

        if (!isFieldInState) {
          Toast.show({
            type: 'error',
            text1: 'An error occurred',
            text2: error.humanMessage,
          });

          return;
        }

        setError(errorField, error.humanMessage);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setState(initialState);
  };

  return {
    state,
    clear,
    loading,
    setValue,
    setError,
    validateState,
    handleSubmission,
  };
};

export default useFormMutation;
