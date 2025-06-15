
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedInView from '../AnimatedInView';
import { AnimatedProgress } from './AnimatedProgress';

export const GradeDistribution = () => {
  return (
    <AnimatedInView>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Grade Distribution</CardTitle>
          <CardDescription>Overall school performance by grade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Grade A</span>
              <div className="flex items-center space-x-2">
                <AnimatedProgress value={35} colorClass="bg-green-600" />
                <span className="text-sm text-gray-600 min-w-[3rem]">35%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Grade B</span>
              <div className="flex items-center space-x-2">
                <AnimatedProgress value={40} colorClass="bg-blue-600" />
                <span className="text-sm text-gray-600 min-w-[3rem]">40%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Grade C</span>
              <div className="flex items-center space-x-2">
                <AnimatedProgress value={20} colorClass="bg-orange-600" />
                <span className="text-sm text-gray-600 min-w-[3rem]">20%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Below C</span>
              <div className="flex items-center space-x-2">
                <AnimatedProgress value={5} colorClass="bg-red-600" />
                <span className="text-sm text-gray-600 min-w-[3rem]">5%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
