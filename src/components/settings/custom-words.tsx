import { BookText, PlusIcon, XIcon } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useSettings } from "../../hooks/use-settings";
import { Button } from "../ui/Button";
import { ButtonGroup } from "../ui/button-group";
import { Input } from "../ui/Input";
import { SettingContainer } from "../ui/SettingContainer";

interface CustomWordsProps {
  descriptionMode?: "inline" | "tooltip";
  grouped?: boolean;
}

export const CustomWords = ({
  descriptionMode = "tooltip",
  grouped = false,
}: CustomWordsProps) => {
  const { getSetting, updateSetting, isUpdating } = useSettings();
  const [newWord, setNewWord] = useState("");
  const customWords = getSetting("custom_words") || [];

  const handleAddWord = () => {
    const trimmedWord = newWord.trim();
    const sanitizedWord = trimmedWord.replace(/[<>"'&]/g, "");
    if (
      sanitizedWord &&
      !sanitizedWord.includes(" ") &&
      sanitizedWord.length <= 50 &&
      !customWords.includes(sanitizedWord)
    ) {
      updateSetting("custom_words", [...customWords, sanitizedWord]);
      setNewWord("");
    }
  };

  const handleRemoveWord = (wordToRemove: string) => {
    updateSetting(
      "custom_words",
      customWords.filter((word) => word !== wordToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddWord();
    }
  };

  return (
    <>
      <SettingContainer
        description="Add words that are often misheard or misspelled during transcription. The system will automatically correct similar-sounding words to match your list."
        descriptionMode={descriptionMode}
        grouped={grouped}
        icon={<BookText className="h-4 w-4" />}
        title="Custom Words"
      >
        <ButtonGroup className="w-full">
          <Input
            className="min-w-0"
            disabled={isUpdating("custom_words")}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a word"
            type="text"
            value={newWord}
            variant="button"
          />
          <Button
            disabled={
              !newWord.trim() ||
              newWord.includes(" ") ||
              newWord.trim().length > 50 ||
              isUpdating("custom_words")
            }
            onClick={handleAddWord}
            size="icon"
            variant="default"
          >
            <PlusIcon className="h-4 w-4" />
          </Button>
        </ButtonGroup>
      </SettingContainer>
      {customWords.length > 0 && (
        <div
          className={`p-2 px-4 ${grouped ? "" : "rounded-lg border border-border/20"}`}
        >
          <ButtonGroup className="w-full flex-wrap gap-1">
            {customWords.map((word) => (
              <Button
                aria-label={`Remove ${word}`}
                className="gap-1 text-muted-foreground hover:text-foreground"
                disabled={isUpdating("custom_words")}
                key={word}
                onClick={() => handleRemoveWord(word)}
                size="xs"
                variant="ghost"
              >
                <span>{word}</span>
                <XIcon className="h-3 w-3" />
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}
    </>
  );
};
