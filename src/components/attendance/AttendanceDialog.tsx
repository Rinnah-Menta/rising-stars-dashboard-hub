
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

interface AttendanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: AttendanceRecord) => void;
  record?: AttendanceRecord;
  mode: 'edit' | 'mark';
}

export const AttendanceDialog: React.FC<AttendanceDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  record,
  mode
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AttendanceRecord>({
    id: '',
    studentId: '',
    studentName: '',
    class: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    timeIn: '',
    timeOut: '',
    remarks: ''
  });

  useEffect(() => {
    if (record && mode === 'edit') {
      setFormData(record);
    } else if (mode === 'mark') {
      setFormData({
        id: Date.now().toString(),
        studentId: '',
        studentName: '',
        class: '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
        timeIn: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        timeOut: '',
        remarks: ''
      });
    }
  }, [record, mode, isOpen]);

  const handleSave = () => {
    if (!formData.studentName.trim() || !formData.studentId.trim() || !formData.class.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    onSave(formData);
    toast({
      title: mode === 'edit' ? 'Attendance Updated' : 'Attendance Marked',
      description: `Attendance for ${formData.studentName} has been ${mode === 'edit' ? 'updated' : 'marked'} successfully.`,
    });
    onClose();
  };

  const handleStatusChange = (status: AttendanceRecord['status']) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setFormData({
      ...formData,
      status,
      timeIn: status === 'present' || status === 'late' ? (formData.timeIn || currentTime) : '',
      timeOut: status === 'present' ? formData.timeOut : ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Attendance Record' : 'Mark Attendance'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID *</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                placeholder="Enter student ID"
                disabled={mode === 'edit'}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentName">Student Name *</Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                placeholder="Enter student name"
                disabled={mode === 'edit'}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class">Class *</Label>
              <Select 
                value={formData.class} 
                onValueChange={(value) => setFormData({ ...formData, class: value })}
                disabled={mode === 'edit'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P.7A">P.7A</SelectItem>
                  <SelectItem value="P.7B">P.7B</SelectItem>
                  <SelectItem value="P.6A">P.6A</SelectItem>
                  <SelectItem value="P.6B">P.6B</SelectItem>
                  <SelectItem value="P.5A">P.5A</SelectItem>
                  <SelectItem value="P.5B">P.5B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Attendance Status *</Label>
            <Select 
              value={formData.status} 
              onValueChange={handleStatusChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="excused">Excused</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(formData.status === 'present' || formData.status === 'late') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timeIn">Time In</Label>
                <Input
                  id="timeIn"
                  value={formData.timeIn}
                  onChange={(e) => setFormData({ ...formData, timeIn: e.target.value })}
                  placeholder="e.g., 8:00 AM"
                />
              </div>
              
              {formData.status === 'present' && (
                <div className="space-y-2">
                  <Label htmlFor="timeOut">Time Out</Label>
                  <Input
                    id="timeOut"
                    value={formData.timeOut}
                    onChange={(e) => setFormData({ ...formData, timeOut: e.target.value })}
                    placeholder="e.g., 3:30 PM"
                  />
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Textarea
              id="remarks"
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
              placeholder="Enter any additional remarks"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {mode === 'edit' ? 'Update Record' : 'Mark Attendance'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
