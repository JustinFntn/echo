import { RotateCcw, Speaker } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import { Button } from "../ui/Button";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { SettingContainer } from "../ui/SettingContainer";

interface OutputDeviceSelectorProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
  disabled?: boolean;
}

export const OutputDeviceSelector = ({
  descriptionMode = "tooltip",
  grouped = false,
  disabled = false,
}: OutputDeviceSelectorProps) => {
  const {
    getSetting,
    updateSetting,
    resetSetting,
    isUpdating,
    isLoading,
    outputDevices,
    refreshOutputDevices,
  } = useSettings();

  const selectedOutputDevice =
    getSetting("selected_output_device") === "default"
      ? "Default"
      : getSetting("selected_output_device") || "Default";

  const handleOutputDeviceSelect = async (deviceName: string) => {
    await updateSetting("selected_output_device", deviceName);
  };

  const handleReset = async () => {
    await resetSetting("selected_output_device");
  };

  return (
    <SettingContainer
      description="Select your preferred audio output device for feedback sounds"
      descriptionMode={descriptionMode}
      disabled={disabled}
      grouped={grouped}
      icon={<Speaker className="h-4 w-4" />}
      title="Output Device"
    >
      <div className="flex items-center space-x-1">
        <NativeSelect
          className="flex-1"
          disabled={
            disabled ||
            isUpdating("selected_output_device") ||
            isLoading ||
            outputDevices.length === 0
          }
          onChange={(e) => handleOutputDeviceSelect(e.target.value)}
          value={selectedOutputDevice}
        >
          <NativeSelectOption disabled value="">
            {isLoading || outputDevices.length === 0
              ? "Loading..."
              : "Select output device..."}
          </NativeSelectOption>
          {outputDevices.map((device) => (
            <NativeSelectOption key={device.name} value={device.name}>
              {device.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button
          disabled={
            disabled || isUpdating("selected_output_device") || isLoading
          }
          onClick={handleReset}
          size="icon"
          variant="ghost"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>
      </div>
    </SettingContainer>
  );
};
