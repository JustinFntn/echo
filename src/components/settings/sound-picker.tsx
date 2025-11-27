import { PlayIcon } from "lucide-react";
import type React from "react";
import { useSettings } from "../../hooks/use-settings";
import { Button } from "../ui/Button";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { SettingContainer } from "../ui/SettingContainer";

interface SoundPickerProps {
  label: string;
  description: string;
}

export const SoundPicker: React.FC<SoundPickerProps> = ({
  label,
  description,
}) => {
  const { getSetting, updateSetting, playTestSound, customSounds } =
    useSettings();

  const selectedTheme = getSetting("sound_theme") ?? "marimba";

  const hasCustomSounds = customSounds.start && customSounds.stop;

  const handlePlayBothSounds = async () => {
    await playTestSound("start");
    await playTestSound("stop");
  };

  return (
    <SettingContainer
      description={description}
      grouped
      layout="horizontal"
      title={label}
    >
      <div className="flex items-center gap-2">
        <NativeSelect
          onChange={(e) =>
            updateSetting(
              "sound_theme",
              e.target.value as "marimba" | "pop" | "custom"
            )
          }
          value={selectedTheme}
        >
          <NativeSelectOption value="marimba">Marimba</NativeSelectOption>
          <NativeSelectOption value="pop">Pop</NativeSelectOption>
          {hasCustomSounds && (
            <NativeSelectOption value="custom">Custom</NativeSelectOption>
          )}
        </NativeSelect>
        <Button
          onClick={handlePlayBothSounds}
          size="sm"
          title="Preview sound theme (plays start then stop)"
          variant="ghost"
        >
          <PlayIcon className="h-4 w-4" />
        </Button>
      </div>
    </SettingContainer>
  );
};
