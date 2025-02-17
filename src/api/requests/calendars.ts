import {
  CreateCalendarRequest,
  CreateCalendarResponse,
  CreateEventRequest,
  CreateEventResponse,
  DeleteEventRequest,
  DeleteEventResponse,
  GetCalendarRequest,
  GetCalendarResponse,
  GetCalendarsResponse,
  JoinCalendarRequest,
  JoinCalendarResponse,
  UpdateEventRequest,
  UpdateEventResponse,
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

/**
 * Request:     POST /api/v1/calendars/:id
 * Description: Join a calendar by ID
 */
export const joinCalendar = async (data: JoinCalendarRequest) => {
  const url = `${PREFIX}/${data.id}`;

  const response = await axios.post<JoinCalendarResponse>(url);

  return response.data;
};

/**
 * Request:     POST /api/v1/calendars/:id/events
 * Description: Create a new event in a calendar
 */
export const createEvent = async (data: CreateEventRequest) => {
  const url = `${PREFIX}/${data.id}/events`;

  const response = await axios.post<CreateEventResponse>(url, data);

  return response.data;
};

/**
 * Request:     PUT /api/v1/calendars/:id/events
 * Description: Update an event in a calendar
 */
export const updateEvent = async (data: UpdateEventRequest) => {
  const url = `${PREFIX}/${data.id}/events`;

  const response = await axios.put<UpdateEventResponse>(url, data);

  return response.data;
};

/**
 * Request:     DELETE /api/v1/calendars/:id/events
 * Description: Delete an event in a calendar
 */
export const deleteEvent = async (data: DeleteEventRequest) => {
  const url = `${PREFIX}/${data.id}/events`;

  const response = await axios.delete<DeleteEventResponse>(url, { data });

  return response.data;
};
