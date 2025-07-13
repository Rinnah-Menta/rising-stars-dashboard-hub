
import React from 'react';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AccountActionDialog } from '@/components/ui/account-action-dialog';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parent: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled';
}

interface StudentTableDialogsProps {
  confirmDialog: {
    open: boolean;
    type: 'delete';
    studentName: string;
    studentId: string;
  };
  setConfirmDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    type: 'delete';
    studentName: string;
    studentId: string;
  }>>;
  accountActionDialog: {
    open: boolean;
    action: 'archive' | 'suspend' | 'expel';
    student: Student | null;
  };
  setAccountActionDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    action: 'archive' | 'suspend' | 'expel';
    student: Student | null;
  }>>;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onExpel?: (id: string) => void;
}

export const StudentTableDialogs: React.FC<StudentTableDialogsProps> = ({
  confirmDialog,
  setConfirmDialog,
  accountActionDialog,
  setAccountActionDialog,
  onDelete,
  onArchive,
  onSuspend,
  onExpel
}) => {
  const { toast } = useToast();

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(confirmDialog.studentId);
      toast({
        title: "Student Deleted",
        description: `${confirmDialog.studentName} has been removed from the system.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({ open: false, type: 'delete', studentName: '', studentId: '' });
  };

  const handleAccountAction = (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => {
    const { action, student } = accountActionDialog;
    
    if (action === 'archive' && onArchive && student) {
      onArchive(student.id);
      toast({
        title: "Student Archived",
        description: `${student.name} has been archived. Reason: ${data.reason}`,
      });
    } else if (action === 'suspend' && onSuspend && student) {
      onSuspend(student.id);
      const endDateText = data.suspensionEndDate ? ` until ${data.suspensionEndDate.toLocaleDateString()}` : '';
      toast({
        title: "Student Suspended",
        description: `${student.name} has been suspended${endDateText}. Reason: ${data.reason}`,
      });
    } else if (action === 'expel' && onExpel && student) {
      onExpel(student.id);
      toast({
        title: "Student Expelled",
        description: `${student.name} has been expelled from the institution. Reason: ${data.reason}`,
        variant: "destructive"
      });
    }
    
    setAccountActionDialog({ open: false, action: 'archive', student: null });
  };

  return (
    <>
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Delete Student"
        description={`Are you sure you want to permanently delete ${confirmDialog.studentName}? This action cannot be undone and will remove all student records.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
        type="delete"
      />

      <AccountActionDialog
        open={accountActionDialog.open}
        onOpenChange={(open) => setAccountActionDialog({ ...accountActionDialog, open })}
        action={accountActionDialog.action}
        personName={accountActionDialog.student?.name || ''}
        personType="student"
        onConfirm={handleAccountAction}
      />
    </>
  );
};
