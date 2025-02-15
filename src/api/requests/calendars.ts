import { GetCalendarsResponse } from '@/@types';

import axios from '@/lib/axios';

const PREFIX = '/calendars';

/**
 * Request:     GET /api/v1/calendars
 * Description: Get the current user's calendars
 */
export const getCalendars = async () => {
  const url = `${PREFIX}`;

  const response = await axios.get<GetCalendarsResponse>(url);

  return response.data;
};
