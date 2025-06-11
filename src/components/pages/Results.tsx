
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const Results = () => {
  const termResults = [
    {
      subject: 'Mathematics',
      currentMark: 85,
      previousMark: 78,
      grade: 'A',
      teacher: 'Ms. Nakato',
      comments: 'Excellent improvement in problem-solving skills.',
    },
    {
      subject: 'English',
      currentMark: 76,
      previousMark: 80,
      grade: 'B+',
      teacher: 'Mr. Okello',
      comments: 'Good vocabulary but needs to work on grammar.',
    },
    {
      subject: 'Science',
      currentMark: 82,
      previousMark: 82,
      grade: 'A-',
      teacher: 'Ms. Apio',
      comments: 'Consistent performance. Shows good understanding.',
    },
    {
      subject: 'Social Studies',
      currentMark: 79,
      previousMark: 75,
      grade: 'B+',
      teacher: 'Mr. Musoke',
      comments: 'Improved knowledge of Ugandan history.',
    },
    {
      subject: 'ICT',
      currentMark: 88,
      previousMark: 85,
      grade: 'A',
      teacher: 'Ms. Namuli',
      comments: 'Excellent computer skills and creativity.',
    },
    {
      subject: 'Physical Education',
      currentMark: 90,
      previousMark: 87,
      grade: 'A',
      teacher: 'Mr. Ssebyala',
      comments: 'Outstanding participation and sportsmanship.',
    },
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500';
      case 'A-':
        return 'bg-green-400';
      case 'B+':
        return 'bg-blue-500';
      case 'B':
        return 'bg-blue-400';
      case 'C+':
        return 'bg-yellow-500';
      case 'C':
        return 'bg-yellow-400';
      default:
        return 'bg-gray-500';
    }
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (current < previous) {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    } else {
      return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const overallAverage = termResults.reduce((sum, result) => sum + result.currentMark, 0) / termResults.length;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Academic Results</h1>
        <Badge variant="outline" className="w-fit">Term 2, 2024</Badge>
      </div>

      {/* Overall Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Overall Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600">{overallAverage.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Overall Average</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600">A-</div>
              <div className="text-sm text-gray-600">Overall Grade</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600">8th</div>
              <div className="text-sm text-gray-600">Class Position</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subject Results */}
      <div className="grid gap-4">
        {termResults.map((result, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-lg font-semibold">{result.subject}</h3>
                    <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                    {getTrendIcon(result.currentMark, result.previousMark)}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Mark</span>
                      <span className="font-semibold">{result.currentMark}%</span>
                    </div>
                    <Progress value={result.currentMark} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Previous: {result.previousMark}%</span>
                      <span>Teacher: {result.teacher}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-gray-700">Teacher's Comments:</p>
                    <p className="text-sm text-gray-600 mt-1">{result.comments}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Term Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-600 py-8">
            <p>Performance chart visualization would be displayed here</p>
            <p className="text-sm mt-2">Showing progress across all subjects over the term</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
