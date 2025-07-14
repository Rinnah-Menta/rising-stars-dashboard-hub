
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Users, BookOpen } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';

interface Class {
  id: string;
  name: string;
  subject: string;
  teacher: string;
  students: number;
  schedule: string;
  room: string;
  status: 'Active' | 'Cancelled' | 'Completed';
}

export const ClassManagement = () => {
  const { allStudents } = useStudents();
  const [classes, setClasses] = useState<Class[]>([]);

  // Generate classes based on real student data
  useEffect(() => {
    const classData = new Map<string, { students: number; className: string }>();
    
    allStudents.forEach(student => {
      const className = student.class;
      if (classData.has(className)) {
        classData.get(className)!.students++;
      } else {
        classData.set(className, { students: 1, className });
      }
    });

    const generatedClasses: Class[] = Array.from(classData.entries()).map(([className, data], index) => ({
      id: `CLS${String(index + 1).padStart(3, '0')}`,
      name: className.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
      subject: 'General Studies',
      teacher: ['Ms. Sarah Johnson', 'Mr. David Wilson', 'Mrs. Grace Nakato', 'Mr. Joseph Ssekindi'][index % 4],
      students: data.students,
      schedule: ['Mon, Wed, Fri 9:00 AM', 'Tue, Thu 2:00 PM', 'Mon, Wed, Fri 11:00 AM', 'Tue, Thu 10:00 AM'][index % 4],
      room: `Room ${100 + index + 1}`,
      status: 'Active' as const
    }));

    setClasses(generatedClasses);
  }, [allStudents]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Class Management</h1>
          <p className="text-gray-600 mt-2">Organize and manage class schedules</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{classItem.name}</h3>
                  <p className="text-sm text-gray-600">{classItem.id}</p>
                </div>
                <Badge className={getStatusColor(classItem.status)}>
                  {classItem.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{classItem.subject}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{classItem.students} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{classItem.schedule}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Teacher: {classItem.teacher}</span>
                  <span className="font-medium text-purple-600">{classItem.room}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 mt-4">
                <Button size="sm" variant="outline" className="flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
