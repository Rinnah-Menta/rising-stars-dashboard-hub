
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Student } from '@/hooks/useStudents';
import { Phone, Mail, MapPin, User, GraduationCap, Calendar } from 'lucide-react';

interface StudentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student: Student | null;
  onEdit: (student: Student) => void;
}

export const StudentDetailsDialog: React.FC<StudentDetailsDialogProps> = ({
  open,
  onOpenChange,
  student,
  onEdit
}) => {
  if (!student) return null;

  const getFeesStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Student Details</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center border-b pb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">{student.name}</h3>
            <p className="text-gray-600">Student ID: {student.id}</p>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Class</p>
                <p className="font-medium">{student.class}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-medium">{student.age} years old</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Parent/Guardian</p>
                <p className="font-medium">{student.parent}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Contact</p>
                <p className="font-medium">{student.phone}</p>
              </div>
            </div>

            {student.email && (
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{student.email}</p>
                </div>
              </div>
            )}

            {student.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-medium">{student.address}</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 flex items-center justify-center">
                <div className="h-3 w-3 bg-gray-400 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fees Status</p>
                <Badge className={getFeesStatusColor(student.fees)}>
                  {student.fees}
                </Badge>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={() => {
              onEdit(student);
              onOpenChange(false);
            }}>
              Edit Student
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
