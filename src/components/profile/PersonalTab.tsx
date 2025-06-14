
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';

interface PersonalTabProps {
  formData: any;
  isEditing: boolean;
  handleInputChange: (field: string, value: string) => void;
  handleCapitalizedInputChange: (field: string, value: string) => void;
}

export const PersonalTab: React.FC<PersonalTabProps> = ({
  formData,
  isEditing,
  handleInputChange,
  handleCapitalizedInputChange
}) => {
  const genderOptions = [
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Other', label: 'Other' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField
          id="firstName"
          label="First Name"
          value={formData.firstName}
          isEditing={isEditing}
          onCapitalizedChange={handleCapitalizedInputChange}
        />
        <ProfileField
          id="lastName"
          label="Last Name"
          value={formData.lastName}
          isEditing={isEditing}
          onCapitalizedChange={handleCapitalizedInputChange}
        />
        <ProfileField
          id="middleName"
          label="Middle Name"
          value={formData.middleName}
          isEditing={isEditing}
          onCapitalizedChange={handleCapitalizedInputChange}
        />
        <ProfileField
          id="gender"
          label="Gender"
          value={formData.gender}
          isEditing={isEditing}
          onChange={handleInputChange}
          component="select"
          options={genderOptions}
        />
      </CardContent>
    </Card>
  );
};
