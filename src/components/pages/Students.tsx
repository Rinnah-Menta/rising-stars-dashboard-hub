import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { useStudents, Student } from '@/hooks/useStudents';
import { StudentsStats } from '@/components/students/StudentsStats';
import { StudentsTable } from '@/components/students/StudentsTable';
import { StudentPageHeader } from '@/components/students/StudentPageHeader';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentManagement } from '@/components/students/StudentManagement';
import { useStudentPermissions } from '@/components/students/StudentPermissions';
import { useStudentPageLogic } from '@/components/students/StudentPageLogic';
import { useStudentOperationHandlers } from '@/components/students/StudentOperationHandlers';
import AnimatedInView from '@/components/AnimatedInView';

export const Students = () => {
  const {
    students,
    loading,
    searchTerm,
    setSearchTerm,
    filterClass,
    setFilterClass,
    availableClasses,
    stats,
    addStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
    refreshStudents
  } = useStudents();

  const {
    isTeacher,
    isAdmin,
    isClassTeacher,
    canManageStudents,
    getTeacherClasses,
    getPageDescription
  } = useStudentPermissions();

  const {
    showAddDialog,
    setShowAddDialog,
    showDetailsDialog,
    setShowDetailsDialog,
    selectedStudent,
    editingStudent,
    setEditingStudent,
    confirmationDialog,
    setConfirmationDialog,
    handleViewStudent,
    openAddDialog,
    closeAddDialog,
    openEditDialog
  } = useStudentPageLogic();

  const {
    handleAddStudent,
    handleEditStudent,
    handleUpdateStudent,
    handleConfirmOperation,
    handleDeleteStudent,
    handleArchiveStudent,
    handleExport
  } = useStudentOperationHandlers({
    isTeacher,
    canManageStudents,
    addStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
    students,
    setConfirmationDialog,
    setEditingStudent
  });

  const onEditStudent = (student: Student) => {
    handleEditStudent(student);
    openEditDialog(student);
  };

  const onConfirmOperation = () => {
    handleConfirmOperation(confirmationDialog);
  };

  return (
    <div className="space-y-6">
      <StudentPageHeader
        canManageStudents={canManageStudents}
        isTeacher={isTeacher}
        isClassTeacher={isClassTeacher}
        getTeacherClasses={getTeacherClasses}
        onAddStudent={openAddDialog}
        onExport={handleExport}
        onRefresh={refreshStudents}
        loading={loading}
        getPageDescription={getPageDescription}
      />

      <StudentsStats stats={stats} />

      <AnimatedInView>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>
                Student List
                {isTeacher && getTeacherClasses().length > 0 && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    • Classes: {getTeacherClasses().join(', ')}
                  </span>
                )}
              </CardTitle>
              <StudentFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterClass={filterClass}
                setFilterClass={setFilterClass}
                availableClasses={availableClasses}
                resultsCount={students.length}
              />
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Loading students...</span>
              </div>
            ) : (
              <StudentsTable
                students={students}
                onEdit={canManageStudents ? onEditStudent : undefined}
                onDelete={canManageStudents ? handleDeleteStudent : undefined}
                onArchive={canManageStudents ? handleArchiveStudent : undefined}
                onView={handleViewStudent}
                onUpdateStatus={canManageStudents ? updateStudentStatus : undefined}
                readOnly={!canManageStudents}
              />
            )}
          </CardContent>
        </Card>
      </AnimatedInView>

      <StudentManagement
        showAddDialog={showAddDialog}
        setShowAddDialog={setShowAddDialog}
        showDetailsDialog={showDetailsDialog}
        setShowDetailsDialog={setShowDetailsDialog}
        selectedStudent={selectedStudent}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
        confirmationDialog={confirmationDialog}
        setConfirmationDialog={setConfirmationDialog}
        canManageStudents={canManageStudents}
        isTeacher={isTeacher}
        getTeacherClasses={getTeacherClasses}
        handleAddStudent={handleAddStudent}
        handleUpdateStudent={handleUpdateStudent}
        handleEditStudent={onEditStudent}
        handleConfirmOperation={onConfirmOperation}
        onCloseAddDialog={closeAddDialog}
      />
    </div>
  );
};
