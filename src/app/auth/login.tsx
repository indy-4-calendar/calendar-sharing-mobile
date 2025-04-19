import SafeAreaView from "@/ui/SafeAreaView";
import AppleOAuthButton from "@/components/AppleOAuthButton";
import { View } from "react-native";
import Text from "@/ui/Text";

export default function Login() {
  return (
    <View className="h-full justify-end bg-purple-100">
      <View className="my-64 gap-4 px-6">
        <Text size="5xl" className="font-medium text-purple-950">
          Daylink
        </Text>
        <Text size="xl" className="text-purple-950">
          Connect your calendars and share events with your friends and family.
        </Text>
      </View>
      <View className="rounded-t-2xl bg-white px-6 pb-14 pt-6 shadow-sm">
        <Text size="xl" className="mb-6 font-medium text-purple-950">
          Welcome Back!
        </Text>
        <AppleOAuthButton />
      </View>
    </View>
  );
}
