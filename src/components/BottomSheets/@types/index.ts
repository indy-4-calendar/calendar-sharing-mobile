import { IEvent } from '@/@types';

export interface BottomSheetProps {
  close: () => void;
  snapToIndex: (index: number) => void;
  snapToPosition: (position: string) => void;
}

export type IndividualSheetName = keyof IndividualSheetProps;

export type IndividualSheetData<T extends IndividualSheetName> = {
  data: IndividualSheetProps[T];
};

export interface IndividualSheetProps {
  SHARE_CALENDAR: { id: string };
  UPDATE_EVENT: { event: IEvent };
  DATE_TIME_PICKER: { value: Date; onChange: (date: Date) => void };
  COLOR_PICKER: { value: string; onChange: (color: string) => void };
  CREATE_ITEM: undefined;
  SWITCH_CALENDAR: undefined;
  NETWORK_LOGGER: undefined;
}
