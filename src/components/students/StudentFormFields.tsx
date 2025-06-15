
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudentFormFieldsProps {
  formData: {
    name: string;
    class: string;
    age: string;
    parent: string;
    phone: string;
    fees: 'Paid' | 'Pending' | 'Overdue';
    email: string;
    address: string;
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Student Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter student name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="class">Class *</Label>
        <Select value={formData.class} onValueChange={(value) => handleInputChange('class', value)}>
          <SelectTrigger>
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

      <div className="space-y-2">
        <Label htmlFor="age">Age *</Label>
        <Input
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => handleInputChange('age', e.target.value)}
          placeholder="Enter age"
          min="3"
          max="18"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent">Parent/Guardian *</Label>
        <Input
          id="parent"
          value={formData.parent}
          onChange={(e) => handleInputChange('parent', e.target.value)}
          placeholder="Enter parent/guardian name"
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
        <Label htmlFor="fees">Fees Status</Label>
        <Select value={formData.fees} onValueChange={(value) => handleInputChange('fees', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
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
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          placeholder="Enter address"
        />
      </div>
    </div>
  );
};
