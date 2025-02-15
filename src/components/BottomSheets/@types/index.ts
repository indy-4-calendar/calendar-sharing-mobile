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
  SWITCH_CALENDAR: undefined;
  NETWORK_LOGGER: undefined;
}
