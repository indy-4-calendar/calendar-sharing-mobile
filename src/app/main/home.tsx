import { View } from "react-native";

import Text from "@/ui/Text";
import SafeAreaView from "@/ui/SafeAreaView";
import { useMemo } from "react";

export default function Home() {
  // Get the date as Month Day, like July 31st
  const currentDate = useMemo(() => {
    const date = new Date();
    const day = date.getDate();

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    const dateString = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    return dateString + daySuffix;
  }, []);

  return (
    <SafeAreaView className="flex-1 gap-6 px-4 pb-24 pt-8">
      <View className="flex-row items-center justify-between">
        <Text size="2xl" className="font-bold text-gray-800">
          Today is {currentDate}
        </Text>
      </View>

      <View className="flex-1 rounded-xl border border-gray-200 bg-white"></View>
    </SafeAreaView>
  );
}
