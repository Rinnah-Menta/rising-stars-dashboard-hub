
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  status: 'Active' | 'Inactive';
  admissionDate: string;
}

export const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students] = useState<Student[]>([
    {
      id: 'STU001',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      grade: '10th',
      class: '10A',
      status: 'Active',
      admissionDate: '2023-08-15'
    },
    {
      id: 'STU002',
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      grade: '9th',
      class: '9B',
      status: 'Active',
      admissionDate: '2023-08-16'
    },
    {
      id: 'STU003',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      grade: '11th',
      class: '11A',
      status: 'Active',
      admissionDate: '2023-08-14'
    },
    {
      id: 'STU004',
      name: 'David Wilson',
      email: 'david.wilson@email.com',
      grade: '10th',
      class: '10B',
      status: 'Inactive',
      admissionDate: '2023-08-17'
    }
  ]);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-2">Manage student records and information</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Students</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Student ID</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Grade</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Class</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{student.id}</td>
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-gray-600">{student.email}</td>
                    <td className="p-4">{student.grade}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">
                      <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
