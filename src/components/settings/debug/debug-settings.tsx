import { SettingsGroup } from "../../ui/SettingsGroup";
import { AlwaysOnMicrophone } from "../always-on-microphone";
import { ClamshellMicrophoneSelector } from "../clamshell-microphone-selector";
import { HistoryLimit } from "../history-limit";
import { MuteWhileRecording } from "../mute-while-recording";
import { RecordingRetentionPeriodSelector } from "../recording-retention-period";
import { SoundPicker } from "../sound-picker";
import { LogDirectory, LogLevelSelector } from "./index";
import { WordCorrectionThreshold } from "./word-correction-threshold";

export const DebugSettings = () => (
  <div className="mx-auto w-full max-w-3xl space-y-6">
    <SettingsGroup title="Debug">
      <SoundPicker
        description="Choose a sound theme for recording start and stop feedback"
        label="Sound Theme"
      />
      <WordCorrectionThreshold descriptionMode="tooltip" grouped={true} />
      <HistoryLimit descriptionMode="tooltip" grouped={true} />
      <RecordingRetentionPeriodSelector
        descriptionMode="tooltip"
        grouped={true}
      />
      <AlwaysOnMicrophone descriptionMode="tooltip" grouped={true} />
      <ClamshellMicrophoneSelector descriptionMode="tooltip" grouped={true} />
      <LogDirectory descriptionMode="tooltip" grouped={true} />
      <LogLevelSelector descriptionMode="tooltip" grouped={true} />
      <MuteWhileRecording descriptionMode="tooltip" grouped={true} />
    </SettingsGroup>
  </div>
);
