
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeachersStats } from './TeachersStats';
import { TeacherPageHeader } from './TeacherPageHeader';
import { TeachersTable, Teacher } from './TeachersTable';
import { TeacherDialog } from './TeacherDialog';
import { TeacherViewDialog } from './TeacherViewDialog';
import { useTeacherData } from '@/hooks/useTeacherData';
import { useTeacherFilters } from '@/hooks/useTeacherFilters';
import { exportTeachersToCSV } from '@/utils/teacherExport';

export const TeacherManagement = () => {
  const { teachers, addTeacher, updateTeacher, archiveTeacher, deleteTeacher } = useTeacherData();
  const { filteredTeachers } = useTeacherFilters(teachers);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsDialogOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsDialogOpen(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setViewingTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const handleSaveTeacher = (teacherData: any) => {
    if (editingTeacher) {
      updateTeacher(editingTeacher, teacherData);
    } else {
      addTeacher(teacherData);
    }
    setIsDialogOpen(false);
  };

  const handleExport = () => {
    exportTeachersToCSV(filteredTeachers);
  };

  return (
    <div className="space-y-6">
      <TeacherPageHeader 
        onAddTeacher={handleAddTeacher} 
        onExport={handleExport}
      />
      <TeachersStats teachers={filteredTeachers} />
      
      <Card>
        <CardContent className="p-6">
          <TeachersTable
            teachers={filteredTeachers}
            onEdit={handleEditTeacher}
            onView={handleViewTeacher}
            onArchive={archiveTeacher}
            onDelete={deleteTeacher}
          />
        </CardContent>
      </Card>

      <TeacherDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTeacher}
        teacher={editingTeacher}
      />

      <TeacherViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        teacher={viewingTeacher}
        onEdit={(teacher) => {
          setIsViewDialogOpen(false);
          handleEditTeacher(teacher);
        }}
      />
    </div>
  );
};
