import React, { useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import type { ModelOption } from "./types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type ModelSelectProps = {
  value: string;
  options: ModelOption[];
  disabled?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  allowCreate?: boolean;
  onSelect: (value: string) => void;
  onCreate?: (value: string) => void;
  onBlur: () => void;
  className?: string;
};

export const ModelSelect: React.FC<ModelSelectProps> = ({
  value,
  options,
  disabled,
  placeholder = "Select model...",
  isLoading,
  allowCreate = true,
  onSelect,
  onCreate,
  onBlur,
  className = "flex-1 min-w-[360px]",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setOpen(false);
    setSearch("");
  };

  const handleCreate = () => {
    const trimmed = search.trim();
    if (trimmed && onCreate) {
      onCreate(trimmed);
      setOpen(false);
      setSearch("");
    }
  };

  const filteredOptions = options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase()) ||
      opt.value.toLowerCase().includes(search.toLowerCase())
  );

  const showCreateOption =
    allowCreate &&
    search.trim() &&
    !options.some(
      (opt) =>
        opt.value.toLowerCase() === search.trim().toLowerCase() ||
        opt.label.toLowerCase() === search.trim().toLowerCase()
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          disabled={disabled || isLoading}
          onBlur={onBlur}
          className={cn("justify-between text-sm font-normal", className)}
        >
          <span className="truncate">
            {selectedOption?.label || value || placeholder}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-96">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={
              allowCreate ? "Search or enter custom model..." : "Search model..."
            }
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {allowCreate && search.trim() ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-brand hover:bg-accent rounded-sm cursor-pointer"
                >
                  <PlusIcon className="h-4 w-4" />
                  Create "{search.trim()}"
                </button>
              ) : (
                "No model found."
              )}
            </CommandEmpty>
            <CommandGroup heading="Available Models">
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                  className={cn(
                    "cursor-pointer",
                    value === option.value && "bg-foreground/10 text-foreground"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1">
                      <div className="text-sm font-medium tracking-tight">
                        {option.label}
                      </div>
                    </div>
                    {value === option.value && (
                      <div className="flex items-center gap-2">
                        <CheckIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CommandItem>
              ))}
              {showCreateOption && (
                <CommandItem
                  value={`__create__${search.trim()}`}
                  onSelect={handleCreate}
                  className="cursor-pointer text-brand"
                >
                  <div className="flex items-center gap-2">
                    <PlusIcon className="h-4 w-4" />
                    <span>Create "{search.trim()}"</span>
                  </div>
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

ModelSelect.displayName = "ModelSelect";
