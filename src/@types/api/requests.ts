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
