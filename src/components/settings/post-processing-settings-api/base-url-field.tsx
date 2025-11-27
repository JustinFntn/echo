import React, { useState } from "react";
import { Input } from "../../ui/Input";

interface BaseUrlFieldProps {
  value: string;
  onBlur: (value: string) => void;
  onChange?: (value: string) => void;
  disabled: boolean;
  placeholder?: string;
  className?: string;
}

export const BaseUrlField: React.FC<BaseUrlFieldProps> = ({
  value,
  onBlur,
  onChange,
  disabled,
  placeholder,
  className = "",
}) => {
  const [localValue, setLocalValue] = useState(value);

  // Sync with prop changes
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  const disabledMessage = disabled
    ? "Base URL is managed by the selected provider."
    : undefined;

  return (
    <Input
      type="text"
      value={localValue}
      onChange={handleChange}
      onBlur={() => onBlur(localValue)}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex-1 min-w-[360px] ${className}`}
      title={disabledMessage}
    />
  );
};

BaseUrlField.displayName = "BaseUrlField";
