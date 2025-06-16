
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Download } from 'lucide-react';

interface StaffPageHeaderProps {
  onAddStaff: () => void;
  onExport: () => void;
}

export const StaffPageHeader: React.FC<StaffPageHeaderProps> = ({ 
  onAddStaff, 
  onExport 
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold">Staff Management</h1>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAddStaff}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Staff Member
        </Button>
        <Button variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
