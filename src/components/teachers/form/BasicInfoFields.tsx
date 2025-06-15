
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoFieldsProps {
  formData: {
    name: string;
    subject: string;
    phone: string;
    experience: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const availableSubjects = [
  'Mathematics', 'English', 'Science', 'Social Studies', 'Art & Craft', 
  'Physical Education', 'Music', 'Religious Education', 'Computer Studies',
  'Agriculture', 'Home Economics', 'French', 'Luganda'
];

export const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  formData,
  onInputChange
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Teacher Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          placeholder="Enter teacher name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Primary Subject *</Label>
        <Select value={formData.subject} onValueChange={(value) => onInputChange('subject', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select primary subject" />
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
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => onInputChange('phone', e.target.value)}
          placeholder="Enter phone number"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Experience *</Label>
        <Input
          id="experience"
          value={formData.experience}
          onChange={(e) => onInputChange('experience', e.target.value)}
          placeholder="e.g., 5 years"
          required
        />
      </div>
    </>
  );
};
