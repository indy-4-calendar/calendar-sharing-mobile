import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import { ICalendar } from "@/@types";
import classNames from "classnames";

interface Props {
  calendar: ICalendar;
}

export default function CalendarSelector({ calendar }: Props) {
  const containerClasses = classNames(
    "flex-row items-center gap-4",
    "rounded-xl bg-gray-100 p-4",
  );

  const onPress = () => {};

  return (
    <TouchableOpacity className={containerClasses} onPress={onPress}>
      <View
        className="size-5 rounded-md"
        style={{ backgroundColor: calendar.color }}
      />

      <View className="flex-1">
        <Text className="font-medium text-gray-800" lines={1}>
          {calendar.name}
        </Text>
        <Text size="sm" className="text-gray-500" lines={2}>
          {calendar.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
