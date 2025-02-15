import { z } from 'zod';

// prettier-ignore
const validators = {
  /**
   * MongoDB ObjectID or UUID (as the primary key for a document)
   */
  objectId: z
    .string({
      required_error: 'ID is required',
      invalid_type_error: 'ID must be a string',
    })
    .regex(/^[a-fA-F0-9]{24}$/, {
      message: 'ID must be a valid ObjectID or UUID, or string',
    })
    .or(
      z.string({
        required_error: 'ID is required',
        invalid_type_error: 'ID must be a string',
      })
      .uuid({
        message: 'ID must be a valid ObjectID, UUID, or string',
      }),
    ),    

  /**
   * Color hex
   */
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
      message: 'Invalid color',
    }),

    /**
     * Strings
     */
  string: z
    .string({
      required_error: 'String is required',
      invalid_type_error: 'String must be a string',
    })
    .min(1, {
      message: 'String must be at least 1 character',
    }),
    
  /**
   * Validates user first names
   */
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1, {
      message: 'Name must be at least 1 character',
    })
    .max(32, {
      message: 'Name must be at most 32 characters',
    }),

  /**
   * Validates user last names
   */
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1, {
      message: 'Name must be at least 1 character',
    })
    .max(48, {
      message: 'Name must be at most 48 characters',
    }),

};

export default validators;
