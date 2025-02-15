import { useMutation } from '@tanstack/react-query';

import useAuthStore from '@/store/auth';
import { appleOAuth, logout } from '@/api';
import { AppleOAuthRequest } from '@/@types';
import useCalendarStore from '@/store/calendar';

export const useAppleOAuth = () => {
  const authStore = useAuthStore();
  const calendarStore = useCalendarStore();

  return useMutation({
    mutationFn: async (data: AppleOAuthRequest) => {
      const res = await appleOAuth(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res) => {
      // Set the default calendar
      if (!calendarStore.calendar) {
        calendarStore.setCalendar(res.user.calendars[0]);
      }

      authStore.login(res);
    },
  });
};

export const useLogout = () => {
  const authStore = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      const res = await logout();
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async () => {
      authStore.logout();
    },
  });
};
