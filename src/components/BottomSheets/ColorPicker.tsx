import { forwardRef, useState } from "react";
import { View } from "react-native";
import ColorPicker, {
  Panel1,
  HueSlider,
  returnedResults,
} from "reanimated-color-picker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps, IndividualSheetData } from "./@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

type Props = BottomSheetProps & IndividualSheetData<"COLOR_PICKER">;

function Content({ data, close }: Props) {
  const [hex, setHex] = useState(data.value);

  const onSelectColor = (color: returnedResults) => {
    setHex(color.hex);
  };

  const onSave = () => {
    data.onChange(hex);
    close();
  };

  return (
    <BottomSheetView>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          Color Picker
        </Text>
        <Text className="text-gray-500">Select a Color</Text>
      </View>

      <View className="gap-2">
        <ColorPicker value={hex} onComplete={onSelectColor} boundedThumb>
          <View className="gap-2">
            <Panel1 />
            <HueSlider />
          </View>
        </ColorPicker>

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

const ColorPickerSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function ColorPickerSheet(props, ref) {
    return (
      <BottomSheet
        ref={ref}
        children={(data) => <Content {...props} data={data.data} />}
      />
    );
  },
);

export default ColorPickerSheet;
