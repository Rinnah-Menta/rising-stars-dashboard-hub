
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

interface ContactTabProps {
  formData: any;
  isEditing: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleCapitalizedInputChange: (field: string, value: string) => void;
}

export const ContactTab: React.FC<ContactTabProps> = ({
  formData,
  isEditing,
  handleInputChange,
  handleCapitalizedInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Emergency Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField
            id="email"
            label="Email"
            value={formData.email}
            isEditing={isEditing}
            onChange={handleInputChange}
            type="email"
          />
          <ProfileField
            id="phone"
            label="Phone"
            value={formData.phone}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
        </div>
        <ProfileField
          id="address"
          label="Address"
          value={formData.address}
          isEditing={isEditing}
          onChange={handleInputChange}
          component="textarea"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
          <ProfileField
            id="emergencyContact"
            label="Emergency Contact Name"
            value={formData.emergencyContact}
            isEditing={isEditing}
            onCapitalizedChange={handleCapitalizedInputChange}
          />
          <ProfileField
            id="emergencyPhone"
            label="Emergency Contact Phone"
            value={formData.emergencyPhone}
            isEditing={isEditing}
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
