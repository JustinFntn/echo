import { Check, Copy, Star, Trash2 } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/button-group";

export interface HistoryEntry {
  id: number;
  file_name: string;
  timestamp: number;
  saved: boolean;
  title: string;
  transcription_text: string;
}

export interface HistoryEntryProps {
  entry: HistoryEntry;
  onToggleSaved: () => void;
  onCopyText: () => void;
  getAudioUrl: (fileName: string) => Promise<string | null>;
  deleteAudio: (id: number) => Promise<void>;
}

export const HistoryEntryComponent: React.FC<HistoryEntryProps> = ({
  entry,
  onToggleSaved,
  onCopyText,
  getAudioUrl,
  deleteAudio,
}) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const loadAudio = async () => {
      const url = await getAudioUrl(entry.file_name);
      setAudioUrl(url);
    };
    loadAudio();
  }, [entry.file_name, getAudioUrl]);

  const handleCopyText = () => {
    onCopyText();
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleDeleteClick = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Reset after 3 seconds if not confirmed
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }

    try {
      await deleteAudio(entry.id);
    } catch (error) {
      console.error("Failed to delete entry:", error);
      alert("Failed to delete entry. Please try again.");
      setConfirmDelete(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">{entry.title}</p>
        <ButtonGroup>
          <Button
            onClick={handleCopyText}
            size="icon-xs"
            title="Copy transcription to clipboard"
            variant="secondary"
          >
            {showCopied ? (
              <Check height={16} width={16} />
            ) : (
              <Copy height={16} width={16} />
            )}
          </Button>
          <Button
            className={entry.saved ? "text-brand" : ""}
            onClick={onToggleSaved}
            size="icon-xs"
            title={entry.saved ? "Remove from saved" : "Save transcription"}
            variant="secondary"
          >
            <Star
              fill={entry.saved ? "currentColor" : "none"}
              height={16}
              width={16}
            />
          </Button>
          <Button
            onClick={handleDeleteClick}
            size="icon-xs"
            title={
              confirmDelete ? "Click again to confirm delete" : "Delete entry"
            }
            variant={confirmDelete ? "ghostDestructive" : "secondary"}
          >
            {confirmDelete ? (
              <Check height={16} width={16} />
            ) : (
              <Trash2 height={16} width={16} />
            )}
          </Button>
        </ButtonGroup>
      </div>
      <p className="pb-2 text-sm text-text/90 italic">
        {entry.transcription_text}
      </p>
      {audioUrl && <AudioPlayer className="w-full" src={audioUrl} />}
    </div>
  );
};
