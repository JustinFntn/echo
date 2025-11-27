import { PlayCircle } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface AutostartToggleProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const AutostartToggle = ({
  descriptionMode = "tooltip",
  grouped = false,
}: AutostartToggleProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const autostartEnabled = getSetting("autostart_enabled") ?? false;

  return (
    <SettingContainer
      description="Automatically start Echo when you log in to your computer."
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<PlayCircle className="h-4 w-4" />}
      title="Launch on Startup"
    >
      <Switch
        checked={autostartEnabled}
        disabled={isUpdating("autostart_enabled")}
        onCheckedChange={(enabled) =>
          updateSetting("autostart_enabled", enabled)
        }
      />
    </SettingContainer>
  );
};
