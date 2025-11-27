import { Hand } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface PushToTalkProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const PushToTalk = ({
  descriptionMode = "tooltip",
  grouped = false,
}: PushToTalkProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const pttEnabled = getSetting("push_to_talk");

  return (
    <SettingContainer
      description="Hold to record, release to stop"
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<Hand className="h-4 w-4" />}
      title="Push To Talk"
    >
      <Switch
        checked={pttEnabled}
        disabled={isUpdating("push_to_talk")}
        onCheckedChange={(enabled) => updateSetting("push_to_talk", enabled)}
      />
    </SettingContainer>
  );
};
