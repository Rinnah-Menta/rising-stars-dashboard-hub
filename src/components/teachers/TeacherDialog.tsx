
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TeacherFormFields } from './TeacherFormFields';
import { useToast } from '@/hooks/use-toast';

interface TeacherDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacher: any) => void;
  teacher?: any;
}

export const TeacherDialog: React.FC<TeacherDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  teacher
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    classes: '',
    phone: '',
    status: 'Active' as 'Active' | 'On Leave' | 'Inactive',
    experience: '',
    email: '',
    address: '',
    qualification: '',
    department: ''
  });

  useEffect(() => {
    if (teacher) {
      setFormData({
        name: teacher.name || '',
        subject: teacher.subject || '',
        classes: teacher.classes || '',
        phone: teacher.phone || '',
        status: teacher.status || 'Active',
        experience: teacher.experience || '',
        email: teacher.email || '',
        address: teacher.address || '',
        qualification: teacher.qualification || '',
        department: teacher.department || ''
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        classes: '',
        phone: '',
        status: 'Active',
        experience: '',
        email: '',
        address: '',
        qualification: '',
        department: ''
      });
    }
  }, [teacher, isOpen]);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.subject || !formData.phone.trim() || !formData.experience.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    onSave(formData);
    toast({
      title: teacher ? 'Teacher Updated' : 'Teacher Added',
      description: `${formData.name} has been ${teacher ? 'updated' : 'added'} successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>
            {teacher ? 'Edit Teacher' : 'Add New Teacher'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-6">
          <div className="py-4">
            <TeacherFormFields formData={formData} setFormData={setFormData} />
          </div>
        </ScrollArea>
        
        <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {teacher ? 'Update Teacher' : 'Add Teacher'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
