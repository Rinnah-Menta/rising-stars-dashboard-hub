
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AnimatedInView from '@/components/AnimatedInView';

interface StudentsStatsProps {
  stats: {
    total: number;
    activeClasses: number;
    activeStudents: number;
    inactiveStudents: number;
  };
  loading?: boolean;
}

export const StudentsStats: React.FC<StudentsStatsProps> = ({ stats, loading = false }) => {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <AnimatedInView key={i}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Skeleton className="h-5 w-5" />
                  </div>
                  <div>
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedInView>
        ))}
      </div>
    );
  }

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
