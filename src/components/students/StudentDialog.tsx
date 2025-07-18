
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Student } from '@/hooks/useStudents';
import { useToast } from '@/hooks/use-toast';
import { StudentDialogHeader } from './StudentDialogHeader';
import { StudentFormFields } from './StudentFormFields';
import { StudentDialogActions } from './StudentDialogActions';

interface StudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student;
  onSave: (student: Omit<Student, 'id'> | Student) => void;
  teacherClasses?: string[];
}

export const StudentDialog: React.FC<StudentDialogProps> = ({
  open,
  onOpenChange,
  student,
  onSave,
  teacherClasses
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    age: '',
    parent: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
    schoolPayCode: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        class: student.class,
        age: student.age.toString(),
        parent: student.parent,
        phone: student.phone,
        email: student.email || '',
        address: student.address || '',
        dateOfBirth: student.dateOfBirth || '',
        schoolPayCode: student.schoolPayCode || ''
      });
    } else {
      setFormData({
        name: '',
        class: '',
        age: '',
        parent: '',
        phone: '',
        email: '',
        address: '',
        dateOfBirth: '',
        schoolPayCode: ''
      });
    }
  }, [student, open]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!formData.name || !formData.class || !formData.age || !formData.parent || !formData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate class selection for teachers
    if (teacherClasses && !teacherClasses.includes(formData.class)) {
      toast({
        title: "Error",
        description: "You can only add students to classes you teach.",
        variant: "destructive"
      });
      return;
    }

    const studentData = {
      ...formData,
      age: parseInt(formData.age),
      status: student?.status || 'active' as const,
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] p-0">
        <StudentDialogHeader student={student} teacherClasses={teacherClasses} />
        
        <ScrollArea className="max-h-[70vh] px-6">
          <form onSubmit={handleSubmit} className="py-4">
            <StudentFormFields
              formData={formData}
              setFormData={setFormData}
              teacherClasses={teacherClasses}
            />
          </form>
        </ScrollArea>
        
        <StudentDialogActions
          student={student}
          onCancel={() => onOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
