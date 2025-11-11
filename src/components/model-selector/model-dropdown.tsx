import React from "react";
import { ModelInfo } from "../../lib/types";
import { formatModelSize } from "../../lib/utils/format";
import { ProgressBar } from "../shared";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type ModelStatus =
  | "ready"
  | "loading"
  | "downloading"
  | "extracting"
  | "error"
  | "unloaded"
  | "none";

const getStatusColor = (status: ModelStatus): string => {
  switch (status) {
    case "ready":
      return "bg-brand";
    case "loading":
      return "bg-muted-foreground animate-pulse";
    case "downloading":
      return "bg-brand animate-pulse";
    case "extracting":
      return "bg-brand/70 animate-pulse";
    case "error":
      return "bg-destructive";
    case "unloaded":
      return "bg-muted";
    case "none":
      return "bg-destructive";
    default:
      return "bg-muted";
  }
};

interface DownloadProgress {
  model_id: string;
  downloaded: number;
  total: number;
  percentage: number;
}

interface ModelDropdownProps {
  models: ModelInfo[];
  currentModelId: string;
  downloadProgress: Map<string, DownloadProgress>;
  onModelSelect: (modelId: string) => void;
  onModelDownload: (modelId: string) => void;
  onModelDelete: (modelId: string) => Promise<void>;
  onError?: (error: string) => void;
  status: ModelStatus;
  displayText: string;
}

const ModelDropdown: React.FC<ModelDropdownProps> = ({
  models,
  currentModelId,
  downloadProgress,
  onModelSelect,
  onModelDownload,
  onModelDelete,
  onError,
  status,
  displayText,
}) => {
  const [open, setOpen] = React.useState(false);
  const availableModels = models.filter((m) => m.is_downloaded);
  const downloadableModels = models.filter((m) => !m.is_downloaded);
  const isFirstRun = availableModels.length === 0 && models.length > 0;

  const handleDeleteClick = async (e: React.MouseEvent, modelId: string) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await onModelDelete(modelId);
    } catch (err) {
      const errorMsg = `Failed to delete model: ${err}`;
      onError?.(errorMsg);
    }
  };

  const handleModelClick = (modelId: string) => {
    if (downloadProgress.has(modelId)) {
      return; // Don't allow interaction while downloading
    }
    onModelSelect(modelId);
    setOpen(false);
  };

  const handleDownloadClick = (modelId: string) => {
    if (downloadProgress.has(modelId)) {
      return; // Don't allow interaction while downloading
    }
    onModelDownload(modelId);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="xs"
          className="flex items-center gap-2 hover:text-text/80 transition-colors"
          title={`Model status: ${displayText}`}
        >
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
          <span className="max-w-28 truncate">{displayText}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-92 p-0!" align="start" side="top">
        <ScrollArea className="*:max-h-[200px] p-0! *:p-2" disableMaskingSide={["left", "right"]}>
          <ScrollBar orientation="vertical" />
          {/* First Run Welcome */}
          {isFirstRun && (
            <div className="px-3 py-2 bg-background/10 backdrop-blur-lg border-foreground/10 border rounded-xl mb-1">
              <div className="text-xs font-medium text-foreground mb-1">
                Welcome to Echo!
              </div>
              <div className="text-xs text-foreground/80">
                Download a model below to get started with transcription.
              </div>
            </div>
          )}

          {/* Available Models */}
          {availableModels.length > 0 && (
            <>
              <DropdownMenuLabel>
                Available Models
              </DropdownMenuLabel>
              {availableModels.map((model) => (
                <DropdownMenuItem
                  key={model.id}
                  onClick={() => handleModelClick(model.id)}
                  className={cn("cursor-pointer",
                    currentModelId === model.id ? "bg-foreground/10 text-foreground" : ""
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                      <div className="text-sm font-medium tracking-tight">{model.name}</div>
                      <div className="text-[0.65rem] text-foreground/80 italic pr-4">
                        {model.description}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {currentModelId === model.id && (
                        <div className="text-xs text-foreground">Active</div>
                      )}
                      {currentModelId !== model.id && (
                        <Button
                          onClick={(e) => handleDeleteClick(e, model.id)}
                          variant="ghostDestructive"
                          size="icon-xs"
                          title={`Delete ${model.name}`}
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </>
          )}

          {/* Downloadable Models */}
          {downloadableModels.length > 0 && (
            <>
              {(availableModels.length > 0 || isFirstRun) && (
                <DropdownMenuSeparator />
              )}
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {isFirstRun ? "Choose a Model" : "Download Models"}
              </DropdownMenuLabel>
              {downloadableModels.map((model) => {
                const isDownloading = downloadProgress.has(model.id);
                const progress = downloadProgress.get(model.id);

                return (
                  <DropdownMenuItem
                    key={model.id}
                    onClick={() => handleDownloadClick(model.id)}
                    disabled={isDownloading}
                    className="cursor-pointer flex-col items-start"
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className="flex-1">
                        <div className="text-sm">
                          {model.name}
                          {model.id === "small" && isFirstRun && (
                            <span className="ml-2 text-xs bg-brand/20 text-brand px-1.5 py-0.5 rounded">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground/50 italic pr-4">
                          {model.description}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground/60 tabular-nums">
                          Download size · {formatModelSize(model.size_mb)}
                        </div>
                      </div>
                      <div className="text-xs text-brand tabular-nums font-mono">
                        {isDownloading && progress
                          ? `${Math.max(0, Math.min(100, Math.round(progress.percentage)))}%`
                          : "Download"}
                      </div>
                    </div>

                    {isDownloading && progress && (
                      <div className="mt-2 w-full">
                        <ProgressBar
                          progress={[
                            {
                              id: model.id,
                              percentage: progress.percentage,
                              label: model.name,
                            },
                          ]}
                          size="small"
                        />
                      </div>
                    )}
                  </DropdownMenuItem>
                );
              })}
            </>
          )}

          {/* No Models Available */}
          {availableModels.length === 0 && downloadableModels.length === 0 && (
            <div className="px-2 py-1.5 text-sm text-muted-foreground">
              No models available
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelDropdown;
