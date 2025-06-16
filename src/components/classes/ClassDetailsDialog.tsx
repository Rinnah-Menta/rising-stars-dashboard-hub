
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Clock, BookOpen, User, Calendar } from 'lucide-react';

interface ClassData {
  id: string;
  name: string;
  teacher: string;
  students: number;
  room: string;
  schedule: string;
  subjects: string[];
  level: string;
  capacity: number;
  academicYear: string;
}

interface ClassDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData: ClassData | null;
  onEdit?: (classData: ClassData) => void;
  onManageStudents?: (classData: ClassData) => void;
}

export const ClassDetailsDialog: React.FC<ClassDetailsDialogProps> = ({
  open,
  onOpenChange,
  classData,
  onEdit,
  onManageStudents
}) => {
  if (!classData) return null;

  const utilizationPercentage = Math.round((classData.students / classData.capacity) * 100);
  
  const getUtilizationColor = () => {
    if (utilizationPercentage >= 95) return 'bg-red-100 text-red-800';
    if (utilizationPercentage >= 85) return 'bg-orange-100 text-orange-800';
    if (utilizationPercentage >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {classData.name} Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Class Teacher</p>
                  <p className="text-sm text-gray-600">{classData.teacher}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Students</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">
                      {classData.students}/{classData.capacity}
                    </p>
                    <Badge className={getUtilizationColor()}>
                      {utilizationPercentage}% capacity
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Room</p>
                  <p className="text-sm text-gray-600">{classData.room}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Schedule</p>
                  <p className="text-sm text-gray-600">{classData.schedule}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Academic Year</p>
                  <p className="text-sm text-gray-600">{classData.academicYear}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Grade Level</p>
                <Badge variant="outline">{classData.level}</Badge>
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <p className="text-sm font-medium mb-2">Subjects ({classData.subjects.length})</p>
            <div className="flex flex-wrap gap-2">
              {classData.subjects.map((subject, index) => (
                <Badge key={index} variant="secondary">
                  {subject}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            {onManageStudents && (
              <Button variant="outline" onClick={() => onManageStudents(classData)}>
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </Button>
            )}
            {onEdit && (
              <Button onClick={() => onEdit(classData)}>
                Edit Class
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
