import { View } from "react-native";

import Text from "@/ui/Text";

interface Props {
  setView: (view: number) => void;
}

export default function CreateEventView({}: Props) {
  return (
    <View>
      <Text size="xl" className="font-semibold text-gray-800">
        New Event
      </Text>
      <Text className="text-gray-500">
        Provide some more details about your event
      </Text>
    </View>
  );
}
