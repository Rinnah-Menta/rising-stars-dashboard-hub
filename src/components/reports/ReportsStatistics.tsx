
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReportsStatisticsProps {
  totalReports: number;
  readyReports: number;
  processingReports: number;
}

export const ReportsStatistics: React.FC<ReportsStatisticsProps> = ({
  totalReports,
  readyReports,
  processingReports
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{totalReports}</div>
          <p className="text-xs text-muted-foreground">Total Reports</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-green-600">{readyReports}</div>
          <p className="text-xs text-muted-foreground">Ready Reports</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold text-yellow-600">{processingReports}</div>
          <p className="text-xs text-muted-foreground">Processing</p>
        </CardContent>
      </Card>
    </div>
  );
};
