import { BlurView } from "expo-blur";
import colors from "tailwindcss/colors";
import { StyleSheet } from "react-native";
import { Redirect, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import Text from "@/ui/Text";
import useAuthStore from "@/store/auth";

export default function Layout() {
  const { user } = useAuthStore();

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
          marginTop: 16,
        },
        tabBarStyle: {
          position: "absolute",
          height: 100,
        },
        sceneStyle: {
          backgroundColor: "white",
        },
        tabBarLabel: ({ color, children }) => {
          return (
            <Text size="xs" style={{ color }}>
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
                className="mb-2"
                size={32}
                color={color}
                name="calendar"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        options={{
          title: "Create",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons className="mb-2" size={32} color={color} name="add" />
            );
          },
        }}
      />
      <Tabs.Screen
        options={{
          title: "More",
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons className="mb-2" size={32} color={color} name="menu" />
            );
          },
        }}
      />
    </Tabs>
  );
}
