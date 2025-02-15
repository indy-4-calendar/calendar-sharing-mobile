import classNames from "classnames";
import { useMemo, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, TouchableOpacity, View } from "react-native";

import Day from "./Day";
import Header from "./Header";

import Text from "@/ui/Text";
import { IEvent } from "@/@types";

interface Props {
  events: IEvent[];
}

export default function Calendar({ events }: Props) {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  /**
   * Current date being browsed in the calendar.
   */
  const date = useMemo(() => {
    const d = new Date(year, month);
    const m = d.toLocaleString("default", { month: "long" });
    const y = d.getFullYear();

    return `${m} ${y}`;
  }, [month, year]);

  /**
   * The events for every day key (YYYY-MM-DD).
   */
  const eventsByDay = useMemo(() => {
    const eventsByDay: Record<string, IEvent[]> = {};

    for (const event of events) {
      const date = new Date(event.date);
      const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

      if (!eventsByDay[key]) {
        eventsByDay[key] = [];
      }

      eventsByDay[key].push(event);
    }

    return eventsByDay;
  }, [events]);

  /**
   * The days for the current month.
   */
  const grid = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const grid = [];

    for (let day = 1, i = firstDay; day <= daysInMonth; i++, day++) {
      grid[i] = {
        day,
        key: `${year}-${month}-${day}`,
      };
    }

    return grid;
  }, [month, year]);

  /**
   * Go to the previous month.
   * If the current month is January, go to December of the previous year.
   * Otherwise, go to the previous month.
   */
  const onPrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  /**
   * Go to the next month.
   * If the current month is December, go to January of the next year.
   * Otherwise, go to the next month.
   */
  const onNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const containerClasses = classNames(
    "flex-1 rounded-xl  bg-white gap-4",
    "pt-4 border border-gray-200",
  );

  const buttonClasses = classNames("rounded-full bg-gray-100 p-2");

  return (
    <View className={containerClasses}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4">
        <Text className="font-bold text-gray-800">{date}</Text>
        <View className="flex-row gap-2">
          <TouchableOpacity className={buttonClasses} onPress={onPrevMonth}>
            <Ionicons name="chevron-back" size={18} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className={buttonClasses} onPress={onNextMonth}>
            <Ionicons name="chevron-forward" size={18} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Grid */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={grid}
        numColumns={7}
        ListHeaderComponent={Header}
        className="flex-1"
        columnWrapperClassName="gap-0.5"
        contentContainerClassName="gap-0.5"
        renderItem={({ item }) => (
          <Day data={item} events={eventsByDay[item?.key] ?? []} />
        )}
      />
    </View>
  );
}
