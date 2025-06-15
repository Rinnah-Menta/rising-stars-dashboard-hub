
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Student } from '@/hooks/useStudents';
import { useToast } from '@/hooks/use-toast';

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSave: (student: Omit<Student, 'id'> | Student) => void;
}

export const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    age: '',
    parent: '',
    phone: '',
    fees: 'Pending' as 'Paid' | 'Pending' | 'Overdue',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        class: student.class,
        age: student.age.toString(),
        parent: student.parent,
        phone: student.phone,
        fees: student.fees,
        email: student.email || '',
        address: student.address || ''
      });
    } else {
      setFormData({
        name: '',
        class: '',
        age: '',
        parent: '',
        phone: '',
        fees: 'Pending',
        email: '',
        address: ''
      });
    }
  }, [student, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.class || !formData.age || !formData.parent || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const studentData = {
      ...formData,
      age: parseInt(formData.age),
      ...(student && { id: student.id })
    };

    onSave(studentData);
    onOpenChange(false);
    
    toast({
      title: student ? "Student updated" : "Student added",
      description: student 
        ? `${formData.name} has been updated successfully.`
        : `${formData.name} has been added successfully.`,
    });
  };

  const classes = ['P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh] px-6">
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
                  {classes.map(cls => (
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
          </form>
        </ScrollArea>
        <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
          <Button type="button" variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" size="sm" onClick={handleSubmit}>
            {student ? 'Update' : 'Add'} Student
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
