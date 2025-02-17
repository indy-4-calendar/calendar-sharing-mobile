import { API } from '.';
import { ICalendar, IEvent, IUser } from '..';

export type LogoutResponse = API.Response;

export type RefreshTokenResponse = API.Response<{
  /** The new access token */
  accessToken: string;
}>;

export type AppleOAuthResponse = API.Response<{
  /** The user's information */
  user: IUser;
  /** The access token for the user */
  accessToken: string;
  /** The refresh token for the user */
  refreshToken: string;
}>;

export type GetUserResponse = API.Response<{
  /** The user's information */
  user: IUser;
}>;

export type GetCalendarsResponse = API.Response<{
  /** The user's calendars */
  calendars: ICalendar[];
}>;

export type CreateCalendarResponse = API.Response<{
  /** The new calendar */
  calendar: ICalendar;
}>;

export type GetCalendarResponse = API.Response<{
  /** The calendar */
  calendar: ICalendar;
  /** The events in the calendar */
  events: IEvent[];
}>;

export type CreateEventResponse = API.Response<{
  /** The new event */
  event: IEvent;
}>;

export type UpdateEventResponse = API.Response<{
  /** The updated event */
  event: IEvent;
}>;

export type DeleteEventResponse = API.Response;

export type UpdateUserResponse = API.Response<{
  /** The updated user */
  user: IUser;
}>;
