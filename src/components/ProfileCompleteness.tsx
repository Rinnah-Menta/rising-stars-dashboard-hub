
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
    
    // Handle null, undefined, or empty string
    if (value === null || value === undefined || value === '') {
      return false;
    }
    
    // Handle arrays (like classesTaught, subjectsTaught)
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    
    // Handle stringified arrays
    if (typeof value === 'string' && value.startsWith('[')) {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) && parsed.length > 0;
      } catch {
        return false;
      }
    }
    
    // Handle boolean fields (like isClassTeacher, isDepartmentHead)
    if (typeof value === 'boolean') {
      return true; // Boolean fields are considered filled regardless of true/false
    }
    
    // Handle string representations of booleans
    if (value === 'true' || value === 'false') {
      return true;
    }
    
    return true;
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
