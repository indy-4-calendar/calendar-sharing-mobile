import { View } from "react-native";

import { BottomSheetProps } from "../../@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface Props extends BottomSheetProps {
  setView: (view: number) => void;
}

export default function CreateEventView({
  setView,
  snapToIndex,
  snapToPosition,
}: Props) {
  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("90%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const onCreate = () => {};

  const onPrevious = () => {
    setView(0);
  };

  return (
    <>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          New Calendar
        </Text>
        <Text className="text-gray-500">
          Provide some more details about your calendar
        </Text>
      </View>

      <View className="gap-2">
        <FormField placeholder="Event Name" />
        <FormField placeholder="Event Description" />
        <FormField placeholder="Event Color" />
        <FormField placeholder="Event Date" />

        <View className="flex-row gap-2">
          <Button color="secondary" className="flex-1" onPress={onPrevious}>
            Go Back
          </Button>
          <Button className="flex-1">Create</Button>
        </View>
      </View>
    </>
  );
}
