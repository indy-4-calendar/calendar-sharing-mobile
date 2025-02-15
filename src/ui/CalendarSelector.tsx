import classNames from "classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import { ICalendar } from "@/@types";
import useCalendarStore from "@/store/calendar";

interface Props {
  calendar: ICalendar;
}

export default function CalendarSelector({ calendar }: Props) {
  const calendarStore = useCalendarStore();

  const isSelected = calendarStore.calendar === calendar._id;

  const containerClasses = classNames(
    "flex-row items-center gap-4",
    "rounded-xl bg-gray-100 p-4",
  );

  const onPress = () => {
    calendarStore.setCalendar(calendar._id);
  };

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

      {isSelected && <Ionicons name="checkmark" size={20} />}
    </TouchableOpacity>
  );
}
