
import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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
  },
  expel: {
    student: [
      'Serious misconduct',
      'Repeated disciplinary violations',
      'Violence or threats',
      'Drug or alcohol violations',
      'Criminal activity',
      'Safety concerns',
      'Academic dishonesty',
      'Other'
    ],
    teacher: [
      'Gross misconduct',
      'Criminal conviction',
      'Breach of professional ethics',
      'Inappropriate conduct with students',
      'Violation of school policies',
      'Other'
    ],
    staff: [
      'Gross misconduct',
      'Criminal conviction',
      'Theft or fraud',
      'Harassment or discrimination',
      'Violation of school policies',
      'Other'
    ]
  }
};

interface ReasonSelectorProps {
  action: 'archive' | 'delete' | 'suspend' | 'expel';
  personType: 'student' | 'teacher' | 'staff';
  reason: string;
  setReason: (reason: string) => void;
  customReason: string;
  setCustomReason: (reason: string) => void;
}

export const ReasonSelector: React.FC<ReasonSelectorProps> = ({
  action,
  personType,
  reason,
  setReason,
  customReason,
  setCustomReason
}) => {
  return (
    <>
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
    </>
  );
};
