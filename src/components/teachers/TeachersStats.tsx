
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TeachersStatsProps {
  teachers: any[];
}

export const TeachersStats: React.FC<TeachersStatsProps> = ({ teachers }) => {
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(t => t.status === 'Active').length;
  const onLeaveTeachers = teachers.filter(t => t.status === 'On Leave').length;
  
  const avgExperience = teachers.reduce((sum, teacher) => {
    const exp = parseInt(teacher.experience) || 0;
    return sum + exp;
  }, 0) / totalTeachers;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalTeachers}</div>
          <p className="text-xs text-gray-600">Total Teachers</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">{activeTeachers}</div>
          <p className="text-xs text-gray-600">Active</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-yellow-600">{onLeaveTeachers}</div>
          <p className="text-xs text-gray-600">On Leave</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-blue-600">{avgExperience.toFixed(1)}</div>
          <p className="text-xs text-gray-600">Avg Experience (years)</p>
        </CardContent>
      </Card>
    </div>
  );
};
