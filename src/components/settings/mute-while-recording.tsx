import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface MuteWhileRecordingToggleProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const MuteWhileRecording = ({
  descriptionMode = "tooltip",
  grouped = false,
}: MuteWhileRecordingToggleProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const muteEnabled = getSetting("mute_while_recording") ?? false;

  return (
    <SettingContainer
      description="Automatically mute all sound output while Echo is recording, then restore it when finished."
      descriptionMode={descriptionMode}
      grouped={grouped}
      title="Mute While Recording"
    >
      <Switch
        checked={muteEnabled}
        disabled={isUpdating("mute_while_recording")}
        onCheckedChange={(enabled) =>
          updateSetting("mute_while_recording", enabled)
        }
      />
    </SettingContainer>
  );
};
