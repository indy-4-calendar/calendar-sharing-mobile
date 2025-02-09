import { AxiosError } from "axios";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text from "@/ui/Text";
import colors from "tailwindcss/colors";

interface Props {
  error: Error | null;
  style?: any;
  description?: string;
  fallbackMessage?: string;
}

export default function ErrorMessage({
  error,
  description,
  fallbackMessage,
}: Props) {
  const httpError = (() => {
    if (error instanceof AxiosError) {
      const humanMessage = error.response?.data.error?.humanMessage;

      if (humanMessage) return humanMessage;
    }

    if (fallbackMessage) {
      return fallbackMessage;
    }

    return error?.message;
  })();

  const title = description || "An error occurred";

  return (
    <View className="items-center justify-center gap-2">
      <Ionicons name="warning" color={colors.gray[800]} size={36} />

      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          {title}
        </Text>
        <Text size="sm" className="text-center text-gray-500">
          {httpError}
        </Text>
      </View>
    </View>
  );
}
