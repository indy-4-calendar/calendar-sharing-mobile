import classNames from "classnames";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

import { BottomSheetProps } from "../../@types";

import Text from "@/ui/Text";

interface Props extends BottomSheetProps {
  setView: (view: number) => void;
}

export default function LandingView({ setView }: Props) {
  const listItemClasses = classNames(
    "flex-row items-center justify-between gap-4",
    "rounded-xl bg-gray-100 p-4 gap-4",
  );

  const onNewCalendar = () => {
    setView(2);
  };

  const onNewEvent = () => {
    setView(1);
  };

  return (
    <>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          Get Started
        </Text>
        <Text className="text-gray-500">What would you like to create?</Text>
      </View>

      <View className="gap-2">
        <TouchableOpacity className={listItemClasses} onPress={onNewCalendar}>
          <Ionicons name="calendar" size={20} />

          <View className="flex-1">
            <Text className="font-medium text-gray-800">New Calendar</Text>
            <Text size="sm" className="text-gray-500" lines={1}>
              Create a new calendar to share with friends
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className={listItemClasses} onPress={onNewEvent}>
          <Ionicons name="create" size={20} />

          <View className="flex-1">
            <Text className="font-medium text-gray-800">New Event</Text>
            <Text size="sm" className="text-gray-500" lines={1}>
              Create a new event for this calendar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
