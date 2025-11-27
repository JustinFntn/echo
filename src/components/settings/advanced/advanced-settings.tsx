import type React from "react";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { AutostartToggle } from "../autostart-toggle";
import { ClipboardHandlingSetting } from "../clipboard-handling";
import { CustomWords } from "../custom-words";
import { ModelUnloadTimeoutSetting } from "../model-unload-timeout";
import { PasteMethodSetting } from "../paste-method";
import { ShowOverlay } from "../show-overlay";
import { StartHidden } from "../start-hidden";
import { TranslateToEnglish } from "../translate-to-english";

export const AdvancedSettings: React.FC = () => (
  <div className="space-y-6">
    <SettingsGroup title="Advanced">
      <StartHidden descriptionMode="tooltip" grouped={true} />
      <AutostartToggle descriptionMode="tooltip" grouped={true} />
      <ShowOverlay descriptionMode="tooltip" grouped={true} />
      <PasteMethodSetting descriptionMode="tooltip" grouped={true} />
      <ClipboardHandlingSetting descriptionMode="tooltip" grouped={true} />
      <TranslateToEnglish descriptionMode="tooltip" grouped={true} />
      <ModelUnloadTimeoutSetting descriptionMode="tooltip" grouped={true} />
      <CustomWords descriptionMode="tooltip" grouped />
    </SettingsGroup>
  </div>
);
