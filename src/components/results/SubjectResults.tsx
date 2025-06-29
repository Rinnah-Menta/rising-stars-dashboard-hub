
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SubjectResult {
  subject: string;
  currentMark: number;
  previousMark: number;
  grade: string;
  teacher: string;
  comments: string;
}

interface SubjectResultsProps {
  results: SubjectResult[];
}

export const SubjectResults: React.FC<SubjectResultsProps> = ({ results }) => {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'bg-green-500 hover:bg-green-600';
      case 'A-':
        return 'bg-green-400 hover:bg-green-500';
      case 'B+':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'B':
        return 'bg-blue-400 hover:bg-blue-500';
      case 'C+':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'C':
        return 'bg-yellow-400 hover:bg-yellow-500';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
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

  const getImprovementText = (current: number, previous: number) => {
    const diff = current - previous;
    if (diff > 0) {
      return `+${diff}%`;
    } else if (diff < 0) {
      return `${diff}%`;
    }
    return 'No change';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject Performance</h2>
      <div className="grid gap-4">
        {results.map((result, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">{result.subject}</h3>
                  <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                  {getTrendIcon(result.currentMark, result.previousMark)}
                  <span className={`text-sm font-medium ${
                    result.currentMark > result.previousMark ? 'text-green-600' : 
                    result.currentMark < result.previousMark ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {getImprovementText(result.currentMark, result.previousMark)}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm items-center">
                    <span className="font-medium text-gray-700">Current Performance</span>
                    <span className="font-bold text-lg text-gray-900">{result.currentMark}%</span>
                  </div>
                  <Progress value={result.currentMark} className="h-3" />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Previous: {result.previousMark}%</span>
                    <span className="font-medium">Teacher: {result.teacher}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <p className="text-sm font-medium text-gray-800 mb-2">Teacher's Comments:</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{result.comments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
