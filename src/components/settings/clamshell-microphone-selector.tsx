import { invoke } from "@tauri-apps/api/core";
import { Laptop2, RefreshCw, RotateCcw } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { SettingContainer } from "@/components/ui/SettingContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSettings } from "@/hooks/use-settings";

interface ClamshellMicrophoneSelectorProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const ClamshellMicrophoneSelector: React.FC<
  ClamshellMicrophoneSelectorProps
> = ({ descriptionMode = "tooltip", grouped = false }) => {
  const {
    getSetting,
    updateSetting,
    resetSetting,
    isUpdating,
    isLoading,
    audioDevices,
    refreshAudioDevices,
  } = useSettings();

  const [isLaptop, setIsLaptop] = useState<boolean>(false);

  useEffect(() => {
    const checkIsLaptop = async () => {
      try {
        const result = await invoke<boolean>("is_laptop");
        setIsLaptop(result);
      } catch (error) {
        console.error("Failed to check if device is laptop:", error);
        setIsLaptop(false);
      }
    };

    checkIsLaptop();
  }, []);

  // Only render on laptops
  if (!isLaptop) {
    return null;
  }

  const selectedClamshellMicrophone =
    getSetting("clamshell_microphone") === "default"
      ? "Default"
      : getSetting("clamshell_microphone") || "Default";

  const handleSelect = async (deviceName: string) => {
    await updateSetting("clamshell_microphone", deviceName);
  };

  const handleReset = async () => {
    await resetSetting("clamshell_microphone");
  };

  return (
    <SettingContainer
      description="Choose a fallback microphone to use when your laptop lid is closed"
      descriptionMode={descriptionMode}
      grouped={grouped}
      icon={<Laptop2 className="h-4 w-4" />}
      title="Clamshell Microphone"
    >
      <div className="flex items-center space-x-1">
        <NativeSelect
          className="flex-1"
          disabled={
            isUpdating("clamshell_microphone") ||
            isLoading ||
            audioDevices.length === 0
          }
          onChange={(event) => handleSelect(event.target.value)}
          value={selectedClamshellMicrophone}
        >
          <NativeSelectOption disabled value="">
            {isLoading || audioDevices.length === 0
              ? "Loading..."
              : "Select microphone..."}
          </NativeSelectOption>
          {audioDevices.map((device) => (
            <NativeSelectOption key={device.name} value={device.name}>
              {device.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <TooltipProvider>
          <ButtonGroup className="">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isUpdating("clamshell_microphone") || isLoading}
                  onClick={handleReset}
                  size="icon"
                  variant="outline"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset to default</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  disabled={isLoading}
                  onClick={refreshAudioDevices}
                  size="icon"
                  variant="outline"
                >
                  <RefreshCw className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Refresh devices</TooltipContent>
            </Tooltip>
          </ButtonGroup>
        </TooltipProvider>
      </div>
    </SettingContainer>
  );
};

ClamshellMicrophoneSelector.displayName = "ClamshellMicrophoneSelector";
