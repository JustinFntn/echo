import React from "react";
import { MicrophoneSelector } from "../MicrophoneSelector";
import { LanguageSelector } from "../LanguageSelector";
import { EchoShortcut } from "../echo-shortcut";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { OutputDeviceSelector } from "../OutputDeviceSelector";
import { PushToTalk } from "../PushToTalk";
import { AudioFeedback } from "../AudioFeedback";
import { useSettings } from "../../../hooks/useSettings";
import { VolumeSlider } from "../VolumeSlider";

export const GeneralSettings: React.FC = () => {
  const { audioFeedbackEnabled } = useSettings();
  return (
    <div className="space-y-6">
      <SettingsGroup title="General">
        <EchoShortcut descriptionMode="tooltip" grouped={true} />
        <LanguageSelector descriptionMode="tooltip" grouped={true} />
        <PushToTalk descriptionMode="tooltip" grouped={true} />
      </SettingsGroup>
      <SettingsGroup title="Sound">
        <MicrophoneSelector descriptionMode="tooltip" grouped={true} />
        <AudioFeedback descriptionMode="tooltip" grouped={true} />
        <OutputDeviceSelector
          descriptionMode="tooltip"
          grouped={true}
          disabled={!audioFeedbackEnabled}
        />
        <VolumeSlider disabled={!audioFeedbackEnabled} />
      </SettingsGroup>
    </div>
  );
};
