
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfileFieldProps {
  id: string;
  label: string;
  value: string;
  isEditing: boolean;
  onChange?: (field: string, value: string) => void;
  onCapitalizedChange?: (field: string, value: string) => void;
  type?: string;
  component?: 'input' | 'textarea' | 'select';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({
  id,
  label,
  value,
  isEditing,
  onChange,
  onCapitalizedChange,
  type = 'text',
  component = 'input',
  options = [],
  placeholder
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onCapitalizedChange) {
      onCapitalizedChange(id, e.target.value);
    } else if (onChange) {
      onChange(id, e.target.value);
    }
  };

  const handleSelectChange = (selectedValue: string) => {
    if (onChange) {
      onChange(id, selectedValue);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm p-2 bg-muted rounded min-h-[40px]">{value}</p>
      </div>
    );
  }

  if (component === 'select') {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Select value={value} onValueChange={handleSelectChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {component === 'textarea' ? (
        <Textarea id={id} value={value} onChange={handleChange} rows={3} placeholder={placeholder} />
      ) : (
        <Input id={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} />
      )}
    </div>
  );
};
