import { View } from "react-native";

import Text from "@/ui/Text";

/**
 * Max width of each tile is calculated as:
 * 100% (container width) - 2 * spacing (left and right padding) / 7 (days in a week)
 */
const MAX_WIDTH = `${(100 - 2 * 2) / 7}%` as const;

const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Header() {
  return (
    <View className="w-full flex-row gap-1 py-1">
      {daysOfWeek.map((day) => (
        <View
          key={day}
          className="flex-1 items-center"
          style={{ maxWidth: MAX_WIDTH }}
        >
          <Text key={day} size="xs" className="font-medium text-gray-500">
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
}
