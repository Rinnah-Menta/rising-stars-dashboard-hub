
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, AlertTriangle, Archive, Trash2, Clock } from 'lucide-react';
import { format, addDays, addMonths, addYears } from 'date-fns';
import { cn } from '@/lib/utils';

interface AccountActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: 'archive' | 'delete' | 'suspend';
  personName: string;
  personType: 'student' | 'teacher' | 'staff';
  onConfirm: (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => void;
}

const REASONS = {
  archive: {
    student: [
      'Graduated',
      'Transferred to another school',
      'Left due to relocation',
      'Medical reasons',
      'Academic performance',
      'Other'
    ],
    teacher: [
      'Resigned',
      'Contract ended',
      'Transferred to another branch',
      'Retirement',
      'Medical leave',
      'Performance issues',
      'Other'
    ],
    staff: [
      'Resigned',
      'Contract ended',
      'Position eliminated',
      'Transferred',
      'Retirement',
      'Performance issues',
      'Other'
    ]
  },
  delete: {
    student: [
      'Expelled for misconduct',
      'Falsified records',
      'Repeated violations',
      'Safety concerns',
      'Legal issues',
      'Other'
    ],
    teacher: [
      'Terminated for cause',
      'Misconduct',
      'Violation of policies',
      'Criminal activity',
      'Breach of contract',
      'Other'
    ],
    staff: [
      'Terminated for cause',
      'Misconduct',
      'Violation of policies',
      'Criminal activity',
      'Breach of contract',
      'Other'
    ]
  },
  suspend: {
    student: [
      'Disciplinary action',
      'Academic probation',
      'Behavioral issues',
      'Investigation pending',
      'Medical suspension',
      'Other'
    ],
    teacher: [
      'Investigation pending',
      'Performance review',
      'Policy violation',
      'Medical leave',
      'Disciplinary action',
      'Other'
    ],
    staff: [
      'Investigation pending',
      'Performance review',
      'Policy violation',
      'Medical leave',
      'Disciplinary action',
      'Other'
    ]
  }
};

const SUSPENSION_PERIODS = [
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '1 month', months: 1 },
  { label: '3 months', months: 3 },
  { label: '6 months', months: 6 },
  { label: '1 year', years: 1 },
  { label: 'Custom', custom: true }
];

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
  const [suspensionPeriod, setSuspensionPeriod] = useState('');
  const [customEndDate, setCustomEndDate] = useState<Date>();
  const [nextSteps, setNextSteps] = useState('');

  const getIcon = () => {
    switch (action) {
      case 'archive':
        return <Archive className="h-6 w-6 text-orange-600" />;
      case 'delete':
        return <Trash2 className="h-6 w-6 text-red-600" />;
      case 'suspend':
        return <Clock className="h-6 w-6 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-gray-600" />;
    }
  };

  const getTitle = () => {
    switch (action) {
      case 'archive':
        return `Archive ${personType}`;
      case 'delete':
        return `Delete ${personType}`;
      case 'suspend':
        return `Suspend ${personType}`;
      default:
        return 'Account Action';
    }
  };

  const calculateEndDate = () => {
    if (!suspensionPeriod || action !== 'suspend') return undefined;
    
    const period = SUSPENSION_PERIODS.find(p => p.label === suspensionPeriod);
    if (!period) return undefined;
    
    if (period.custom) return customEndDate;
    
    const now = new Date();
    if (period.days) return addDays(now, period.days);
    if (period.months) return addMonths(now, period.months);
    if (period.years) return addYears(now, period.years);
    
    return undefined;
  };

  const handleSubmit = () => {
    const endDate = calculateEndDate();
    
    onConfirm({
      reason: reason === 'Other' ? customReason : reason,
      customReason: reason === 'Other' ? customReason : undefined,
      suspensionEndDate: endDate,
      nextSteps: nextSteps || undefined
    });
    
    // Reset form
    setReason('');
    setCustomReason('');
    setSuspensionPeriod('');
    setCustomEndDate(undefined);
    setNextSteps('');
  };

  const isValid = reason && (reason !== 'Other' || customReason) && 
    (action !== 'suspend' || (suspensionPeriod && (suspensionPeriod !== 'Custom' || customEndDate)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            {getIcon()}
            <DialogTitle>{getTitle()}</DialogTitle>
          </div>
          <DialogDescription>
            Provide details for {action}ing {personName}'s account.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for {action}</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REASONS[action][personType].map((reasonOption) => (
                  <SelectItem key={reasonOption} value={reasonOption}>
                    {reasonOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {reason === 'Other' && (
            <div className="space-y-2">
              <Label htmlFor="customReason">Custom Reason</Label>
              <Textarea
                id="customReason"
                placeholder="Please specify the reason..."
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {action === 'suspend' && (
            <div className="space-y-2">
              <Label htmlFor="suspensionPeriod">Suspension Period</Label>
              <Select value={suspensionPeriod} onValueChange={setSuspensionPeriod}>
                <SelectTrigger>
                  <SelectValue placeholder="Select suspension period" />
                </SelectTrigger>
                <SelectContent>
                  {SUSPENSION_PERIODS.map((period) => (
                    <SelectItem key={period.label} value={period.label}>
                      {period.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {action === 'suspend' && suspensionPeriod === 'Custom' && (
            <div className="space-y-2">
              <Label>Custom End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !customEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {customEndDate ? format(customEndDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={customEndDate}
                    onSelect={setCustomEndDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
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
            variant={action === 'delete' ? 'destructive' : 'default'}
          >
            {action === 'archive' ? 'Archive' : action === 'delete' ? 'Delete' : 'Suspend'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
