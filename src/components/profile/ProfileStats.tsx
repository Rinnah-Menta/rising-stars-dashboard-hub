
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export const ProfileStats: React.FC = () => {
  const stats = [
    { value: '5', label: 'Classes Teaching', color: 'blue' },
    { value: '132', label: 'Total Students', color: 'green' },
    { value: '24', label: 'Assignments Given', color: 'orange' },
    { value: '96%', label: 'Attendance Rate', color: 'purple' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
        <CardDescription>A quick overview of your key metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`text-center p-4 bg-${stat.color}-50 rounded-lg`}>
              <div className={`text-2xl font-bold text-${stat.color}-600`}>
                {stat.value}
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
