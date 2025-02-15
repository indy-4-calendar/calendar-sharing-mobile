import { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps } from "./@types";

import Text from "@/ui/Text";
import Skeleton from "@/ui/Skeleton";
import BottomSheet from "@/ui/BottomSheet";
import CalendarSelector from "@/ui/CalendarSelector";
import { useGetCalendars } from "@/hooks/api/calendars";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

type Props = BottomSheetProps;

function Content({}: Props) {
  const query = useGetCalendars();

  const calendars = query.data?.calendars || [];

  return (
    <BottomSheetView>
      <View>
        <Text size="xl" className="font-medium text-gray-800">
          Switch Calendars
        </Text>
        <Text className="text-gray-500">
          Select the calendar that you want to view
        </Text>
      </View>

      {query.isLoading && <LoadingState />}

      {query.isSuccess && (
        <View className="gap-2">
          {calendars.map((calendar, i) => (
            <CalendarSelector key={i} calendar={calendar} />
          ))}
        </View>
      )}
    </BottomSheetView>
  );
}

function LoadingState() {
  return (
    <View className="gap-2">
      {new Array(3).fill(null).map((_, i) => (
        <Skeleton key={i} className="h-20" />
      ))}
    </View>
  );
}

const SwitchCalendarSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function SwitchCalendarSheet(props, ref) {
    return <BottomSheet ref={ref} children={<Content {...props} />} />;
  },
);

export default SwitchCalendarSheet;
