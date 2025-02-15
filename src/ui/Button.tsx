/*
 * Created on Fri Mar 08 2024
 *
 * This software is the proprietary property of CampusRush.
 * All rights reserved. Unauthorized copying, modification, or distribution
 * of this software, in whole or in part, is strictly prohibited.
 * For licensing information contact CampusRush.
 *
 * Copyright (c) 2024 CampusRush
 * Do not distribute
 */

import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import Text from "@/ui/Text";
import classNames from "classnames";
import colors from "tailwindcss/colors";

export type ButtonColor = "primary" | "secondary";

interface ButtonProps extends TouchableOpacityProps {
  color?: ButtonColor;
  style?: any;
  textStyle?: any;
  loading?: boolean;
  children: React.ReactNode;
}

/**
 * The colors of the button
 */
const ButtonColors = {
  primary: {
    container: "bg-gray-800",
    text: "text-white",
    icon: colors.white,
  },
  secondary: {
    container: "bg-gray-100",
    text: "text-gray-800",
    icon: colors.gray[800],
  },
};

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  style,
  textStyle,
  loading = false,
  disabled = false,
  children,
  ...props
}) => {
  // Set the button to disabled if it's loading or if it's explicitly disabled
  disabled = loading || disabled;

  const colorStyle = ButtonColors[color];

  const containerClasses = classNames(
    "flex-row items-center justify-center gap-2.5 w-full",
    "px-2 py-3 rounded-xl ",
    disabled && "disabled",
    colorStyle.container,
    style,
  );

  const textClasses = classNames(
    "text-center font-medium text-base",
    loading && "opacity-0",
    colorStyle.text,
    textStyle,
  );

  return (
    <TouchableOpacity
      className={containerClasses}
      disabled={disabled}
      {...props}
    >
      <Text className={textClasses}>{children}</Text>

      {loading && (
        <ActivityIndicator
          size="small"
          color={colorStyle.icon}
          className="absolute bottom-0 left-0 right-0 top-0"
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;
