
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Phone, Mail, Calendar, BookOpen, Users, Award, Briefcase } from 'lucide-react';
import { StaffMember } from './StaffTable';

interface StaffViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staffMember: StaffMember | null;
  onEdit?: (staffMember: StaffMember) => void;
}

export const StaffViewDialog: React.FC<StaffViewDialogProps> = ({
  open,
  onOpenChange,
  staffMember,
  onEdit
}) => {
  if (!staffMember) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-leave': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {staffMember.type === 'teaching' ? (
              <GraduationCap className="h-5 w-5" />
            ) : (
              <Briefcase className="h-5 w-5" />
            )}
            Staff Member Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{staffMember.name}</h2>
              <p className="text-gray-600">{staffMember.id}</p>
              <p className="text-sm text-blue-600 font-medium">
                {staffMember.type === 'teaching' ? 'Teaching Staff' : 'Non-Teaching Staff'}
              </p>
            </div>
            <Badge className={getStatusColor(staffMember.status)}>
              {staffMember.status}
            </Badge>
          </div>

          {/* Main Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  {staffMember.type === 'teaching' ? (
                    <BookOpen className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Briefcase className="h-4 w-4 text-purple-600" />
                  )}
                  <span className="font-medium">
                    {staffMember.type === 'teaching' ? 'Primary Subject' : 'Role/Position'}
                  </span>
                </div>
                <p className="text-lg">{staffMember.subject || staffMember.role}</p>
              </CardContent>
            </Card>

            {staffMember.type === 'teaching' && staffMember.classesTaught && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Classes Taught</span>
                  </div>
                  <p className="text-lg">{staffMember.classesTaught.join(', ')}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Experience</span>
                </div>
                <p className="text-lg">{staffMember.experience}</p>
              </CardContent>
            </Card>

            {staffMember.qualification && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Qualification</span>
                  </div>
                  <p className="text-lg">{staffMember.qualification}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>{staffMember.phone}</span>
                </div>
                {staffMember.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span>{staffMember.email}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Department Information */}
          {staffMember.department && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Department</h3>
                <p>{staffMember.department}</p>
                {staffMember.joinDate && (
                  <p className="text-sm text-gray-600 mt-2">
                    Joined: {new Date(staffMember.joinDate).toLocaleDateString()}
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(staffMember)}>
                Edit Staff Member
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
