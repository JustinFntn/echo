import { EyeOff } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface StartHiddenProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const StartHidden = ({
  descriptionMode = "tooltip",
  grouped = false,
}: StartHiddenProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const startHidden = getSetting("start_hidden") ?? false;

  return (
    <SettingContainer
      description="Launch to system tray without opening the window."
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<EyeOff className="h-4 w-4" />}
      title="Start Hidden"
      tooltipPosition="bottom"
    >
      <Switch
        checked={startHidden}
        disabled={isUpdating("start_hidden")}
        onCheckedChange={(enabled) => updateSetting("start_hidden", enabled)}
      />
    </SettingContainer>
  );
};
