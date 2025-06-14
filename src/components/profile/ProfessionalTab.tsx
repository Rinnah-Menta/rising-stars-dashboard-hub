
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

interface ProfessionalTabProps {
  formData: any;
  isEditing: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleCapitalizedInputChange: (field: string, value: string) => void;
}

export const ProfessionalTab: React.FC<ProfessionalTabProps> = ({
  formData,
  isEditing,
  handleInputChange,
  handleCapitalizedInputChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField
          id="qualification"
          label="Qualification"
          value={formData.qualification}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          id="experience"
          label="Experience (years)"
          value={formData.experience}
          isEditing={isEditing}
          onChange={handleInputChange}
        />
        <ProfileField
          id="department"
          label="Department"
          value={formData.department}
          isEditing={isEditing}
          onCapitalizedChange={handleCapitalizedInputChange}
        />
        <ProfileField
          id="subject"
          label="Subject"
          value={formData.subject}
          isEditing={isEditing}
          onCapitalizedChange={handleCapitalizedInputChange}
        />
        <ProfileField
          id="joinDate"
          label="Joining Date"
          value={formData.joinDate}
          isEditing={isEditing}
          onChange={handleInputChange}
          type="date"
        />
      </CardContent>
    </Card>
  );
};
