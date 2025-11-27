import type React from "react";
import { useSettings } from "../../../hooks/use-settings";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { AudioFeedback } from "../audio-feedback";
import { EchoShortcut } from "../echo-shortcut";
import { LanguageSelector } from "../language-selector";
import { MicrophoneSelector } from "../microphone-selector";
import { OutputDeviceSelector } from "../output-device-selector";
import { PushToTalk } from "../push-to-talk";
import { VolumeSlider } from "../volume-slider";

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
          disabled={!audioFeedbackEnabled}
          grouped={true}
        />
        <VolumeSlider disabled={!audioFeedbackEnabled} />
      </SettingsGroup>
    </div>
  );
};
