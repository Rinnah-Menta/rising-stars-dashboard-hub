
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
  
  const handleCheckboxChange = (field: string, checked: boolean) => {
    handleInputChange(field, checked.toString());
  };

  const handleArrayInputChange = (field: string, value: string) => {
    // Convert comma-separated string to array
    const arrayValue = value.split(',').map(item => item.trim()).filter(item => item);
    handleInputChange(field, JSON.stringify(arrayValue));
  };

  const getArrayDisplayValue = (field: string) => {
    try {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      if (typeof value === 'string' && value.startsWith('[')) {
        return JSON.parse(value).join(', ');
      }
      return value || '';
    } catch {
      return formData[field] || '';
    }
  };

  const showResponsibilities = user?.role === 'teacher' || user?.role === 'non-teaching';

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
        {user?.role === 'teacher' && (
          <ProfileField
            id="subject"
            label="Primary Subject"
            value={formData.subject}
            isEditing={isEditing}
            onCapitalizedChange={handleCapitalizedInputChange}
          />
        )}
        <ProfileField
          id="joinDate"
          label="Joining Date"
          value={formData.joinDate}
          isEditing={isEditing}
          onChange={handleInputChange}
          type="date"
        />

        {/* Teacher-specific fields */}
        {user?.role === 'teacher' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="classesTaught" className="text-sm">Classes Taught</Label>
              {isEditing ? (
                <Input
                  id="classesTaught"
                  value={getArrayDisplayValue('classesTaught')}
                  onChange={(e) => handleArrayInputChange('classesTaught', e.target.value)}
                  placeholder="e.g., P.5A, P.6B, P.7A"
                  className="h-9"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
                  {getArrayDisplayValue('classesTaught') || 'Not specified'}
                </div>
              )}
              <p className="text-xs text-gray-500">Comma-separated list of classes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectsTaught" className="text-sm">Subjects Taught</Label>
              {isEditing ? (
                <Input
                  id="subjectsTaught"
                  value={getArrayDisplayValue('subjectsTaught')}
                  onChange={(e) => handleArrayInputChange('subjectsTaught', e.target.value)}
                  placeholder="e.g., Mathematics, Science, English"
                  className="h-9"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
                  {getArrayDisplayValue('subjectsTaught') || 'Not specified'}
                </div>
              )}
              <p className="text-xs text-gray-500">Comma-separated list of subjects</p>
            </div>
          </>
        )}
        
        {/* Responsibilities Section */}
        {showResponsibilities && (
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-medium text-sm">Responsibilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user?.role === 'teacher' && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isClassTeacher"
                    checked={formData.isClassTeacher === 'true' || formData.isClassTeacher === true}
                    onCheckedChange={(checked) => handleCheckboxChange('isClassTeacher', checked as boolean)}
                    disabled={!isEditing}
                  />
                  <Label htmlFor="isClassTeacher" className="text-sm">Class Teacher</Label>
                </div>
              )}
              
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
        )}
      </CardContent>
    </Card>
  );
};
