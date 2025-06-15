
import React from 'react';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AccountActionDialog } from '@/components/ui/account-action-dialog';
import { Teacher } from './TeachersTable';
import { useToast } from '@/hooks/use-toast';

interface TeacherTableDialogsProps {
  confirmDialog: {
    open: boolean;
    type: 'delete';
    teacherName: string;
    teacherId: string;
  };
  setConfirmDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    type: 'delete';
    teacherName: string;
    teacherId: string;
  }>>;
  accountActionDialog: {
    open: boolean;
    action: 'archive' | 'suspend';
    teacher: Teacher | null;
  };
  setAccountActionDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    action: 'archive' | 'suspend';
    teacher: Teacher | null;
  }>>;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
}

export const TeacherTableDialogs: React.FC<TeacherTableDialogsProps> = ({
  confirmDialog,
  setConfirmDialog,
  accountActionDialog,
  setAccountActionDialog,
  onDelete,
  onArchive
}) => {
  const { toast } = useToast();

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(confirmDialog.teacherId);
      toast({
        title: "Teacher Deleted",
        description: `${confirmDialog.teacherName} has been removed from the system.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({ open: false, type: 'delete', teacherName: '', teacherId: '' });
  };

  const handleAccountAction = (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => {
    const { action, teacher } = accountActionDialog;
    
    if (action === 'archive' && onArchive && teacher) {
      onArchive(teacher.id);
      toast({
        title: "Teacher Archived",
        description: `${teacher.name} has been archived. Reason: ${data.reason}`,
      });
    } else if (action === 'suspend' && teacher) {
      const endDateText = data.suspensionEndDate ? ` until ${data.suspensionEndDate.toLocaleDateString()}` : '';
      toast({
        title: "Teacher Suspended",
        description: `${teacher.name} has been suspended${endDateText}. Reason: ${data.reason}`,
      });
    }
    
    setAccountActionDialog({ open: false, action: 'archive', teacher: null });
  };

  return (
    <>
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Delete Teacher"
        description={`Are you sure you want to permanently delete ${confirmDialog.teacherName}? This action cannot be undone and will remove all teacher records.`}
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
        personName={accountActionDialog.teacher?.name || ''}
        personType="teacher"
        onConfirm={handleAccountAction}
      />
    </>
  );
};
