import { getVersion } from "@tauri-apps/api/app";
import { openUrl } from "@tauri-apps/plugin-opener";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/Button";
import { SettingContainer } from "../../ui/SettingContainer";
import { SettingsGroup } from "../../ui/SettingsGroup";
import { AppDataDirectory } from "../app-data-directory";

export const AboutSettings: React.FC = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const appVersion = await getVersion();
        setVersion(appVersion);
      } catch (error) {
        console.error("Failed to get app version:", error);
        setVersion("0.1.2");
      }
    };

    fetchVersion();
  }, []);

  const handleDonateClick = async () => {
    try {
      await openUrl("https://github.com/sponsors/damien-schneider");
    } catch (error) {
      console.error("Failed to open donate link:", error);
    }
  };

  return (
    <div className="space-y-6">
      <SettingsGroup title="About">
        <SettingContainer
          description="Current version of Echo"
          grouped={true}
          title="Version"
        >
          <span className="font-mono text-sm">v{version}</span>
        </SettingContainer>

        <AppDataDirectory descriptionMode="tooltip" grouped={true} />

        <SettingContainer
          description="View source code and contribute"
          grouped={true}
          title="Source Code"
        >
          <Button
            onClick={() => openUrl("https://github.com/damien-schneider/echo")}
            size="default"
          >
            View on GitHub
          </Button>
        </SettingContainer>

        <SettingContainer
          description="Help us continue building Echo"
          grouped={true}
          title="Support Development"
        >
          <Button onClick={handleDonateClick} size="default" variant="default">
            Donate
          </Button>
        </SettingContainer>
      </SettingsGroup>

      <SettingsGroup title="Acknowledgments">
        <SettingContainer
          description="High-performance inference of OpenAI's Whisper automatic speech recognition model"
          grouped={true}
          layout="stacked"
          title="Whisper.cpp"
        >
          <div className="text-muted-foreground text-sm">
            Echo uses Whisper.cpp for fast, local speech-to-text processing.
            Thanks to the amazing work by Georgi Gerganov and contributors.
          </div>
        </SettingContainer>
      </SettingsGroup>
    </div>
  );
};
