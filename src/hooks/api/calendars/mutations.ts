import { useMutation } from '@tanstack/react-query';

import { GET_CALENDARS_KEY } from '../keys';

import { createCalendar } from '@/api';
import queryClient from '@/lib/query-client';
import useCalendarStore from '@/store/calendar';
import { CreateCalendarRequest } from '@/@types';

export const useCreateCalendar = () => {
  const calendarStore = useCalendarStore();

  return useMutation({
    mutationFn: async (data: CreateCalendarRequest) => {
      const res = await createCalendar(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res) => {
      queryClient.refetchQueries({ queryKey: [GET_CALENDARS_KEY] });

      // Set the default calendar
      if (!calendarStore.calendar) {
        calendarStore.setCalendar(res.calendar._id);
      }
    },
  });
};
