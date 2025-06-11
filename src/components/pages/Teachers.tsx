
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Download, Filter, GraduationCap } from 'lucide-react';

export const Teachers = () => {
  const teachers = [
    { id: 'TCH001', name: 'Sarah Nakiwala', subject: 'Mathematics', classes: 'P.5A, P.6B, P.7A', phone: '+256 700 123 456', status: 'Active', experience: '8 years' },
    { id: 'TCH002', name: 'John Mugisha', subject: 'English', classes: 'P.4A, P.5B, P.6A', phone: '+256 701 234 567', status: 'Active', experience: '12 years' },
    { id: 'TCH003', name: 'Grace Namuli', subject: 'Science', classes: 'P.6A, P.7B', phone: '+256 702 345 678', status: 'Active', experience: '6 years' },
    { id: 'TCH004', name: 'David Ssekandi', subject: 'Social Studies', classes: 'P.5A, P.6B', phone: '+256 703 456 789', status: 'On Leave', experience: '15 years' },
    { id: 'TCH005', name: 'Mary Achieng', subject: 'Art & Craft', classes: 'P.4A, P.5A, P.6A', phone: '+256 704 567 890', status: 'Active', experience: '4 years' },
    { id: 'TCH006', name: 'Robert Okello', subject: 'Physical Education', classes: 'All Classes', phone: '+256 705 678 901', status: 'Active', experience: '10 years' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-50';
      case 'On Leave': return 'text-yellow-600 bg-yellow-50';
      case 'Inactive': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-600">Total Teachers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">22</div>
            <p className="text-xs text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">2</div>
            <p className="text-xs text-gray-600">On Leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">8.5</div>
            <p className="text-xs text-gray-600">Avg Experience (years)</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Teaching Staff</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search teachers..." className="pl-10 w-64" />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Teacher ID</th>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Subject</th>
                  <th className="text-left p-4 font-medium">Classes</th>
                  <th className="text-left p-4 font-medium">Experience</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{teacher.id}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-gray-400" />
                        <span>{teacher.name}</span>
                      </div>
                    </td>
                    <td className="p-4">{teacher.subject}</td>
                    <td className="p-4 text-sm">{teacher.classes}</td>
                    <td className="p-4">{teacher.experience}</td>
                    <td className="p-4 text-sm">{teacher.phone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(teacher.status)}`}>
                        {teacher.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
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
