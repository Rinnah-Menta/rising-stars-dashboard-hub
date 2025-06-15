
import React from 'react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Student } from '@/hooks/useStudents';

interface StudentDialogHeaderProps {
  student?: Student;
  teacherClasses?: string[];
}

export const StudentDialogHeader: React.FC<StudentDialogHeaderProps> = ({
  student,
  teacherClasses
}) => {
  return (
    <DialogHeader className="px-6 py-4 border-b">
      <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
      {teacherClasses && (
        <p className="text-sm text-gray-600">
          You can only add students to your classes: {teacherClasses.join(', ')}
        </p>
      )}
    </DialogHeader>
  );
};
