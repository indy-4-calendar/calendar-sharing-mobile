import { View } from "react-native";
import Toast from "react-native-toast-message";

import { BottomSheetProps } from "../../@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import ColorPicker from "@/ui/ColorPicker";
import validators from "@/constants/validators";
import useCalendarStore from "@/store/calendar";
import DateTimePicker from "@/ui/DateTimePicker";
import useFormMutation from "@/hooks/useFormMutation";
import { useCreateEvent } from "@/hooks/api/calendars";
import useKeyboardListener from "@/hooks/useKeyboardListener";

interface Props extends BottomSheetProps {
  setView: (view: number) => void;
}

export default function CreateEventView({
  close,
  setView,
  snapToIndex,
  snapToPosition,
}: Props) {
  const mutation = useCreateEvent();
  const calendar = useCalendarStore((state) => state.calendar);

  const formValidators = {
    id: validators.objectId,
    name: validators.string,
    description: validators.string,
    color: validators.color,
    date: validators.date,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      id: calendar!,
      name: "",
      description: "",
      color: "#ff0000",
      date: new Date(),
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "Event Created",
        text2: "Your event has been added to the calendar",
      });
    },
  });

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("90%");
    },
    onKeyboardWillHide: () => {
      snapToIndex(0);
    },
  });

  const onPrevious = () => {
    setView(0);
  };

  return (
    <>
      <View>
        <Text size="xl" className="font-semibold text-gray-800">
          New Event
        </Text>
        <Text className="text-gray-500">
          Provide some more details about your event
        </Text>
      </View>

      <View className="gap-2">
        <FormField
          placeholder="Event Name"
          value={form.state.name.value}
          error={form.state.name.error}
          onChangeText={(value) => form.setValue("name", value)}
        />
        <FormField
          placeholder="Event Description"
          value={form.state.description.value}
          error={form.state.description.error}
          onChangeText={(value) => form.setValue("description", value)}
        />
        <ColorPicker
          placeholder="Event Color"
          value={form.state.color.value}
          error={form.state.color.error}
          onChange={(value) => form.setValue("color", value)}
        />
        <DateTimePicker
          placeholder="Event Date"
          value={form.state.date.value}
          error={form.state.date.error}
          onChange={(value) => form.setValue("date", value)}
        />

        <View className="flex-row gap-2">
          <Button color="secondary" className="flex-1" onPress={onPrevious}>
            Go Back
          </Button>
          <Button
            className="flex-1"
            onPress={form.handleSubmission}
            loading={form.loading}
          >
            Create
          </Button>
        </View>
      </View>
    </>
  );
}
