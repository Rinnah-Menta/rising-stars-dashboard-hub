
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

export const RecentActivities = () => {
  return (
    <AnimatedInView>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Recent Activities</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-semibold text-sm">New Student Enrollment</h4>
            <p className="text-gray-600 text-xs">5 new students enrolled in Grade 3</p>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h4 className="font-semibold text-sm">Staff Meeting Completed</h4>
            <p className="text-gray-600 text-xs">Monthly department meeting concluded</p>
            <span className="text-xs text-gray-500">1 day ago</span>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-semibold text-sm">Budget Approval</h4>
            <p className="text-gray-600 text-xs">Q2 budget approved by board</p>
            <span className="text-xs text-gray-500">3 days ago</span>
          </div>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
