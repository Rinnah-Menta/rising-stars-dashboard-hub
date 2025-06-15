
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Student } from '@/hooks/useStudents';

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
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    class: string;
    age: string;
    parent: string;
    phone: string;
    fees: 'Paid' | 'Pending' | 'Overdue';
    email: string;
    address: string;
  }>>;
  teacherClasses?: string[];
}

export const StudentFormFields: React.FC<StudentFormFieldsProps> = ({
  formData,
  setFormData,
  teacherClasses
}) => {
  const allClasses = ['P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'];
  const availableClasses = teacherClasses || allClasses;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Student name"
            className="h-9"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className="text-sm">Age *</Label>
          <Input
            id="age"
            type="number"
            min="5"
            max="18"
            value={formData.age}
            onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
            placeholder="Age"
            className="h-9"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="class" className="text-sm">Class *</Label>
        <Select 
          value={formData.class} 
          onValueChange={(value) => setFormData(prev => ({ ...prev, class: value }))}
        >
          <SelectTrigger className="h-9">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            {availableClasses.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent" className="text-sm">Parent/Guardian *</Label>
        <Input
          id="parent"
          value={formData.parent}
          onChange={(e) => setFormData(prev => ({ ...prev, parent: e.target.value }))}
          placeholder="Parent or guardian name"
          className="h-9"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm">Phone *</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="+256 700 123 456"
          className="h-9"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="student@email.com"
          className="h-9"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fees" className="text-sm">Fees Status</Label>
        <Select 
          value={formData.fees} 
          onValueChange={(value: 'Paid' | 'Pending' | 'Overdue') => 
            setFormData(prev => ({ ...prev, fees: value }))
          }
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          placeholder="Home address"
          className="h-9"
        />
      </div>
    </>
  );
};
