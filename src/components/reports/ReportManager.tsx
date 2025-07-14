
import React, { useState } from 'react';
import { ReportCardGenerator } from './ReportCardGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, FileText, TrendingUp } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';

export const ReportManager: React.FC = () => {
  const { allStudents, availableClasses } = useStudents();

  const getStudentStats = () => {
    const totalStudents = allStudents.length;
    const totalClasses = availableClasses.length;
    const averagePerClass = totalStudents > 0 ? Math.round(totalStudents / totalClasses) : 0;
    
    return { totalStudents, totalClasses, averagePerClass };
  };

  const { totalStudents, totalClasses, averagePerClass } = getStudentStats();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate comprehensive reports and view student analytics</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{totalStudents}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{totalClasses}</p>
              <p className="text-sm text-muted-foreground">Active Classes</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-primary mr-3" />
            <div>
              <p className="text-2xl font-bold">{averagePerClass}</p>
              <p className="text-sm text-muted-foreground">Avg. per Class</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="report-cards" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report-cards" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Report Cards
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Class Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="report-cards" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Professional Report Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportCardGenerator />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Class Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableClasses.map(className => {
                  const studentsInClass = allStudents.filter(s => s.class === className).length;
                  return (
                    <div key={className} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">
                        {className.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <Badge variant="secondary">{studentsInClass}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
