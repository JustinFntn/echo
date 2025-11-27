import { listen } from "@tauri-apps/api/event";
import { Languages } from "lucide-react";
import { useEffect } from "react";
import { useModels } from "../../hooks/use-models";
import { useSettings } from "../../hooks/use-settings";
import { SettingContainer } from "../ui/SettingContainer";
import { Switch } from "../ui/switch";

interface TranslateToEnglishProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

const unsupportedTranslationModels = [
  "parakeet-tdt-0.6b-v2",
  "parakeet-tdt-0.6b-v3",
  "turbo",
];

export const TranslateToEnglish = ({
  descriptionMode = "tooltip",
  grouped = false,
}: TranslateToEnglishProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();
  const { currentModel, loadCurrentModel, models } = useModels();

  const translateToEnglish = getSetting("translate_to_english");
  const isDisabledTranslation =
    unsupportedTranslationModels.includes(currentModel);

  let description =
    "Automatically translate speech from other languages to English during transcription.";

  if (isDisabledTranslation) {
    const currentModelDisplayName = models.find(
      (model) => model.id === currentModel
    )?.name;
    description = `Translation is not supported by the ${currentModelDisplayName} model.`;
  }

  // Listen for model state changes to update UI reactively
  useEffect(() => {
    const modelStateUnlisten = listen("model-state-changed", () => {
      loadCurrentModel();
    });

    return () => {
      modelStateUnlisten.then((fn) => fn());
    };
  }, [loadCurrentModel]);

  return (
    <SettingContainer
      description={description}
      descriptionMode={descriptionMode}
      disabled={isDisabledTranslation}
      grouped={grouped}
      icon={<Languages className="h-4 w-4" />}
      title="Translate to English"
    >
      <Switch
        checked={translateToEnglish}
        disabled={isUpdating("translate_to_english") || isDisabledTranslation}
        onCheckedChange={(enabled) =>
          updateSetting("translate_to_english", enabled)
        }
      />
    </SettingContainer>
  );
};
