
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, School, TrendingUp, DollarSign } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AnimatedInView from '../AnimatedInView';
import { localStudentDatabase } from '@/data/studentdata';

export const AdminStatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <AnimatedInView animation="slideLeft" delay={0}>
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <Users className="h-4 w-4" />
              <span>Total Students</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-blue-100 text-sm">+12 this month</p>
          </CardContent>
        </Card>
      </AnimatedInView>

      <AnimatedInView animation="slideUp" delay={0.1}>
        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <School className="h-4 w-4" />
              <span>Staff Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-orange-100 text-sm">Teaching & Non-teaching</p>
          </CardContent>
        </Card>
      </AnimatedInView>

      <AnimatedInView animation="slideDown" delay={0.2}>
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              <span>Avg Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPerformance}%</div>
            <p className="text-green-100 text-sm">School average</p>
          </CardContent>
        </Card>
      </AnimatedInView>

      <AnimatedInView animation="slideRight" delay={0.3}>
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-xl transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-sm font-medium">
              <DollarSign className="h-4 w-4" />
              <span>Revenue</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.revenue / 1000).toFixed(0)}K</div>
            <p className="text-purple-100 text-sm">This month</p>
          </CardContent>
        </Card>
      </AnimatedInView>
    </div>
  );
};
