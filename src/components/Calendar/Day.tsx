import { TouchableOpacity, View } from "react-native";
import classNames from "classnames";

import Text from "@/ui/Text";
import { IEvent } from "@/@types";
import useBottomSheetStore from "@/store/bottom-sheets";

/**
 * Max width of each tile is calculated as:
 * 100% (container width) - 2 * spacing (left and right padding) / 7 (days in a week)
 */
const MAX_WIDTH = `${(100 - 2 * 2) / 7}%` as const;

interface Props {
  data: null | {
    day: number;
    key: string;
  };
  events: IEvent[];
}

export default function Day({ data, events }: Props) {
  const bottomSheetStore = useBottomSheetStore();

  const containerClasses = classNames("h-28 flex-1 items-center gap-1");

  const eventClasses = classNames("h-4 w-full", "items-center rounded-sm px-1");

  if (!data) {
    return <View className={containerClasses} />;
  }

  return (
    <View style={{ maxWidth: MAX_WIDTH }} className={containerClasses}>
      <Text size="sm" className="text-gray-800">
        {data.day}
      </Text>

      {events.map((event) => (
        <TouchableOpacity
          key={event._id}
          className={eventClasses}
          style={{ backgroundColor: event.color }}
          onPress={() => bottomSheetStore.open("UPDATE_EVENT", { event })}
        >
          <Text size="xxs" lines={1}>
            {event.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
