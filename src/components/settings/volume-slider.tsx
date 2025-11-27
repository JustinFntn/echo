import { Volume2 } from "lucide-react";
import type React from "react";
import { useSettings } from "../../hooks/use-settings";
import { Slider } from "../ui/Slider";

export const VolumeSlider: React.FC<{ disabled?: boolean }> = ({
  disabled = false,
}) => {
  const { getSetting, updateSetting } = useSettings();
  const audioFeedbackVolume = getSetting("audio_feedback_volume") ?? 0.5;

  return (
    <Slider
      description="Adjust the volume of audio feedback sounds"
      descriptionMode="tooltip"
      disabled={disabled}
      formatValue={(value) => `${Math.round(value * 100)}%`}
      grouped
      icon={<Volume2 className="h-4 w-4" />}
      label="Volume"
      max={1}
      min={0}
      onChange={(value: number) =>
        updateSetting("audio_feedback_volume", value)
      }
      step={0.1}
      value={audioFeedbackVolume}
    />
  );
};
