import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getClassificationReport } from '@/utils/studentDataMigration';
import { CheckCircle, AlertCircle, Users, Target } from 'lucide-react';

export const StudentClassificationReport: React.FC = () => {
  const classificationReport = getClassificationReport();

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-100 text-green-800';
    if (confidence >= 0.7) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getMatchTypeIcon = (matchType: string) => {
    switch (matchType) {
      case 'exact':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial':
        return <Target className="h-4 w-4 text-blue-600" />;
      case 'fuzzy':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classified</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {classificationReport.juniorOne.length + classificationReport.juniorTwo.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Successfully matched students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Junior One</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {classificationReport.juniorOne.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Students assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Junior Two</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {classificationReport.juniorTwo.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Students assigned
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unmatched</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {classificationReport.unmatched.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require manual review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Matches */}
      <Card>
        <CardHeader>
          <CardTitle>Classification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Successful Matches */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Successful Matches</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {classificationReport.matches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getMatchTypeIcon(match.matchType)}
                      <div>
                        <div className="font-medium">{match.unknownName}</div>
                        <div className="text-sm text-gray-600">
                          Matched to: <span className="font-medium">{match.matchedName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={match.class === 'Junior One' ? 'default' : 'secondary'}>
                        {match.class}
                      </Badge>
                      <Badge className={getConfidenceColor(match.confidence)}>
                        {(match.confidence * 100).toFixed(1)}%
                      </Badge>
                      <Badge variant="outline">
                        {match.matchType}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unmatched Students */}
            {classificationReport.unmatched.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">
                  Unmatched Students ({classificationReport.unmatched.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {classificationReport.unmatched.map((name, index) => (
                    <div key={index} className="p-2 border border-red-200 rounded bg-red-50">
                      <div className="font-medium text-red-800">{name}</div>
                      <div className="text-xs text-red-600">Requires manual classification</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Algorithm Information */}
      <Card>
        <CardHeader>
          <CardTitle>Classification Algorithm Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">Exact Match</span>
              </div>
              <p className="text-sm text-gray-600">
                Identical name strings (100% confidence)
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Partial Match</span>
              </div>
              <p className="text-sm text-gray-600">
                All name parts found in existing student names (70-90% confidence)
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Fuzzy Match</span>
              </div>
              <p className="text-sm text-gray-600">
                Similar names using Levenshtein distance (60-80% confidence)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};