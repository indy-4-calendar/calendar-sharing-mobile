import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import Skeleton from "@/ui/Skeleton";
import SafeAreaView from "@/ui/SafeAreaView";
import Calendar from "@/components/Calendar";
import useCalendarStore from "@/store/calendar";
import { useGetCalendar } from "@/hooks/api/calendars";
import useBottomSheetStore from "@/store/bottom-sheets";

export default function Home() {
  const calendarStore = useCalendarStore();
  const bottomSheetStore = useBottomSheetStore();
  const query = useGetCalendar(calendarStore.calendar);

  const onShareCalendar = () => {
    bottomSheetStore.open("SHARE_CALENDAR", { id: calendarStore.calendar! });
  };

  if (query.isLoading) return <LoadingState />;

  const events = query.data!.events;
  const calendar = query.data!.calendar!;

  return (
    <SafeAreaView className="flex-1 gap-6 px-4 pb-24 pt-8">
      <View className="flex-row items-center justify-between">
        <Text size="2xl" className="font-bold text-gray-800">
          {calendar.name}
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

function LoadingState() {
  return (
    <SafeAreaView className="flex-1 gap-6 px-4 pb-24 pt-8">
      <View className="flex-row items-center justify-between">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="size-12 !rounded-full" />
      </View>

      <Skeleton className="flex-1 rounded-xl" />
    </SafeAreaView>
  );
}
