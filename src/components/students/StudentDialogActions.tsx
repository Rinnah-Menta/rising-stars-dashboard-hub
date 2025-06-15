
import React from 'react';
import { Button } from '@/components/ui/button';
import { Student } from '@/hooks/useStudents';

interface StudentDialogActionsProps {
  student?: Student;
  onCancel: () => void;
  onSubmit: () => void;
}

export const StudentDialogActions: React.FC<StudentDialogActionsProps> = ({
  student,
  onCancel,
  onSubmit
}) => {
  return (
    <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
      <Button type="button" variant="outline" size="sm" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" size="sm" onClick={onSubmit}>
        {student ? 'Update' : 'Add'} Student
      </Button>
    </div>
  );
};
