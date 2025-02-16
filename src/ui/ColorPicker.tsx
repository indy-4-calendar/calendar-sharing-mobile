import classNames from "classnames";
import { TouchableOpacity, View } from "react-native";

import Text from "@/ui/Text";
import useBottomSheetStore from "@/store/bottom-sheets";

interface Props {
  error?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export default function ColorPicker({
  error,
  placeholder,
  value,
  onChange,
}: Props) {
  const bottomSheetStore = useBottomSheetStore();

  const containerClasses = classNames(
    "flex-row items-center gap-2 rounded-xl bg-gray-100 px-5 h-16",
    { "border border-red-500": error },
  );

  const backgroundStyle = {
    backgroundColor: value,
  };

  const openColorPicker = () => {
    bottomSheetStore.open("COLOR_PICKER", { value, onChange });
  };

  return (
    <TouchableOpacity className={containerClasses} onPress={openColorPicker}>
      <Text className="flex-1 text-gray-500" lines={1}>
        {error || placeholder}
      </Text>
      <View className="size-6 rounded-lg" style={backgroundStyle} />
    </TouchableOpacity>
  );
}
