
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProfessionalInfoFieldsProps {
  formData: {
    status: 'Active' | 'On Leave' | 'Inactive';
    qualification: string;
    department: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const qualifications = [
  'Certificate in Education', 'Diploma in Education', 'Bachelor of Education',
  'Master of Education', 'PhD in Education', 'Bachelor of Arts', 'Bachelor of Science',
  'Master of Arts', 'Master of Science', 'Other'
];

const availableDepartments = [
  'Primary Lower', 'Primary Upper', 'Administration', 'Sports', 'Arts', 'Sciences'
];

export const ProfessionalInfoFields: React.FC<ProfessionalInfoFieldsProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="status" className="text-sm font-medium">Status</Label>
        <Select value={formData.status} onValueChange={(value) => onInputChange('status', value)}>
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="qualification" className="text-sm font-medium">Qualification</Label>
        <Select value={formData.qualification} onValueChange={(value) => onInputChange('qualification', value)}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select qualification" />
          </SelectTrigger>
          <SelectContent>
            {qualifications.map((qualification) => (
              <SelectItem key={qualification} value={qualification}>
                {qualification}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="department" className="text-sm font-medium">Department</Label>
        <Select value={formData.department} onValueChange={(value) => onInputChange('department', value)}>
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {availableDepartments.map((department) => (
              <SelectItem key={department} value={department}>
                {department}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
