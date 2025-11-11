import React from "react";
import { Switch } from "../ui/switch";
import { SettingContainer } from "../ui/SettingContainer";
import { useSettings } from "../../hooks/useSettings";

interface PostProcessingToggleProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const PostProcessingToggle: React.FC<PostProcessingToggleProps> = React.memo(
  ({ descriptionMode = "tooltip", grouped = false }) => {
    const { getSetting, updateSetting, isUpdating } = useSettings();

    const enabled = getSetting("post_process_enabled") || false;

    return (
      <SettingContainer
        title="Post Process"
        description="Enable post-processing of transcribed text using language models via OpenAI Compatible API."
        descriptionMode={descriptionMode}
        grouped={grouped}
      >
        <Switch
          checked={enabled}
          onCheckedChange={(enabled) => updateSetting("post_process_enabled", enabled)}
          disabled={isUpdating("post_process_enabled")}
        />
      </SettingContainer>
    );
  },
);
