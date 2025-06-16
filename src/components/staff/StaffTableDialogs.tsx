
import React from 'react';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AccountActionDialog } from '@/components/ui/account-action-dialog';
import { StaffMember } from './StaffTable';
import { useToast } from '@/hooks/use-toast';

interface StaffTableDialogsProps {
  confirmDialog: {
    open: boolean;
    type: 'delete';
    staffName: string;
    staffId: string;
  };
  setConfirmDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    type: 'delete';
    staffName: string;
    staffId: string;
  }>>;
  accountActionDialog: {
    open: boolean;
    action: 'archive' | 'suspend' | 'terminate';
    staffMember: StaffMember | null;
  };
  setAccountActionDialog: React.Dispatch<React.SetStateAction<{
    open: boolean;
    action: 'archive' | 'suspend' | 'terminate';
    staffMember: StaffMember | null;
  }>>;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onTerminate?: (id: string) => void;
}

export const StaffTableDialogs: React.FC<StaffTableDialogsProps> = ({
  confirmDialog,
  setConfirmDialog,
  accountActionDialog,
  setAccountActionDialog,
  onDelete,
  onArchive,
  onSuspend,
  onTerminate
}) => {
  const { toast } = useToast();

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(confirmDialog.staffId);
      toast({
        title: "Staff Member Deleted",
        description: `${confirmDialog.staffName} has been removed from the system.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({ open: false, type: 'delete', staffName: '', staffId: '' });
  };

  const handleAccountAction = (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => {
    const { action, staffMember } = accountActionDialog;
    
    if (action === 'archive' && onArchive && staffMember) {
      onArchive(staffMember.id);
      toast({
        title: "Staff Member Archived",
        description: `${staffMember.name} has been archived. Reason: ${data.reason}`,
      });
    } else if (action === 'suspend' && onSuspend && staffMember) {
      onSuspend(staffMember.id);
      const endDateText = data.suspensionEndDate ? ` until ${data.suspensionEndDate.toLocaleDateString()}` : '';
      toast({
        title: "Staff Member Suspended",
        description: `${staffMember.name} has been suspended${endDateText}. Reason: ${data.reason}`,
      });
    } else if (action === 'terminate' && onTerminate && staffMember) {
      onTerminate(staffMember.id);
      toast({
        title: "Staff Member Terminated",
        description: `${staffMember.name} has been terminated from the institution. Reason: ${data.reason}`,
        variant: "destructive"
      });
    }
    
    setAccountActionDialog({ open: false, action: 'archive', staffMember: null });
  };

  return (
    <>
      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Delete Staff Member"
        description={`Are you sure you want to permanently delete ${confirmDialog.staffName}? This action cannot be undone and will remove all staff records.`}
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
        personName={accountActionDialog.staffMember?.name || ''}
        personType="staff"
        onConfirm={handleAccountAction}
      />
    </>
  );
};
