
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { startOfToday } from 'date-fns';
import { ReasonSelector } from './account-action-dialog/ReasonSelector';
import { CalendarPopover } from './account-action-dialog/CalendarPopover';
import { DialogIcon } from './account-action-dialog/DialogIcon';

interface AccountActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: 'archive' | 'delete' | 'suspend' | 'expel';
  personName: string;
  personType: 'student' | 'teacher' | 'staff';
  onConfirm: (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => void;
}

export const AccountActionDialog: React.FC<AccountActionDialogProps> = ({
  open,
  onOpenChange,
  action,
  personName,
  personType,
  onConfirm
}) => {
  const [reason, setReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [suspensionEndDate, setSuspensionEndDate] = useState<Date>(startOfToday());
  const [nextSteps, setNextSteps] = useState('');

  const getTitle = () => {
    switch (action) {
      case 'archive':
        return `Archive ${personType}`;
      case 'delete':
        return `Delete ${personType}`;
      case 'suspend':
        return `Suspend ${personType}`;
      case 'expel':
        return `Expel ${personType}`;
      default:
        return 'Account Action';
    }
  };

  const handleSubmit = () => {
    onConfirm({
      reason: reason === 'Other' ? customReason : reason,
      customReason: reason === 'Other' ? customReason : undefined,
      suspensionEndDate: action === 'suspend' ? suspensionEndDate : undefined,
      nextSteps: nextSteps || undefined
    });
    
    // Reset form
    setReason('');
    setCustomReason('');
    setSuspensionEndDate(startOfToday());
    setNextSteps('');
  };

  const isValid = reason && (reason !== 'Other' || customReason) && 
    (action !== 'suspend' || suspensionEndDate);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <DialogIcon action={action} />
            <DialogTitle>{getTitle()}</DialogTitle>
          </div>
          <DialogDescription>
            Provide details for {action}ing {personName}'s account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <ReasonSelector
            action={action}
            personType={personType}
            reason={reason}
            setReason={setReason}
            customReason={customReason}
            setCustomReason={setCustomReason}
          />

          {action === 'suspend' && (
            <CalendarPopover
              suspensionEndDate={suspensionEndDate}
              setSuspensionEndDate={setSuspensionEndDate}
            />
          )}

          <div className="space-y-2">
            <Label htmlFor="nextSteps">Next Steps / Instructions (Optional)</Label>
            <Textarea
              id="nextSteps"
              placeholder="Any additional instructions or next steps..."
              value={nextSteps}
              onChange={(e) => setNextSteps(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValid}
            variant={action === 'delete' || action === 'expel' ? 'destructive' : 'default'}
          >
            {action === 'archive' ? 'Archive' : action === 'delete' ? 'Delete' : action === 'suspend' ? 'Suspend' : 'Expel'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
