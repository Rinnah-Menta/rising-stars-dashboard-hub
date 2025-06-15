
import React from 'react';
import { Student } from '@/hooks/useStudents';
import { StudentDialog } from './StudentDialog';
import { StudentDetailsDialog } from './StudentDetailsDialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface StudentManagementProps {
  showAddDialog: boolean;
  setShowAddDialog: (show: boolean) => void;
  showDetailsDialog: boolean;
  setShowDetailsDialog: (show: boolean) => void;
  selectedStudent: Student | null;
  editingStudent: Student | null;
  setEditingStudent: (student: Student | null) => void;
  confirmationDialog: {
    open: boolean;
    type: 'add' | 'edit';
    data: any;
  };
  setConfirmationDialog: (dialog: any) => void;
  canManageStudents: boolean;
  isTeacher: boolean;
  getTeacherClasses: () => string[];
  handleAddStudent: (studentData: Omit<Student, 'id'>) => void;
  handleUpdateStudent: (studentData: Student) => void;
  handleEditStudent: (student: Student) => void;
  handleConfirmOperation: () => void;
  onCloseAddDialog: () => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({
  showAddDialog,
  setShowAddDialog,
  showDetailsDialog,
  setShowDetailsDialog,
  selectedStudent,
  editingStudent,
  setEditingStudent,
  confirmationDialog,
  setConfirmationDialog,
  canManageStudents,
  isTeacher,
  getTeacherClasses,
  handleAddStudent,
  handleUpdateStudent,
  handleEditStudent,
  handleConfirmOperation,
  onCloseAddDialog
}) => {
  return (
    <>
      {canManageStudents && (
        <StudentDialog
          open={showAddDialog}
          onOpenChange={(open) => {
            setShowAddDialog(open);
            if (!open) onCloseAddDialog();
          }}
          student={editingStudent}
          onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
          teacherClasses={isTeacher ? getTeacherClasses() : undefined}
        />
      )}

      <StudentDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        student={selectedStudent}
        onEdit={canManageStudents ? handleEditStudent : undefined}
      />

      <ConfirmationDialog
        open={confirmationDialog.open}
        onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, open })}
        title={`Submit ${confirmationDialog.type === 'add' ? 'Add' : 'Edit'} Request`}
        description={`This request will be sent to the admin for approval. ${confirmationDialog.type === 'add' ? 'The student will be added after approval.' : 'Changes will be applied after approval.'}`}
        confirmText="Submit Request"
        cancelText="Cancel"
        onConfirm={handleConfirmOperation}
        type={confirmationDialog.type === 'add' ? 'add' : 'edit'}
      />
    </>
  );
};
