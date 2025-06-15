
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeachersStats } from './TeachersStats';
import { TeacherPageHeader } from './TeacherPageHeader';
import { TeachersTable, Teacher } from './TeachersTable';
import { TeacherDialog } from './TeacherDialog';
import { TeacherViewDialog } from './TeacherViewDialog';
import { TeacherFilters } from './TeacherFilters';
import { useTeacherData } from '@/hooks/useTeacherData';
import { useTeacherFilters } from '@/hooks/useTeacherFilters';
import { exportTeachersToCSV } from '@/utils/teacherExport';

export const TeacherManagement = () => {
  const { teachers, addTeacher, updateTeacher, archiveTeacher, deleteTeacher } = useTeacherData();
  const { 
    filteredTeachers, 
    searchTerm, 
    setSearchTerm, 
    filterStatus, 
    setFilterStatus 
  } = useTeacherFilters(teachers);
  
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
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Teacher List</CardTitle>
            <TeacherFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              resultsCount={filteredTeachers.length}
            />
          </div>
        </CardHeader>
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
