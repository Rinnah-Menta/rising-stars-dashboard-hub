
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

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
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          placeholder="Enter email address"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Address (Optional)</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange('address', e.target.value)}
          placeholder="Enter address"
        />
      </div>
    </>
  );
};
