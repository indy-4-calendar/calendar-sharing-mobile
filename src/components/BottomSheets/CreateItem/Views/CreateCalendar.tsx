import { View } from "react-native";

import { BottomSheetProps } from "../../@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import useKeyboardListener from "@/hooks/useKeyboardListener";
import useFormMutation from "@/hooks/useFormMutation";
import validators from "@/constants/validators";
import { useCreateCalendar } from "@/hooks/api/calendars";
import Toast from "react-native-toast-message";

interface Props extends BottomSheetProps {
  setView: (view: number) => void;
}

export default function CreateCalendarView({
  close,
  setView,
  snapToIndex,
  snapToPosition,
}: Props) {
  const mutation = useCreateCalendar();

  const formValidators = {
    name: validators.string,
    description: validators.string,
    color: validators.color,
  };

  const form = useFormMutation({
    mutation,
    validators: formValidators,
    initialValues: {
      name: "",
      description: "",
      color: "",
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "Calendar Created",
        text2: "Your calendar has been created successfully",
      });
    },
  });

  useKeyboardListener({
    onKeyboardWillShow: () => {
      snapToPosition("80%");
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
        <FormField
          placeholder="Calendar Name"
          value={form.state.name.value}
          error={form.state.name.error}
          onChangeText={(value) => form.setValue("name", value)}
        />
        <FormField
          placeholder="Calendar Description"
          value={form.state.description.value}
          error={form.state.description.error}
          onChangeText={(value) => form.setValue("description", value)}
        />
        <FormField
          placeholder="Calendar Color"
          value={form.state.color.value}
          error={form.state.color.error}
          onChangeText={(value) => form.setValue("color", value)}
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
