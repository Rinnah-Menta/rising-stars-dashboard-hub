
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface TeacherStatusBadgeProps {
  status: string;
}

export const TeacherStatusBadge: React.FC<TeacherStatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      {status.replace('-', ' ')}
    </Badge>
  );
};
