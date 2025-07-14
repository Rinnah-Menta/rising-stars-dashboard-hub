import React, { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingSpinner } from './loading-spinner';

interface LoadingProgressProps {
  message?: string;
  duration?: number;
}

export const LoadingProgress: React.FC<LoadingProgressProps> = ({ 
  message = "Loading data...", 
  duration = 2000 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + (100 / (duration / 50)); // Update every 50ms
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <Card className="border-dashed">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">{message}</p>
            <div className="w-64">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};