import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from "react-native";
import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";

import Text from "@/ui/Text";
import classNames from "classnames";

// This is a hack to disable font scaling for all text input components
const TextInputWithNoFontScaling = Object.assign(RNTextInput, {
  defaultProps: {
    ...(RNTextInput as any).defaultProps,
    allowFontScaling: false,
  },
});

interface FormFieldProps extends RNTextInputProps {
  placeholder: string;
  style?: any;
  contentContainerStyle?: any;
  error?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  placeholder,
  disabled,
  style,
  contentContainerStyle,
  error,
  value,
  onFocus,
  onBlur,
  onChangeText,
  ...props
}) => {
  const inputRef = useRef<RNTextInput>(null);
  const placeholderY = useSharedValue(18);
  const placeholderSize = useSharedValue(16);

  const [focused, setFocused] = useState(false);

  // If we have a value when we load the component, animate the placeholder up
  useEffect(() => {
    if (value) animatePlaceholder(10, 12);
  }, []);

  // If we set a value to undefined (clearing the input), animate the placeholder back down
  useEffect(() => {
    if (value === undefined) {
      animatePlaceholder(18, 16);
    }
  }, [value]);

  /**
   * Animate between the placeholder's focused and unfocused states
   */
  const animatePlaceholder = (toYValue: number, toFontSize: number) => {
    runOnUI(() => {
      placeholderY.value = withTiming(toYValue, { duration: 200 });
      placeholderSize.value = withTiming(toFontSize, { duration: 200 });
    })();
  };

  /**
   * When the container is pressed, focus the input (this is a hack
   * to make the entire container pressable)
   */
  const onContainerPress = () => {
    inputRef.current?.focus();
  };

  const containerClasses = classNames(
    "relative w-full -z-10",
    disabled && "disabled",
    contentContainerStyle,
  );

  const inputClasses = classNames(
    "border px-5 py-5 rounded-xl text-base leading-5 bg-gray-100 h-16",
    // If there is a value or the input is focused, we need to add padding to the input to make it "look"
    // like the placeholder is in the input and they are both centered
    (focused || value) && "pt-6 pb-3",
    // DEFAULT State
    !error && !focused && "border-gray-100",
    // FOCUS State
    !error && focused && "border-gray-200",
    // ERROR State
    error && "border-red-500",
    style,
  );

  const placeholderClasses = classNames(
    "absolute z-10 px-4 bg-gray-100 left-1.5 text-gray-500 flex-1",
    disabled && "disabled",
    error && "text-red-500",
  );

  const animatedPlaceholderStyles = useAnimatedStyle(() => ({
    top: placeholderY.value,
    fontSize: placeholderSize.value,
  }));

  const valueClasses = classNames("text-base leading-0 text-primary");

  return (
    <Pressable className={containerClasses} onPress={onContainerPress}>
      <TextInputWithNoFontScaling
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor={"transparent"}
        editable={!disabled}
        className={inputClasses}
        onChangeText={onChangeText}
        onFocus={(e) => {
          onFocus?.(e);
          setFocused(true);
          animatePlaceholder(10, 12);
        }}
        onBlur={(e) => {
          onBlur?.(e);
          setFocused(false);

          if (!value) animatePlaceholder(18, 16);
        }}
        {...props}
      >
        <Text className={valueClasses}>{value}</Text>
      </TextInputWithNoFontScaling>

      {/* The placeholder, which animates up and down */}
      <Animated.Text
        numberOfLines={1}
        className={placeholderClasses}
        style={animatedPlaceholderStyles}
      >
        {error || placeholder}
      </Animated.Text>
    </Pressable>
  );
};

export default FormField;
