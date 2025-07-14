
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

export const TeacherManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers] = useState<Teacher[]>([
    {
      id: 'TCH001',
      name: 'Dr. Sarah Mitchell',
      email: 'sarah.mitchell@school.edu',
      phone: '+1 (555) 123-4567',
      subject: 'Mathematics',
      department: 'Science',
      status: 'Active',
      joinDate: '2022-01-15'
    },
    {
      id: 'TCH002',
      name: 'Prof. John Anderson',
      email: 'john.anderson@school.edu',
      phone: '+1 (555) 234-5678',
      subject: 'Physics',
      department: 'Science',
      status: 'Active',
      joinDate: '2021-08-20'
    },
    {
      id: 'TCH003',
      name: 'Ms. Emily Brown',
      email: 'emily.brown@school.edu',
      phone: '+1 (555) 345-6789',
      subject: 'English Literature',
      department: 'Arts',
      status: 'Active',
      joinDate: '2023-02-10'
    },
    {
      id: 'TCH004',
      name: 'Mr. Michael Davis',
      email: 'michael.davis@school.edu',
      phone: '+1 (555) 456-7890',
      subject: 'History',
      department: 'Social Studies',
      status: 'Inactive',
      joinDate: '2020-09-05'
    }
  ]);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-gray-600 mt-2">Manage faculty and staff information</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Teachers</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeachers.map((teacher) => (
              <Card key={teacher.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{teacher.name}</h3>
                      <p className="text-sm text-gray-600">{teacher.id}</p>
                    </div>
                    <Badge variant={teacher.status === 'Active' ? 'default' : 'secondary'}>
                      {teacher.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Subject</p>
                      <p className="text-sm text-gray-600">{teacher.subject}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Department</p>
                      <p className="text-sm text-gray-600">{teacher.department}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <span className="truncate">{teacher.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
