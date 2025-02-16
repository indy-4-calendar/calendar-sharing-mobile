import { useMemo } from "react";
import classNames from "classnames";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import useBottomSheetStore from "@/store/bottom-sheets";

interface Props {
  placeholder: string;
  error?: string;
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({
  value,
  placeholder,
  error,
  onChange,
}: Props) {
  const bottomSheetStore = useBottomSheetStore();

  const containerClasses = classNames(
    "flex-row items-center gap-2 rounded-xl bg-gray-100 px-5 h-16",
    { "border border-red-500": error },
  );

  const openColorPicker = () => {
    bottomSheetStore.open("DATE_TIME_PICKER", { value, onChange });
  };

  // Format date as Jul 12, 2025
  const date = useMemo(() => {
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [value]);

  // Format time as 12:00 PM
  const time = useMemo(() => {
    return value.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }, [value]);

  return (
    <TouchableOpacity className={containerClasses} onPress={openColorPicker}>
      <Text className="flex-1 text-gray-500" lines={1}>
        {error || placeholder}
      </Text>

      <View className="flex-row gap-1">
        <View className="rounded-md bg-gray-200 px-2 py-1">
          <Text size="xs">{date}</Text>
        </View>
        <View className="rounded-md bg-gray-200 px-2 py-1">
          <Text size="xs">{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
