import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import PersistedAsyncStorage from '@/lib/async-store';

/**
 * State that represents every detail of the user's auth state
 */
interface ICalendarState {
  calendar: string | null;
}

interface ICalendarStore extends ICalendarState {
  setCalendar: (calendar: string | null) => void;
}

const useCalendarStore = create<ICalendarStore>()(
  persist(
    (set) => {
      const initialState: ICalendarState = {
        calendar: null,
      };

      const setCalendar = (calendar: string | null) => {
        set(() => ({ calendar }));
      };

      return {
        ...initialState,
        setCalendar,
      };
    },
    {
      name: 'calendar-storage',
      storage: PersistedAsyncStorage,
    },
  ),
);

export default useCalendarStore;
