import { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps, IndividualSheetData } from "./@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import Skeleton from "@/ui/Skeleton";
import { ICalendar } from "@/@types";
import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";
import { useGetCalendar, useJoinCalendar } from "@/hooks/api/calendars";
import useAuthStore from "@/store/auth";

type Props = BottomSheetProps & IndividualSheetData<"JOIN_CALENDAR">;

function Content({ data, close }: Props) {
  const query = useGetCalendar(data.id);

  const user = useAuthStore((state) => state.user);
  const calendar = (query.data?.calendar || {}) as ICalendar;

  const mutation = useJoinCalendar();

  const onJoin = async () => {
    await mutation.mutate({ id: data.id });
    close();
  };

  return (
    <BottomSheetView className="items-center">
      {query.isLoading && <LoadingState />}

      {query.isSuccess && user?.calendars.includes(calendar._id) && (
        <View className="items-center gap-4">
          <Text size="2xl" className="text-center font-semibold text-gray-800">
            Already Joined
          </Text>
          <Text className="text-center text-gray-500">
            You are already a member of this calendar. You can view and create
            events, share them with friends, and more.
          </Text>
        </View>
      )}

      {query.isSuccess && !user?.calendars.includes(calendar._id) && (
        <>
          <View className="rounded-full bg-blue-50 px-4 py-1">
            <Text size="sm" className="font-medium text-blue-500">
              You're Invited To...
            </Text>
          </View>

          <View className="items-center">
            <Text
              size="2xl"
              className="text-center font-semibold text-gray-800"
            >
              {calendar.name}
            </Text>
            <Text className="text-center text-gray-500">
              You have been invited to join "{calendar.name}". Joining this
              calendar will allow you to view and create events, share them with
              friends, and more. Please click the button below to join.
            </Text>
          </View>

          <Button
            className="mt-4"
            onPress={onJoin}
            loading={mutation.isPending}
          >
            Join Calendar
          </Button>
        </>
      )}
    </BottomSheetView>
  );
}

function LoadingState() {
  return (
    <View className="items-center gap-4">
      <Skeleton className="h-8 w-48 !rounded-full" />

      <View className="items-center gap-1">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-32 w-96" />
      </View>

      <Skeleton className="h-14 w-96" />
    </View>
  );
}

const JoinCalendarSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function JoinCalendarSheet(props, ref) {
    return (
      <BottomSheet
        ref={ref}
        children={(data) => <Content {...props} data={data.data!} />}
      />
    );
  },
);

export default JoinCalendarSheet;
