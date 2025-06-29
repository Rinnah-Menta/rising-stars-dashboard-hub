
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface OverallPerformanceProps {
  overallAverage: number;
  overallGrade: string;
  classPosition: number;
  term: string;
}

export const OverallPerformance: React.FC<OverallPerformanceProps> = ({
  overallAverage,
  overallGrade,
  classPosition,
  term
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Results</h1>
        <Badge variant="outline" className="w-fit bg-blue-50 text-blue-700 border-blue-200">
          {term}
        </Badge>
      </div>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Overall Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-1">
                {overallAverage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 font-medium">Overall Average</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">
                {overallGrade}
              </div>
              <div className="text-sm text-gray-600 font-medium">Overall Grade</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-1">
                {classPosition}{classPosition === 1 ? 'st' : classPosition === 2 ? 'nd' : classPosition === 3 ? 'rd' : 'th'}
              </div>
              <div className="text-sm text-gray-600 font-medium">Class Position</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
