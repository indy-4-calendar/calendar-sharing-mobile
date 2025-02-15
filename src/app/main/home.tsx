import { useMemo } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import SafeAreaView from "@/ui/SafeAreaView";
import Calendar from "@/components/Calendar";
import useCalendarStore from "@/store/calendar";
import { useGetCalendar } from "@/hooks/api/calendars";
import useBottomSheetStore from "@/store/bottom-sheets";

export default function Home() {
  const calendarStore = useCalendarStore();
  const bottomSheetStore = useBottomSheetStore();
  const query = useGetCalendar(calendarStore.calendar);

  // Get the date as Month Day, like July 31st
  const currentDate = useMemo(() => {
    const date = new Date();
    const day = date.getDate();

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    const dateString = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    return dateString + daySuffix;
  }, []);

  const onShareCalendar = () => {
    bottomSheetStore.open("SHARE_CALENDAR", { id: calendarStore.calendar! });
  };

  const events = query.data?.events ?? [];

  return (
    <SafeAreaView className="flex-1 gap-6 px-4 pb-24 pt-8">
      <View className="flex-row items-center justify-between">
        <Text size="2xl" className="font-bold text-gray-800">
          Today is {currentDate}
        </Text>
        <TouchableOpacity
          className="rounded-full bg-gray-200 p-2"
          onPress={onShareCalendar}
        >
          <Ionicons name="share-outline" size={24} />
        </TouchableOpacity>
      </View>

      <Calendar events={events} />
    </SafeAreaView>
  );
}
