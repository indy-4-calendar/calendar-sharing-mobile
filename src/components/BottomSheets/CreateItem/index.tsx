import { forwardRef, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import LandingView from "./Views/Landing";
import CreateEventView from "./Views/CreateEvent";
import CreateCalendarView from "./Views/CreateCalendar";

import { BottomSheetProps } from "../@types";

import BottomSheet from "@/ui/BottomSheet";
import BottomSheetView from "@/ui/BottomSheet/Containers/View";

function Content() {
  const [currentView, setCurrentView] = useState(0);

  const Views = [LandingView, CreateEventView, CreateCalendarView];
  const CurrentView = Views[currentView];

  const setView = (view: number) => setCurrentView(view);

  return (
    <BottomSheetView>
      <CurrentView setView={setView} />
    </BottomSheetView>
  );
}

const CreateItemSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  function CreateItemSheet(props, ref) {
    return <BottomSheet ref={ref} children={Content} />;
  },
);

export default CreateItemSheet;
