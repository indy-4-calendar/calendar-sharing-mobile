export interface IEvent {
  /** SYSTEM DATA */
  /** The id of the user */
  _id: string;
  /** The linked calendar for the event */
  calendar: string;
  /** The date of the event */
  date: Date;
  /** The name of the event */
  name: string;
  /** The description of the event */
  description: string;
  /** The color of the event */
  color: string;

  /** METADATA */
  /** The date the event was created */
  createdAt: Date;
  /** The date the event was last updated */
  updatedAt: Date;
}
