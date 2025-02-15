import {
  CreateCalendarRequest,
  CreateCalendarResponse,
  GetCalendarRequest,
  GetCalendarResponse,
  GetCalendarsResponse,
} from '@/@types';

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

/**
 * Request:     POST /api/v1/calendars
 * Description: Create a new calendar
 */
export const createCalendar = async (data: CreateCalendarRequest) => {
  const url = `${PREFIX}`;

  const response = await axios.post<CreateCalendarResponse>(url, data);

  return response.data;
};

/**
 * Request:     GET /api/v1/calendars/:id
 * Description: Get a calendar by ID
 */
export const getCalendar = async (data: GetCalendarRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const response = await axios.get<GetCalendarResponse>(url);

  return response.data;
};
