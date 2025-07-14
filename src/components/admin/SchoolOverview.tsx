
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AnimatedInView from '../AnimatedInView';
import { localStudentDatabase } from '@/data/studentdata';

export const SchoolOverview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalClasses: 0,
    subjects: 12,
    attendance: 94,
    events: 8
  });

  useEffect(() => {
    setTimeout(() => {
      const totalClasses = Object.keys(localStudentDatabase.studentsByClass).length;
      setData(prev => ({ ...prev, totalClasses }));
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <AnimatedInView>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>School Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3 bg-muted/50 rounded-lg">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-8 w-12 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </AnimatedInView>
    );
  }
  
  return (
    <AnimatedInView>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>School Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900 text-sm">Classes</h4>
              <div className="text-2xl font-bold text-blue-600">{data.totalClasses}</div>
              <p className="text-xs text-blue-600">Active classes</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900 text-sm">Subjects</h4>
              <div className="text-2xl font-bold text-orange-600">{data.subjects}</div>
              <p className="text-xs text-orange-600">Core subjects</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900 text-sm">Attendance</h4>
              <div className="text-2xl font-bold text-green-600">{data.attendance}%</div>
              <p className="text-xs text-green-600">Average rate</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900 text-sm">Events</h4>
              <div className="text-2xl font-bold text-purple-600">{data.events}</div>
              <p className="text-xs text-purple-600">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
