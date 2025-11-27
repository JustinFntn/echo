import type React from "react";
import { useSettings } from "../../../hooks/use-settings";
import { Slider } from "../../ui/Slider";

interface WordCorrectionThresholdProps {
  descriptionMode?: "tooltip" | "inline";
  grouped?: boolean;
}

export const WordCorrectionThreshold: React.FC<
  WordCorrectionThresholdProps
> = ({ descriptionMode = "tooltip", grouped = false }) => {
  const { settings, updateSetting } = useSettings();

  const handleThresholdChange = (value: number) => {
    updateSetting("word_correction_threshold", value);
  };

  return (
    <Slider
      description="Controls how aggressively custom words are applied. Lower values mean fewer corrections will be made, higher values mean more corrections."
      descriptionMode={descriptionMode}
      formatValue={(v) => v.toFixed(2)}
      grouped={grouped}
      label="Correction Threshold"
      max={1.0}
      min={0.0}
      onChange={handleThresholdChange}
      value={settings?.word_correction_threshold ?? 0.18}
    />
  );
};
