
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, Download, Filter } from 'lucide-react';

export const Students = () => {
  const students = [
    { id: 'SS001', name: 'Sarah Nakato', class: 'P.7A', age: 13, parent: 'Robert Nakato', phone: '+256 700 123 456', fees: 'Paid' },
    { id: 'SS002', name: 'John Mukasa', class: 'P.6B', age: 12, parent: 'Grace Mukasa', phone: '+256 701 234 567', fees: 'Pending' },
    { id: 'SS003', name: 'Mary Namuli', class: 'P.5A', age: 11, parent: 'Peter Namuli', phone: '+256 702 345 678', fees: 'Paid' },
    { id: 'SS004', name: 'David Ssali', class: 'P.7B', age: 14, parent: 'Jane Ssali', phone: '+256 703 456 789', fees: 'Paid' },
    { id: 'SS005', name: 'Ruth Auma', class: 'P.4A', age: 10, parent: 'James Auma', phone: '+256 704 567 890', fees: 'Overdue' },
    { id: 'SS006', name: 'Samuel Okello', class: 'P.6A', age: 12, parent: 'Helen Okello', phone: '+256 705 678 901', fees: 'Paid' },
  ];

  const getFeesStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Overdue': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Students Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Student
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
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">189</div>
            <p className="text-xs text-gray-600">Fees Paid</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">42</div>
            <p className="text-xs text-gray-600">Fees Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">16</div>
            <p className="text-xs text-gray-600">Fees Overdue</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Student List</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input placeholder="Search students..." className="pl-10 w-64" />
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
                  <th className="text-left p-4 font-medium">Student ID</th>
                  <th className="text-left p-4 font-medium">Name</th>
                  <th className="text-left p-4 font-medium">Class</th>
                  <th className="text-left p-4 font-medium">Age</th>
                  <th className="text-left p-4 font-medium">Parent/Guardian</th>
                  <th className="text-left p-4 font-medium">Contact</th>
                  <th className="text-left p-4 font-medium">Fees Status</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-mono text-sm">{student.id}</td>
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.class}</td>
                    <td className="p-4">{student.age}</td>
                    <td className="p-4">{student.parent}</td>
                    <td className="p-4 text-sm">{student.phone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFeesStatusColor(student.fees)}`}>
                        {student.fees}
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
