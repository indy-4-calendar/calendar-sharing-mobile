import { forwardRef } from "react";
import * as Haptics from "expo-haptics";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps, IndividualSheetData } from "./@types";

import Text from "@/ui/Text";
import { Urls } from "@/constants";
import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

type Props = BottomSheetProps & IndividualSheetData<"SHARE_CALENDAR">;

function Content({ data }: Props) {
  const url = `${Urls.ApiUrl}/calendars/${data.id}/join`;

  const onCopyLink = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Clipboard.setStringAsync(url);
    Toast.show({
      type: "success",
      text1: "Link copied",
      text2: "You can now share the link with your friends.",
    });
  };

  return (
    <BottomSheetView>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          Share Calendar
        </Text>
        <Text className="text-gray-500">
          Share the link below with friends to add them to your calendar.
        </Text>
      </View>

      <View className="flex-row items-center justify-between gap-2 rounded-xl bg-gray-100 p-4">
        <View className="flex-1">
          <Text className="font-medium text-gray-800">Calendar Link</Text>
          <Text size="sm" className="text-gray-500" lines={1}>
            {url}
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-xl bg-gray-200 p-3"
          onPress={onCopyLink}
        >
          <Ionicons name="copy-outline" size={18} />
        </TouchableOpacity>
      </View>
    </BottomSheetView>
  );
}

const ShareCalendarSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function ShareCalendarSheet(props, ref) {
    return (
      <BottomSheet
        ref={ref}
        children={(data) => <Content {...props} data={data.data} />}
      />
    );
  },
);

export default ShareCalendarSheet;
