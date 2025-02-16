import { forwardRef } from "react";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { BottomSheetProps, IndividualSheetData } from "./@types";

import Text from "@/ui/Text";
import Button from "@/ui/Button";
import FormField from "@/ui/FormField";
import BottomSheet from "@/ui/BottomSheet";
import useCalendarStore from "@/store/calendar";
import validators from "@/constants/validators";
import useFormMutation from "@/hooks/useFormMutation";
import useKeyboardListener from "@/hooks/useKeyboardListener";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";
import { useDeleteEvent, useUpdateEvent } from "@/hooks/api/calendars";

type Props = BottomSheetProps & IndividualSheetData<"UPDATE_EVENT">;

function Content({ data, snapToPosition, close, snapToIndex }: Props) {
  const calendar = useCalendarStore((state) => state.calendar);

  const updateMutation = useUpdateEvent();
  const deletionMutation = useDeleteEvent();

  const formValidators = {
    id: validators.objectId,
    event: validators.objectId,
    name: validators.string,
    description: validators.string,
    color: validators.color,
    date: validators.date,
  };

  const form = useFormMutation({
    mutation: updateMutation,
    validators: formValidators,
    initialValues: {
      id: calendar!,
      event: data.event._id,
      name: data.event.name,
      description: data.event.description,
      color: data.event.color,
      date: data.event.date,
    },
    onSuccess: async () => {
      close();
      Toast.show({
        type: "success",
        text1: "Event Updated",
        text2: "Your event has been updated",
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

  const onDelete = async () => {
    await deletionMutation.mutateAsync({
      id: calendar!,
      event: data.event._id,
    });

    close();
    Toast.show({
      type: "success",
      text1: "Event Deleted",
      text2: "Your event has been deleted",
    });
  };

  return (
    <BottomSheetView>
      <View className="flex-row items-center gap-2">
        <View className="flex-1">
          <Text size="xl" className="font-semibold text-gray-800">
            Update Event
          </Text>
          <Text className="text-gray-500">
            Update the details of your event
          </Text>
        </View>

        <TouchableOpacity
          className="rounded-full bg-gray-100 p-2"
          onPress={onDelete}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
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
        <FormField
          placeholder="Event Date"
          value={form.state.date.value}
          error={form.state.date.error}
          onChangeText={(value) => form.setValue("date", value)}
        />
        <FormField
          placeholder="Event Color"
          value={form.state.color.value}
          error={form.state.color.error}
          onChangeText={(value) => form.setValue("color", value)}
        />

        <View className="flex-row gap-2">
          <Button color="secondary" className="flex-1" onPress={close}>
            Cancel
          </Button>
          <Button
            className="flex-1"
            onPress={form.handleSubmission}
            loading={form.loading}
          >
            Save Changes
          </Button>
        </View>
      </View>
    </BottomSheetView>
  );
}

const UpdateEventSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function UpdateEventSheet(props, ref) {
    return (
      <BottomSheet
        ref={ref}
        children={(data) => <Content {...props} data={data.data} />}
      />
    );
  },
);

export default UpdateEventSheet;
