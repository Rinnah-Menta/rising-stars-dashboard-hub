
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
  const handleCheckboxChange = (field: string, checked: boolean) => {
    handleInputChange(field, checked.toString());
  };

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
        
        {/* Responsibilities Section */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="font-medium text-sm">Responsibilities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isClassTeacher"
                checked={formData.isClassTeacher === 'true' || formData.isClassTeacher === true}
                onCheckedChange={(checked) => handleCheckboxChange('isClassTeacher', checked as boolean)}
                disabled={!isEditing}
              />
              <Label htmlFor="isClassTeacher" className="text-sm">Class Teacher</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isDepartmentHead"
                checked={formData.isDepartmentHead === 'true' || formData.isDepartmentHead === true}
                onCheckedChange={(checked) => handleCheckboxChange('isDepartmentHead', checked as boolean)}
                disabled={!isEditing}
              />
              <Label htmlFor="isDepartmentHead" className="text-sm">Department Head</Label>
            </div>
          </div>
          
          {(formData.isDepartmentHead === 'true' || formData.isDepartmentHead === true) && (
            <ProfileField
              id="headOfDepartment"
              label="Head of Department"
              value={formData.headOfDepartment}
              isEditing={isEditing}
              onCapitalizedChange={handleCapitalizedInputChange}
              placeholder="e.g., Mathematics, Science, Languages"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
