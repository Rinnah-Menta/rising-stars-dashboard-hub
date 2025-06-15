
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Download, RefreshCw } from 'lucide-react';
import AnimatedInView from '@/components/AnimatedInView';

interface StudentPageHeaderProps {
  canManageStudents: boolean;
  isTeacher: boolean;
  isClassTeacher: boolean;
  getTeacherClasses: () => string[];
  onAddStudent: () => void;
  onExport: () => void;
  onRefresh: () => void;
  loading: boolean;
  getPageDescription: () => string;
}

export const StudentPageHeader: React.FC<StudentPageHeaderProps> = ({
  canManageStudents,
  isTeacher,
  isClassTeacher,
  getTeacherClasses,
  onAddStudent,
  onExport,
  onRefresh,
  loading,
  getPageDescription
}) => {
  return (
    <AnimatedInView>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Students Management</h1>
          <p className="text-gray-600 mt-1">{getPageDescription()}</p>
          {isTeacher && !canManageStudents && (
            <p className="text-sm text-amber-600 mt-1">
              ⚠️ You have read-only access. Contact admin to become a class teacher for full access.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {canManageStudents && (
            <Button onClick={onAddStudent} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          )}
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={onRefresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>
    </AnimatedInView>
  );
};
