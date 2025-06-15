
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface TeacherFormFieldsProps {
  formData: {
    name: string;
    subject: string;
    classes: string;
    phone: string;
    status: 'Active' | 'On Leave' | 'Inactive';
    experience: string;
    email: string;
    address: string;
    qualification: string;
    department: string;
  };
  setFormData: (data: any) => void;
}

export const TeacherFormFields: React.FC<TeacherFormFieldsProps> = ({
  formData,
  setFormData
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const availableSubjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art & Craft', 
    'Physical Education', 'Music', 'Religious Education', 'Computer Studies'
  ];

  const availableClasses = [
    'P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 
    'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'
  ];

  const departments = [
    'Primary', 'Administration', 'Sports', 'Arts', 'Special Needs'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Teacher Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter teacher name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Primary Subject *</Label>
        <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            {availableSubjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="classes">Classes Taught</Label>
        <Input
          id="classes"
          value={formData.classes}
          onChange={(e) => handleInputChange('classes', e.target.value)}
          placeholder="e.g., P.5A, P.6B"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experience *</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          placeholder="e.g., 5 years"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="On Leave">On Leave</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="qualification">Qualification</Label>
        <Input
          id="qualification"
          value={formData.qualification}
          onChange={(e) => handleInputChange('qualification', e.target.value)}
          placeholder="e.g., Bachelor of Education"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
        />
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Address (Optional)</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter address"
          rows={2}
        />
      </div>
    </div>
  );
};
