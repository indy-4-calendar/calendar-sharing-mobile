export interface ICalendar {
  /** SYSTEM DATA */
  /** The id of the user */
  _id: string;
  /** The name of the calendar */
  name: string;
  /** The description of the calendar */
  description: string;
  /** The color of the calendar */
  color: string;

  /** METADATA */
  /** The date the calendar was created */
  createdAt: Date;
  /** The date the calendar was last updated */
  updatedAt: Date;
}
