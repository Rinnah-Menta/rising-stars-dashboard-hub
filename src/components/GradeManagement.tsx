
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Grade {
  id: string;
  studentName: string;
  studentId: string;
  subject: string;
  assignment: string;
  score: number;
  maxScore: number;
  grade: string;
  date: string;
}

export const GradeManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [grades] = useState<Grade[]>([
    {
      id: 'GRD001',
      studentName: 'Alice Johnson',
      studentId: 'STU001',
      subject: 'Mathematics',
      assignment: 'Midterm Exam',
      score: 85,
      maxScore: 100,
      grade: 'B+',
      date: '2024-01-15'
    },
    {
      id: 'GRD002',
      studentName: 'Bob Smith',
      studentId: 'STU002',
      subject: 'Physics',
      assignment: 'Lab Report #3',
      score: 92,
      maxScore: 100,
      grade: 'A-',
      date: '2024-01-14'
    },
    {
      id: 'GRD003',
      studentName: 'Carol Davis',
      studentId: 'STU003',
      subject: 'English',
      assignment: 'Essay Assignment',
      score: 78,
      maxScore: 100,
      grade: 'B-',
      date: '2024-01-13'
    },
    {
      id: 'GRD004',
      studentName: 'David Wilson',
      studentId: 'STU004',
      subject: 'History',
      assignment: 'Final Project',
      score: 95,
      maxScore: 100,
      grade: 'A',
      date: '2024-01-12'
    }
  ]);

  const filteredGrades = grades.filter(grade =>
    grade.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    if (grade.startsWith('D')) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getTrendIcon = (score: number) => {
    if (score >= 90) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (score >= 70) return <Minus className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Grade Management</h1>
          <p className="text-gray-600 mt-2">Track and manage student academic performance</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <TrendingUp className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Grade</p>
                <p className="text-2xl font-bold text-gray-900">87.5%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Assignments</p>
                <p className="text-2xl font-bold text-gray-900">248</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">A</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passing Rate</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Grades</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search grades..."
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
                  <th className="text-left p-4 font-semibold text-gray-700">Student</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Subject</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Assignment</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Score</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Grade</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Trend</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredGrades.map((grade) => (
                  <tr key={grade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{grade.studentName}</p>
                        <p className="text-sm text-gray-600">{grade.studentId}</p>
                      </div>
                    </td>
                    <td className="p-4">{grade.subject}</td>
                    <td className="p-4">{grade.assignment}</td>
                    <td className="p-4">
                      <span className="font-medium">{grade.score}/{grade.maxScore}</span>
                    </td>
                    <td className="p-4">
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </td>
                    <td className="p-4">{getTrendIcon(grade.score)}</td>
                    <td className="p-4 text-gray-600">{grade.date}</td>
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
