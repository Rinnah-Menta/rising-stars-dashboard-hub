
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {staffMember ? 'Edit Staff Member' : 'Add New Staff Member'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Staff Type *</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: 'teaching' | 'non-teaching') => 
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="teaching">Teaching Staff</SelectItem>
                  <SelectItem value="non-teaching">Non-Teaching Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {formData.type === 'teaching' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Primary Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Enter primary subject"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="classes">Classes Taught</Label>
                <Input
                  id="classes"
                  value={formData.classes}
                  onChange={(e) => setFormData({ ...formData, classes: e.target.value })}
                  placeholder="e.g., P.5A, P.6B"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="role">Role/Position *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Enter role or position"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Enter department"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 5 years"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="qualification">Qualification</Label>
            <Input
              id="qualification"
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              placeholder="Enter highest qualification"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter address"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {staffMember ? 'Update Staff Member' : 'Add Staff Member'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
