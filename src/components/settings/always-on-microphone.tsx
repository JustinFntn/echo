import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface AlwaysOnMicrophoneProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const AlwaysOnMicrophone = ({
  descriptionMode = "tooltip",
  grouped = false,
}: AlwaysOnMicrophoneProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const alwaysOnMode = getSetting("always_on_microphone");

  return (
    <SettingContainer
      description="Keep microphone active for low latency recording. This may prevent your computer from sleeping."
      descriptionMode={descriptionMode}
      grouped={grouped}
      title="Always-On Microphone"
    >
      <Switch
        checked={alwaysOnMode}
        disabled={isUpdating("always_on_microphone")}
        onCheckedChange={(enabled) =>
          updateSetting("always_on_microphone", enabled)
        }
      />
    </SettingContainer>
  );
};
