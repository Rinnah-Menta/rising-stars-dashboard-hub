
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';

export const Assignments = () => {
  const assignments = [
    {
      id: 1,
      title: 'Mathematics - Fractions Worksheet',
      subject: 'Mathematics',
      teacher: 'Ms. Nakato',
      dueDate: '2024-06-15',
      status: 'pending',
      description: 'Complete exercises 1-15 on fractions and decimals conversion.',
      priority: 'high',
    },
    {
      id: 2,
      title: 'English - Creative Writing Essay',
      subject: 'English',
      teacher: 'Mr. Okello',
      dueDate: '2024-06-18',
      status: 'submitted',
      description: 'Write a 300-word essay about "My Dream for Uganda".',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Science - Plant Growth Experiment',
      subject: 'Science',
      teacher: 'Ms. Apio',
      dueDate: '2024-06-20',
      status: 'in-progress',
      description: 'Observe and record plant growth over 7 days. Submit observation chart.',
      priority: 'medium',
    },
    {
      id: 4,
      title: 'Social Studies - Uganda Map Drawing',
      subject: 'Social Studies',
      teacher: 'Mr. Musoke',
      dueDate: '2024-06-12',
      status: 'overdue',
      description: 'Draw and label the districts of Uganda with their capitals.',
      priority: 'high',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-green-500">Submitted</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityIcon = (priority: string) => {
    return priority === 'high' ? (
      <AlertCircle className="h-4 w-4 text-red-500" />
    ) : null;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">My Assignments</h1>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">4 Total</Badge>
          <Badge className="bg-red-500">1 Overdue</Badge>
          <Badge className="bg-green-500">1 Submitted</Badge>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(assignment.priority)}
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="h-4 w-4" />
                    <span>{assignment.subject}</span>
                    <span>•</span>
                    <span>{assignment.teacher}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  {getStatusBadge(assignment.status)}
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{assignment.description}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                {assignment.status === 'pending' && (
                  <Button size="sm">Start Assignment</Button>
                )}
                {assignment.status === 'in-progress' && (
                  <Button size="sm">Continue Work</Button>
                )}
                {assignment.status === 'submitted' && (
                  <Button variant="outline" size="sm">View Submission</Button>
                )}
                {assignment.status === 'overdue' && (
                  <Button variant="destructive" size="sm">Submit Now</Button>
                )}
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
