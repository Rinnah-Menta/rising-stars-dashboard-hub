
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface StaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staffMember: any) => void;
  staffMember?: any;
}

export const StaffDialog: React.FC<StaffDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  staffMember
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: 'teaching' as 'teaching' | 'non-teaching',
    subject: '',
    role: '',
    classes: '',
    phone: '',
    status: 'active' as 'active' | 'on-leave' | 'inactive',
    experience: '',
    email: '',
    address: '',
    qualification: '',
    department: ''
  });

  useEffect(() => {
    if (staffMember) {
      setFormData({
        name: staffMember.name || '',
        type: staffMember.type || 'teaching',
        subject: staffMember.subject || '',
        role: staffMember.role || '',
        classes: staffMember.classes || '',
        phone: staffMember.phone || '',
        status: staffMember.status || 'active',
        experience: staffMember.experience || '',
        email: staffMember.email || '',
        address: staffMember.address || '',
        qualification: staffMember.qualification || '',
        department: staffMember.department || ''
      });
    } else {
      setFormData({
        name: '',
        type: 'teaching',
        subject: '',
        role: '',
        classes: '',
        phone: '',
        status: 'active',
        experience: '',
        email: '',
        address: '',
        qualification: '',
        department: ''
      });
    }
  }, [staffMember, isOpen]);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.phone.trim() || !formData.experience.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.type === 'teaching' && !formData.subject.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Subject is required for teaching staff.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.type === 'non-teaching' && !formData.role.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Role is required for non-teaching staff.',
        variant: 'destructive',
      });
      return;
    }

    onSave(formData);
    toast({
      title: staffMember ? 'Staff Member Updated' : 'Staff Member Added',
      description: `${formData.name} has been ${staffMember ? 'updated' : 'added'} successfully.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>
            {staffMember ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-6">
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="type" className="text-sm font-medium">Staff Type *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: 'teaching' | 'non-teaching') => 
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teaching">Teaching Staff</SelectItem>
                    <SelectItem value="non-teaching">Non-Teaching Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="h-9"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter email address"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="experience" className="text-sm font-medium">Experience *</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="e.g., 5 years"
                  className="h-9"
                />
              </div>
            </div>

            {formData.type === 'teaching' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label htmlFor="subject" className="text-sm font-medium">Primary Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Enter primary subject"
                    className="h-9"
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="classes" className="text-sm font-medium">Classes Taught</Label>
                  <Input
                    id="classes"
                    value={formData.classes}
                    onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
                    placeholder="e.g., P.5A, P.6B"
                    className="h-9"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <Label htmlFor="role" className="text-sm font-medium">Role/Position *</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Enter role or position"
                  className="h-9"
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Enter department"
                  className="h-9"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="qualification" className="text-sm font-medium">Qualification</Label>
                <Input
                  id="qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="Enter highest qualification"
                  className="h-9"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="address" className="text-sm font-medium">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
                rows={2}
                className="resize-none"
              />
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {staffMember ? 'Update Staff Member' : 'Add Staff Member'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
