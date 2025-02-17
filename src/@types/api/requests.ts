import { AppleAuthenticationFullName } from 'expo-apple-authentication';

export interface AppleOAuthRequest {
  /** The JWT for the user, from apple */
  identityToken: string;
  /** The users name, only exists on first fetch */
  fullName: AppleAuthenticationFullName | null;
}

export interface CreateCalendarRequest {
  /** The name of the calendar */
  name: string;
  /** The description of the calendar */
  description: string;
  /** The color of the calendar */
  color: string;
}

export interface GetCalendarRequest {
  /** The id of the calendar */
  id: string;
}

export interface CreateEventRequest {
  /** The id of the calendar */
  id: string;
  /** The name of the event */
  name: string;
  /** The description of the event */
  description: string;
  /** The date of the event */
  date: string;
  /** The color of the event */
  color: string;
}

export interface UpdateEventRequest {
  /** The id of the calendar */
  id: string;
  /** The id of the event */
  event: string;
  /** The name of the event */
  name: string;
  /** The description of the event */
  description: string;
  /** The date of the event */
  date: string;
  /** The color of the event */
  color: string;
}

export interface DeleteEventRequest {
  /** The id of the calendar */
  id: string;
  /** The id of the event */
  event: string;
}

export interface UpdateUserRequest {
  /** The notification push token */
  notificationPushToken: string;
}
