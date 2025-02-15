export interface IUser {
  /** SYSTEM DATA */
  /** The id of the user */
  _id: string;
  /** The first name of the user's user */
  firstName: string;
  /** The last name of the user's user */
  lastName: string;
  /** The email of the user's user */
  email: string;
  /** The list of the users calendars */
  calendars: string[];

  /** METADATA */
  /** The date the user was created */
  createdAt: Date;
  /** The date the user was last updated */
  updatedAt: Date;
}
