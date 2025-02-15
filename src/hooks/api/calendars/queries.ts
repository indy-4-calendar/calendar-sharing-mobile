import { useQuery } from '@tanstack/react-query';

import { GET_CALENDARS_KEY } from '../keys';

import { getCalendars } from '@/api';

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
