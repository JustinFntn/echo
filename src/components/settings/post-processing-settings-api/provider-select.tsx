import type React from "react";
import { NativeSelect, NativeSelectOption } from "../../ui/native-select";

interface DropdownOption {
  value: string;
  label: string;
}

interface ProviderSelectProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ProviderSelect: React.FC<ProviderSelectProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => (
  <NativeSelect
    className="flex-1"
    disabled={disabled}
    onChange={(e) => onChange(e.target.value)}
    value={value}
  >
    {options.map((option) => (
      <NativeSelectOption key={option.value} value={option.value}>
        {option.label}
      </NativeSelectOption>
    ))}
  </NativeSelect>
);

ProviderSelect.displayName = "ProviderSelect";
