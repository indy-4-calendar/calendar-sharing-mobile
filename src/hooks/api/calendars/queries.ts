import { useQuery } from '@tanstack/react-query';

import { GET_CALENDAR_KEY, GET_CALENDARS_KEY } from '../keys';

import { getCalendar, getCalendars } from '@/api';

export const useGetCalendars = () => {
  const query = useQuery({
    queryKey: [GET_CALENDARS_KEY],
    queryFn: async () => {
      const res = await getCalendars();
      if ('error' in res) throw res;
      return res.data;
    },
  });

  return query;
};

export const useGetCalendar = (id: string | null) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: [GET_CALENDAR_KEY, id],
    queryFn: async () => {
      const res = await getCalendar({ id: id! });
      if ('error' in res) throw res;
      return res.data;
    },
  });

  return query;
};
