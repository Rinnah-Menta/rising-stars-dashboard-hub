
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Download } from 'lucide-react';

interface TeacherPageHeaderProps {
  onAddTeacher: () => void;
}

export const TeacherPageHeader: React.FC<TeacherPageHeaderProps> = ({ onAddTeacher }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-2xl font-bold">Teachers Management</h1>
      <div className="flex flex-wrap gap-2">
        <Button onClick={onAddTeacher}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
