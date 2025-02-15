import { BaseToast, type BaseToastProps } from "react-native-toast-message";

import colors from "tailwindcss/colors";

const toastConfig = {
  /**
   * The successs modal, shows a green checkmark with the content
   */
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.gray[800],
        width: "91%",
        height: 72,
        borderLeftWidth: 0,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.white, fontSize: 14, fontWeight: "600" }}
      text2Style={{ color: colors.gray[200], fontSize: 12 }}
    />
  ),
  /**
   * The error modal, shows a red warning icon with the content
   */
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.gray[800],
        width: "91%",
        height: 72,
        borderLeftWidth: 0,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.white, fontSize: 14, fontWeight: "600" }}
      text2Style={{ color: colors.gray[200], fontSize: 12 }}
    />
  ),
  /**
   * The warning modal, shows a yellow-500 warning icon with the content
   */
  warning: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: colors.gray[800],
        width: "91%",
        height: 72,
        borderLeftWidth: 0,
        paddingVertical: 24,
      }}
      text1Style={{ color: colors.white, fontSize: 14, fontWeight: "600" }}
      text2Style={{ color: colors.gray[200], fontSize: 12 }}
    />
  ),
  /**
   * The info modal, shows a blue info icon with the content
   */
  info: (props: BaseToastProps) => {
    return (
      <BaseToast
        {...props}
        style={{
          backgroundColor: colors.gray[800],
          width: "91%",
          height: 72,
          borderLeftWidth: 0,
          paddingVertical: 24,
        }}
        text1Style={{ color: colors.white, fontSize: 14, fontWeight: "600" }}
        text2Style={{ color: colors.gray[200], fontSize: 12 }}
      />
    );
  },
};

export default toastConfig;
