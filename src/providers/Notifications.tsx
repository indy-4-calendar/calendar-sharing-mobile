import { PropsWithChildren, useEffect } from "react";
import * as Notifications from "expo-notifications";

import { useUpdateUser } from "@/hooks/api/user";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const mutation = useUpdateUser();

  useEffect(() => {
    registerForPushNotificationsAsync().then((notificationPushToken) => {
      if (notificationPushToken) {
        mutation.mutate({ notificationPushToken });
      }
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.getPermissionsAsync();

    let finalStatus = status;

    if (status !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") return;

    const projectId = "287fe2aa-0083-44a1-a380-2f97d727547d";

    const response = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    const notificationPushToken = response.data;

    return notificationPushToken;
  }

  return children;
}
