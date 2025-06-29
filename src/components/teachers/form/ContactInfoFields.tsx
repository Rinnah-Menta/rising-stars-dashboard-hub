
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContactInfoFieldsProps {
  formData: {
    email: string;
    address: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="email" className="text-sm font-medium">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter email address"
          className="h-9"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="address" className="text-sm font-medium">Address (Optional)</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Enter address"
          rows={2}
          className="resize-none"
        />
      </div>
    </>
  );
};
