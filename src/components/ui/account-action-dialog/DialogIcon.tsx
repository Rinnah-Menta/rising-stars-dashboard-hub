
import React from 'react';
import { Archive, Trash2, Clock, UserX, AlertTriangle } from 'lucide-react';

interface DialogIconProps {
  action: 'archive' | 'delete' | 'suspend' | 'expel';
}

export const DialogIcon: React.FC<DialogIconProps> = ({ action }) => {
  switch (action) {
    case 'archive':
      return <Archive className="h-6 w-6 text-orange-600" />;
    case 'delete':
      return <Trash2 className="h-6 w-6 text-red-600" />;
    case 'suspend':
      return <Clock className="h-6 w-6 text-yellow-600" />;
    case 'expel':
      return <UserX className="h-6 w-6 text-red-700" />;
    default:
      return <AlertTriangle className="h-6 w-6 text-gray-600" />;
  }
};
