import { Bell } from "lucide-react";
import type React from "react";
import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface AudioFeedbackProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const AudioFeedback: React.FC<AudioFeedbackProps> = ({
  descriptionMode = "tooltip",
  grouped = false,
}) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();
  const audioFeedbackEnabled = getSetting("audio_feedback");

  return (
    <div className="flex flex-col">
      <SettingContainer
        description="Play sound when recording starts and stops"
        descriptionMode={descriptionMode}
        grouped={grouped}
        icon={<Bell className="h-4 w-4" />}
        title="Audio Feedback"
      >
        <Switch
          checked={audioFeedbackEnabled}
          disabled={isUpdating("audio_feedback")}
          onCheckedChange={(enabled) =>
            updateSetting("audio_feedback", enabled)
          }
        />
      </SettingContainer>
    </div>
  );
};
