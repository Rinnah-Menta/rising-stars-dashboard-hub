
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import AnimatedInView from '@/components/AnimatedInView';

interface StudentsStatsProps {
  stats: {
    total: number;
    activeClasses: number;
    activeStudents: number;
    inactiveStudents: number;
  };
}

export const StudentsStats: React.FC<StudentsStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Students',
      value: stats.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Classes',
      value: stats.activeClasses,
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Active Students',
      value: stats.activeStudents,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Inactive Students',
      value: stats.inactiveStudents,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <AnimatedInView key={stat.title}>
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>
      ))}
    </div>
  );
};
