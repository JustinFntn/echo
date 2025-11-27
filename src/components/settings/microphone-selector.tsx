import { Mic, RotateCcw } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import { Button } from "../ui/Button";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { SettingContainer } from "../ui/SettingContainer";

interface MicrophoneSelectorProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const MicrophoneSelector = ({
  descriptionMode = "tooltip",
  grouped = false,
}: MicrophoneSelectorProps) => {
  const {
    getSetting,
    updateSetting,
    resetSetting,
    isUpdating,
    isLoading,
    audioDevices,
    refreshAudioDevices,
  } = useSettings();

  const selectedMicrophone =
    getSetting("selected_microphone") === "default"
      ? "Default"
      : getSetting("selected_microphone") || "Default";

  const handleMicrophoneSelect = async (deviceName: string) => {
    await updateSetting("selected_microphone", deviceName);
  };

  const handleReset = async () => {
    await resetSetting("selected_microphone");
  };

  return (
    <SettingContainer
      description="Select your preferred microphone device"
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<Mic className="h-4 w-4" />}
      title="Microphone"
    >
      <div className="flex items-center space-x-1">
        <NativeSelect
          className="flex-1"
          disabled={
            isUpdating("selected_microphone") ||
            isLoading ||
            audioDevices.length === 0
          }
          onChange={(e) => handleMicrophoneSelect(e.target.value)}
          value={selectedMicrophone}
        >
          <NativeSelectOption disabled value="">
            {isLoading || audioDevices.length === 0
              ? "Loading..."
              : "Select microphone..."}
          </NativeSelectOption>
          {audioDevices.map((device) => (
            <NativeSelectOption key={device.name} value={device.name}>
              {device.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button
          disabled={isUpdating("selected_microphone") || isLoading}
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
