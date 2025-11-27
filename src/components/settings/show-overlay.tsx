import { Layers } from "lucide-react";
import { useSettings } from "../../hooks/use-settings";
import type { OverlayPosition } from "../../lib/types";
import { NativeSelect, NativeSelectOption } from "../ui/native-select";
import { SettingContainer } from "../ui/SettingContainer";

interface ShowOverlayProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

const overlayOptions = [
  { value: "none", label: "None" },
  { value: "bottom", label: "Bottom" },
  { value: "top", label: "Top" },
];

export const ShowOverlay = ({
  descriptionMode = "tooltip",
  grouped = false,
}: ShowOverlayProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();

  const selectedPosition = (getSetting("overlay_position") ||
    "bottom") as OverlayPosition;

  return (
    <SettingContainer
      description="Display visual feedback overlay during recording and transcription"
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<Layers className="h-4 w-4" />}
      title="Overlay Position"
    >
      <NativeSelect
        disabled={isUpdating("overlay_position")}
        onChange={(e) =>
          updateSetting("overlay_position", e.target.value as OverlayPosition)
        }
        value={selectedPosition}
      >
        {overlayOptions.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </SettingContainer>
  );
};
