
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, MapPin, Plus } from 'lucide-react';

export const Classes = () => {
  const classes = [
    { 
      id: 'P4A', 
      name: 'Primary 4A', 
      teacher: 'Grace Namuli', 
      students: 32, 
      room: 'Room 4A', 
      schedule: 'Mon-Fri 8:00 AM - 3:30 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies']
    },
    { 
      id: 'P4B', 
      name: 'Primary 4B', 
      teacher: 'Mary Achieng', 
      students: 28, 
      room: 'Room 4B', 
      schedule: 'Mon-Fri 8:00 AM - 3:30 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies']
    },
    { 
      id: 'P5A', 
      name: 'Primary 5A', 
      teacher: 'Sarah Nakiwala', 
      students: 35, 
      room: 'Room 5A', 
      schedule: 'Mon-Fri 8:00 AM - 4:00 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Art']
    },
    { 
      id: 'P5B', 
      name: 'Primary 5B', 
      teacher: 'John Mugisha', 
      students: 30, 
      room: 'Room 5B', 
      schedule: 'Mon-Fri 8:00 AM - 4:00 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Art']
    },
    { 
      id: 'P6A', 
      name: 'Primary 6A', 
      teacher: 'David Ssekandi', 
      students: 33, 
      room: 'Room 6A', 
      schedule: 'Mon-Fri 7:30 AM - 4:30 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Computer']
    },
    { 
      id: 'P7A', 
      name: 'Primary 7A', 
      teacher: 'Robert Okello', 
      students: 29, 
      room: 'Room 7A', 
      schedule: 'Mon-Fri 7:30 AM - 5:00 PM',
      subjects: ['Mathematics', 'English', 'Science', 'Social Studies', 'Art', 'Computer', 'PLE Prep']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Class Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-gray-600">Total Classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">187</div>
            <p className="text-xs text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">31</div>
            <p className="text-xs text-gray-600">Avg Students per Class</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">24</div>
            <p className="text-xs text-gray-600">Teaching Staff</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{classItem.name}</CardTitle>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">
                    <strong>{classItem.students}</strong> students
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.room}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.schedule}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Class Teacher</h4>
                <p className="text-sm text-gray-600">{classItem.teacher}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Subjects</h4>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.map((subject) => (
                    <span key={subject} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
