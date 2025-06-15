
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedInView from '../AnimatedInView';

export const SchoolOverview = () => {
  return (
    <AnimatedInView className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>School Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Classes</h4>
              <div className="text-2xl font-bold text-blue-600">18</div>
              <p className="text-sm text-blue-600">Active classes</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900">Subjects</h4>
              <div className="text-2xl font-bold text-orange-600">12</div>
              <p className="text-sm text-orange-600">Core subjects</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">Attendance</h4>
              <div className="text-2xl font-bold text-green-600">94%</div>
              <p className="text-sm text-green-600">Average rate</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-900">Events</h4>
              <div className="text-2xl font-bold text-purple-600">8</div>
              <p className="text-sm text-purple-600">This month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
