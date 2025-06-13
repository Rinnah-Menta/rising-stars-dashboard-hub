import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProfileCompletenessProps {
  profileData: any;
  fields: string[];
}

export const ProfileCompleteness: React.FC<ProfileCompletenessProps> = ({ profileData, fields }) => {
  if (!profileData) return null;

  const filledFields = fields.filter(field => {
    const value = profileData[field];
    return value !== null && value !== undefined && value !== '';
  }).length;
  
  const completeness = Math.round((filledFields / fields.length) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Profile Completeness</h3>
        <span className="text-sm font-bold text-primary">{completeness}%</span>
      </div>
      <Progress value={completeness} />
      <p className="text-xs text-muted-foreground">
        Complete your profile to get the most out of the platform.
      </p>
    </div>
  );
}; 