import { View } from "react-native";

import Text from "@/ui/Text";
import FormField from "@/ui/FormField";

interface Props {
  setView: (view: number) => void;
}

export default function CreateCalendarView({}: Props) {
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
        <FormField placeholder="Calendar Name" />
        <FormField placeholder="Calendar Description" />
        <FormField placeholder="Calendar Color" />
      </View>
    </>
  );
}
