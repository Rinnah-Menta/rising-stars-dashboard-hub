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
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, AlertTriangle, Archive, Trash2, Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth } from 'date-fns';
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
  const [suspensionEndDate, setSuspensionEndDate] = useState<Date>();
  const [nextSteps, setNextSteps] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());

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
    setSuspensionEndDate(undefined);
    setNextSteps('');
  };

  const isValid = reason && (reason !== 'Other' || customReason) && 
    (action !== 'suspend' || suspensionEndDate);

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCalendarMonth(direction === 'next' ? addMonths(calendarMonth, 1) : subMonths(calendarMonth, 1));
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(parseInt(year));
    setCalendarMonth(newDate);
  };

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(parseInt(month));
    setCalendarMonth(newDate);
  };

  const currentYear = calendarMonth.getFullYear();
  const currentMonth = calendarMonth.getMonth();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
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
              <Label>Suspension End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !suspensionEndDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {suspensionEndDate ? format(suspensionEndDate, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-auto p-0 z-[200]" 
                  align="center" 
                  side="top"
                  sideOffset={10}
                  avoidCollisions={true}
                  collisionPadding={20}
                  style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="p-3 border-b bg-background">
                    <div className="flex items-center justify-between mb-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMonthChange('prev')}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <div className="flex space-x-2">
                        <Select value={currentMonth.toString()} onValueChange={handleMonthSelect}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[210]">
                            {months.map((month, index) => (
                              <SelectItem key={index} value={index.toString()}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select value={currentYear.toString()} onValueChange={handleYearChange}>
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[210]">
                            {years.map((year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMonthChange('next')}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Calendar
                    mode="single"
                    selected={suspensionEndDate}
                    onSelect={setSuspensionEndDate}
                    disabled={(date) => date < new Date()}
                    month={calendarMonth}
                    onMonthChange={setCalendarMonth}
                    initialFocus
                    className="p-3 pointer-events-auto bg-background"
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
