
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfileField } from './ProfileField';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleMultiSelectChange = (field: string, value: string) => {
    try {
      const currentValues = Array.isArray(formData[field]) 
        ? formData[field] 
        : JSON.parse(formData[field] || '[]');
      
      let newValues;
      if (currentValues.includes(value)) {
        newValues = currentValues.filter((item: string) => item !== value);
      } else {
        newValues = [...currentValues, value];
      }
      
      handleInputChange(field, JSON.stringify(newValues));
    } catch {
      handleInputChange(field, JSON.stringify([value]));
    }
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

  const getSelectedValues = (field: string): string[] => {
    try {
      const value = formData[field];
      if (Array.isArray(value)) {
        return value;
      }
      if (typeof value === 'string' && value.startsWith('[')) {
        return JSON.parse(value);
      }
      return [];
    } catch {
      return [];
    }
  };

  const availableClasses = [
    'P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 
    'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'
  ];

  const availableSubjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 
    'Religious Education', 'Physical Education', 'Art & Craft',
    'Computer Studies', 'Music', 'Local Language'
  ];

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
                <div className="space-y-2">
                  <Select onValueChange={(value) => handleMultiSelectChange('classesTaught', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select classes to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableClasses.map((className) => (
                        <SelectItem 
                          key={className} 
                          value={className}
                          className={getSelectedValues('classesTaught').includes(className) ? 'bg-blue-50' : ''}
                        >
                          {className} {getSelectedValues('classesTaught').includes(className) ? '✓' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getSelectedValues('classesTaught').length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {getSelectedValues('classesTaught').map((className) => (
                        <span 
                          key={className}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-blue-200"
                          onClick={() => handleMultiSelectChange('classesTaught', className)}
                        >
                          {className} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
                  {getArrayDisplayValue('classesTaught') || 'Not specified'}
                </div>
              )}
              <p className="text-xs text-gray-500">Click to select/deselect classes</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subjectsTaught" className="text-sm">Subjects Taught</Label>
              {isEditing ? (
                <div className="space-y-2">
                  <Select onValueChange={(value) => handleMultiSelectChange('subjectsTaught', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subjects to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSubjects.map((subject) => (
                        <SelectItem 
                          key={subject} 
                          value={subject}
                          className={getSelectedValues('subjectsTaught').includes(subject) ? 'bg-green-50' : ''}
                        >
                          {subject} {getSelectedValues('subjectsTaught').includes(subject) ? '✓' : ''}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {getSelectedValues('subjectsTaught').length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {getSelectedValues('subjectsTaught').map((subject) => (
                        <span 
                          key={subject}
                          className="bg-green-100 text-green-800 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-green-200"
                          onClick={() => handleMultiSelectChange('subjectsTaught', subject)}
                        >
                          {subject} ×
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-3 py-2 bg-gray-50 rounded-md text-sm">
                  {getArrayDisplayValue('subjectsTaught') || 'Not specified'}
                </div>
              )}
              <p className="text-xs text-gray-500">Click to select/deselect subjects</p>
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
