import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { View } from "react-native";
import { forwardRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps, IndividualSheetData } from "./@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

type Props = BottomSheetProps & IndividualSheetData<"DATE_TIME_PICKER">;

function Content({ data, close }: Props) {
  const [date, setDate] = useState(data.value);

  const onChange = (_: DateTimePickerEvent, newDate?: Date) => {
    if (newDate) setDate(newDate);
  };

  const onSave = () => {
    data.onChange(date);
    close();
  };

  return (
    <BottomSheetView>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          Date Picker
        </Text>
        <Text className="text-gray-500">Select the date and time</Text>
      </View>

      <View className="gap-2">
        <RNDateTimePicker
          value={date}
          display="spinner"
          mode="datetime"
          onChange={onChange}
        />
        <View className="flex-row gap-2">
          <Button color="secondary" className="flex-1" onPress={close}>
            Cancel
          </Button>
          <Button className="flex-1" onPress={onSave}>
            Save
          </Button>
        </View>
      </View>
    </BottomSheetView>
  );
}

const DateTimePickerSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function DateTimePickerSheet(props, ref) {
    return (
      <BottomSheet
        ref={ref}
        children={(data) => <Content {...props} data={data.data} />}
      />
    );
  },
);

export default DateTimePickerSheet;
