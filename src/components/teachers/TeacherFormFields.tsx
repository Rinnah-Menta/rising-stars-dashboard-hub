
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

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

  const availableClasses = [
    'P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 
    'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'
  ];

  const availableSubjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Art & Craft', 
    'Physical Education', 'Music', 'Religious Education', 'Computer Studies',
    'Agriculture', 'Home Economics', 'French', 'Luganda'
  ];

  const availableDepartments = [
    'Primary Lower', 'Primary Upper', 'Administration', 'Sports', 'Arts', 'Sciences'
  ];

  const qualifications = [
    'Certificate in Education', 'Diploma in Education', 'Bachelor of Education',
    'Master of Education', 'PhD in Education', 'Bachelor of Arts', 'Bachelor of Science',
    'Master of Arts', 'Master of Science', 'Other'
  ];

  // Handle multi-select for classes
  const selectedClasses = formData.classes ? formData.classes.split(', ') : [];
  
  const handleClassToggle = (className: string) => {
    const currentClasses = selectedClasses;
    const updatedClasses = currentClasses.includes(className)
      ? currentClasses.filter(c => c !== className)
      : [...currentClasses, className];
    
    handleInputChange('classes', updatedClasses.join(', '));
  };

  const removeClass = (className: string) => {
    const updatedClasses = selectedClasses.filter(c => c !== className);
    handleInputChange('classes', updatedClasses.join(', '));
  };

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

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="classes">Classes Taught *</Label>
        <Select onValueChange={handleClassToggle}>
          <SelectTrigger>
            <SelectValue placeholder="Select classes to teach" />
          </SelectTrigger>
          <SelectContent>
            {availableClasses.map((className) => (
              <SelectItem 
                key={className} 
                value={className}
                disabled={selectedClasses.includes(className)}
              >
                {className} {selectedClasses.includes(className) && '✓'}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedClasses.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedClasses.map((className) => (
              <Badge key={className} variant="secondary" className="flex items-center gap-1">
                {className}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeClass(className)}
                />
              </Badge>
            ))}
          </div>
        )}
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
        <Select value={formData.qualification} onValueChange={(value) => handleInputChange('qualification', value)}>
          <SelectTrigger>
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

      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>
        <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
          <SelectTrigger>
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
