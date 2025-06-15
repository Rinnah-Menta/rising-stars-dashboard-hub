
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
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-orange-100 text-orange-800';
      case 'archived':
        return 'bg-blue-100 text-blue-800';
      case 'expelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on-leave':
        return 'On Leave';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Badge variant="secondary" className={getStatusColor(status)}>
      {getStatusLabel(status)}
    </Badge>
  );
};
