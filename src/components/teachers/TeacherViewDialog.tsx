
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Phone, Mail, MapPin, Calendar, BookOpen, Users, Award } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive' | 'Archived';
  experience: string;
  email?: string;
  address?: string;
  qualification?: string;
  department?: string;
}

interface TeacherViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacher: Teacher | null;
  onEdit?: (teacher: Teacher) => void;
}

export const TeacherViewDialog: React.FC<TeacherViewDialogProps> = ({
  open,
  onOpenChange,
  teacher,
  onEdit
}) => {
  if (!teacher) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Teacher Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header Info */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-gray-600">{teacher.id}</p>
            </div>
            <Badge className={getStatusColor(teacher.status)}>
              {teacher.status}
            </Badge>
          </div>

          {/* Main Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Primary Subject</span>
                </div>
                <p className="text-lg">{teacher.subject}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Classes Taught</span>
                </div>
                <p className="text-lg">{teacher.classes}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-purple-600" />
                  <span className="font-medium">Experience</span>
                </div>
                <p className="text-lg">{teacher.experience}</p>
              </CardContent>
            </Card>

            {teacher.qualification && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Qualification</span>
                  </div>
                  <p className="text-lg">{teacher.qualification}</p>
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
                  <span>{teacher.phone}</span>
                </div>
                {teacher.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <span>{teacher.email}</span>
                  </div>
                )}
                {teacher.address && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span>{teacher.address}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {teacher.department && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">Department</h3>
                <p>{teacher.department}</p>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            {onEdit && (
              <Button onClick={() => onEdit(teacher)}>
                Edit Teacher
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
