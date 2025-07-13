
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface StudentFormFieldsProps {
  formData: {
    name: string;
    class: string;
    age: string;
    parent: string;
    phone: string;
    email: string;
    address: string;
    dateOfBirth: string;
    schoolPayCode: string;
  };
  setFormData: (data: any) => void;
  teacherClasses?: string[];
}

export const StudentFormFields: React.FC<StudentFormFieldsProps> = ({
  formData,
  setFormData,
  teacherClasses
}) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const availableClasses = [
    'P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 
    'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'
  ];

  // If teacher has specific classes, use those, otherwise use all available classes
  const classOptions = teacherClasses && teacherClasses.length > 0 ? teacherClasses : availableClasses;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-medium">Student Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter student name"
            className="h-9"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="class" className="text-sm font-medium">Class *</Label>
          <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((className) => (
                <SelectItem key={className} value={className}>
                  {className}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label htmlFor="age" className="text-sm font-medium">Age *</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="Enter age"
            min="3"
            max="18"
            className="h-9"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="parent" className="text-sm font-medium">Parent/Guardian *</Label>
          <Input
            id="parent"
            value={formData.parent}
            onChange={(e) => handleInputChange('parent', e.target.value)}
            placeholder="Enter parent/guardian name"
            className="h-9"
            required
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Enter phone number"
            className="h-9"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="h-9"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="schoolPayCode" className="text-sm font-medium">School Pay Code</Label>
          <Input
            id="schoolPayCode"
            value={formData.schoolPayCode}
            onChange={(e) => handleInputChange('schoolPayCode', e.target.value)}
            placeholder="Enter school pay code"
            className="h-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm font-medium">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter email address"
            className="h-9"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label htmlFor="address" className="text-sm font-medium">Address (Optional)</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter address"
          rows={2}
          className="resize-none"
        />
      </div>
    </div>
  );
};
