import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface NINInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function NINInputField({ value, onChange, error, disabled }: NINInputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Only allow numbers and limit to 11 digits
    const numericValue = inputValue.replace(/\D/g, '').slice(0, 11);
    onChange(numericValue);
  };

  const formatDisplayValue = (nin: string) => {
    if (!isFocused && nin.length === 11) {
      // Mask the middle digits when not focused
      return nin.slice(0, 3) + '*'.repeat(5) + nin.slice(8);
    }
    return nin;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="nin" className="text-[var(--nimc-secondary)]">
        National Identification Number (NIN)
      </Label>
      <div className="relative">
        <Input
          id="nin"
          type="text"
          placeholder="Enter your 11-digit NIN"
          value={formatDisplayValue(value)}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          className={`${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--nimc-text)]/30 focus:border-[var(--nimc-primary)]'} text-[var(--nimc-dark)]`}
          maxLength={11}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <span className={`text-xs ${value.length === 11 ? 'text-green-600' : 'text-[var(--nimc-text)]'}`}>
            {value.length}/11
          </span>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-[var(--nimc-text)]">
        Your NIN is encrypted and stored securely. We use it only for identity verification.
      </p>
    </div>
  );
}