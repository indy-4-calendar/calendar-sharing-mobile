import { useMutation } from '@tanstack/react-query';

import { GET_CALENDAR_KEY, GET_CALENDARS_KEY } from '../keys';

import {
  CreateCalendarRequest,
  CreateEventRequest,
  DeleteEventRequest,
  JoinCalendarRequest,
  UpdateEventRequest,
} from '@/@types';
import {
  createCalendar,
  createEvent,
  deleteEvent,
  joinCalendar,
  updateEvent,
} from '@/api';
import queryClient from '@/lib/query-client';
import useCalendarStore from '@/store/calendar';

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
      calendarStore.setCalendar(res.calendar._id);
    },
  });
};

export const useCreateEvent = () => {
  return useMutation({
    mutationFn: async (data: CreateEventRequest) => {
      const res = await createEvent(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res, params) => {
      queryClient.refetchQueries({ queryKey: [GET_CALENDAR_KEY, params.id] });
    },
  });
};

export const useUpdateEvent = () => {
  return useMutation({
    mutationFn: async (data: UpdateEventRequest) => {
      const res = await updateEvent(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res, params) => {
      queryClient.refetchQueries({ queryKey: [GET_CALENDAR_KEY, params.id] });
    },
  });
};

export const useDeleteEvent = () => {
  return useMutation({
    mutationFn: async (data: DeleteEventRequest) => {
      const res = await deleteEvent(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res, params) => {
      queryClient.refetchQueries({ queryKey: [GET_CALENDAR_KEY, params.id] });
    },
  });
};

export const useJoinCalendar = () => {
  const calendarStore = useCalendarStore();

  return useMutation({
    mutationFn: async (data: JoinCalendarRequest) => {
      const res = await joinCalendar(data);
      if ('error' in res) throw res;
      return res.data;
    },
    onSuccess: async (res, params) => {
      queryClient.refetchQueries({ queryKey: [GET_CALENDARS_KEY] });
      calendarStore.setCalendar(params.id);
    },
  });
};
