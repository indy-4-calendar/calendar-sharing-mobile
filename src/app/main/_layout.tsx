import { BlurView } from "expo-blur";
import colors from "tailwindcss/colors";
import { StyleSheet } from "react-native";
import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text from "@/ui/Text";
import useAuthStore from "@/store/auth";
import useBottomSheetStore from "@/store/bottom-sheets";
import { useGetCalendars } from "@/hooks/api/calendars";

export default function Layout() {
  useGetCalendars();

  const { user } = useAuthStore();
  const bottomSheetStore = useBottomSheetStore();

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.gray[800],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarItemStyle: {
          marginTop: 12,
        },
        tabBarStyle: {
          position: "absolute",
          height: 92,
        },
        sceneStyle: {
          backgroundColor: colors.gray[100],
        },
        tabBarLabel: ({ color, children }) => {
          return (
            <Text size="xxs" style={{ color }}>
              {children}
            </Text>
          );
        },
        tabBarBackground: () => (
          <BlurView
            intensity={24}
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255,255,255,0.75)",
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                className="pb-2"
                size={24}
                color={color}
                name="calendar"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="create"
        // Open a bottom sheet when pressed, dont navigate
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            bottomSheetStore.open("CREATE_ITEM");
          },
        })}
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons className="pb-2" size={24} color={color} name="add" />
            );
          },
        }}
      />
      <Tabs.Screen
        name="more"
        // Open a bottom sheet when pressed, dont navigate
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault();
            bottomSheetStore.open("SWITCH_CALENDAR");
          },
        })}
        options={{
          title: "More",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons className="pb-2" size={24} color={color} name="menu" />
            );
          },
        }}
      />
    </Tabs>
  );
}
