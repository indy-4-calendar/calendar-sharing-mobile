import { useEffect } from 'react';
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEvent,
  KeyboardEventName,
} from 'react-native';

const KeyboardEvents: KeyboardEventName[] = [
  'keyboardWillShow',
  'keyboardDidShow',
  'keyboardWillHide',
  'keyboardDidHide',
  'keyboardWillChangeFrame',
  'keyboardDidChangeFrame',
];

interface KeyboardListenerParams {
  onKeyboardWillShow?: (event: KeyboardEvent) => void;
  onKeyboardDidShow?: (event: KeyboardEvent) => void;
  onKeyboardWillHide?: (event: KeyboardEvent) => void;
  onKeyboardDidHide?: (event: KeyboardEvent) => void;
  onKeyboardWillChangeFrame?: (event: KeyboardEvent) => void;
  onKeyboardDidChangeFrame?: (event: KeyboardEvent) => void;
}

const useKeyboardListener = (params: KeyboardListenerParams) => {
  useEffect(() => {
    let listeners: EmitterSubscription[] = [];

    // For each event, check if there is a param passed for it, if so, listen to it
    // and execute the function passed in the param when the event is triggered
    KeyboardEvents.forEach((event) => {
      const onEventName = `on${event[0].toUpperCase()}${event.slice(1)}`;
      const listenerFunction = (params as any)[onEventName];

      if (listenerFunction) {
        const listener = Keyboard.addListener(event, (e) => {
          listenerFunction(e);
        });

        listeners.push(listener);
      }
    });

    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, [params]);
};

export default useKeyboardListener;
