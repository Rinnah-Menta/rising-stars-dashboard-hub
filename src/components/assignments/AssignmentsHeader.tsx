
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface AssignmentsHeaderProps {
  stats: {
    total: number;
    pending: number;
    inProgress: number;
    submitted: number;
    overdue: number;
  };
}

export const AssignmentsHeader: React.FC<AssignmentsHeaderProps> = ({ stats }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl sm:text-3xl font-bold">My Assignments</h1>
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{stats.total} Total</Badge>
        <Badge className="bg-red-500">{stats.overdue} Overdue</Badge>
        <Badge className="bg-green-500">{stats.submitted} Submitted</Badge>
        <Badge className="bg-yellow-500">{stats.inProgress} In Progress</Badge>
        <Badge variant="outline">{stats.pending} Pending</Badge>
      </div>
    </div>
  );
};
