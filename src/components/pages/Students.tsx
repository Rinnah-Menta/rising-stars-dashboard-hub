
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';
import { useStudents, Student } from '@/hooks/useStudents';
import { usePendingStudentOperations } from '@/hooks/usePendingStudentOperations';
import { StudentsStats } from '@/components/students/StudentsStats';
import { StudentsTable } from '@/components/students/StudentsTable';
import { StudentPageHeader } from '@/components/students/StudentPageHeader';
import { StudentFilters } from '@/components/students/StudentFilters';
import { StudentManagement } from '@/components/students/StudentManagement';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import AnimatedInView from '@/components/AnimatedInView';

export const Students = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const {
    students,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    stats,
    addStudent,
    updateStudent,
    deleteStudent,
    refreshStudents
  } = useStudents();

  const { addPendingOperation } = usePendingStudentOperations();
  const { toast } = useToast();
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    type: 'add' | 'edit';
    data: any;
  }>({ open: false, type: 'add', data: null });

  const isTeacher = user?.role === 'teacher';
  const isAdmin = user?.role === 'admin';
  // Fix TypeScript error by properly comparing both boolean and string values
  const isClassTeacher = isTeacher && (profileData?.isClassTeacher === true || profileData?.isClassTeacher === 'true');
  const canManageStudents = isAdmin || isClassTeacher;

  const getTeacherClasses = () => {
    if (!profileData?.classesTaught) return [];
    try {
      return Array.isArray(profileData.classesTaught) 
        ? profileData.classesTaught 
        : JSON.parse(profileData.classesTaught || '[]');
    } catch {
      return [];
    }
  };

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    if (isTeacher) {
      setConfirmationDialog({
        open: true,
        type: 'add',
        data: studentData
      });
    } else {
      addStudent(studentData);
    }
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowAddDialog(true);
  };

  const handleUpdateStudent = (studentData: Student) => {
    if (isTeacher) {
      setConfirmationDialog({
        open: true,
        type: 'edit',
        data: { studentData, originalStudent: editingStudent }
      });
    } else {
      updateStudent(studentData.id, studentData);
    }
    setEditingStudent(null);
  };

  const handleConfirmOperation = () => {
    const { type, data } = confirmationDialog;
    
    if (isTeacher && user && profileData) {
      const teacherName = `${profileData.firstName} ${profileData.lastName}`;
      
      if (type === 'add') {
        addPendingOperation({
          type: 'add',
          studentData: data,
          teacherName
        });
        
        toast({
          title: "Request Submitted",
          description: "Your request to add a student has been sent to admin for approval.",
        });
      } else if (type === 'edit') {
        addPendingOperation({
          type: 'edit',
          studentData: data.studentData,
          originalStudent: data.originalStudent,
          teacherName
        });
        
        toast({
          title: "Request Submitted",
          description: "Your request to edit student information has been sent to admin for approval.",
        });
      }
    }
    
    setConfirmationDialog({ open: false, type: 'add', data: null });
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (!canManageStudents) {
      toast({
        title: "Access Denied",
        description: "Only class teachers and admins can delete students.",
        variant: "destructive"
      });
      return;
    }

    if (isTeacher && user && profileData) {
      const student = students.find(s => s.id === id);
      if (student) {
        const teacherName = `${profileData.firstName} ${profileData.lastName}`;
        addPendingOperation({
          type: 'delete',
          studentData: student,
          teacherName
        });
        
        toast({
          title: "Request Submitted",
          description: "Your request to delete the student has been sent to admin for approval.",
        });
      }
    } else {
      deleteStudent(id);
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Class', 'Age', 'Parent/Guardian', 'Contact', 'Fees Status'],
      ...students.map(student => [
        student.id,
        student.name,
        student.class,
        student.age.toString(),
        student.parent,
        student.phone,
        student.fees
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Students data has been exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <StudentPageHeader
        canManageStudents={canManageStudents}
        isTeacher={isTeacher}
        isClassTeacher={isClassTeacher}
        getTeacherClasses={getTeacherClasses}
        onAddStudent={() => setShowAddDialog(true)}
        onExport={handleExport}
        onRefresh={refreshStudents}
        loading={loading}
      />

      {/* Statistics */}
      <StudentsStats stats={stats} />

      {/* Students List */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>
                Student List ({students.length})
                {isTeacher && getTeacherClasses().length > 0 && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    • Classes: {getTeacherClasses().join(', ')}
                  </span>
                )}
              </CardTitle>
              <StudentFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
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
                onEdit={canManageStudents ? handleEditStudent : undefined}
                onDelete={canManageStudents ? handleDeleteStudent : undefined}
                onView={handleViewStudent}
                readOnly={!canManageStudents}
              />
            )}
          </CardContent>
        </Card>
      </AnimatedInView>

      {/* Student Management Dialogs */}
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
        handleEditStudent={handleEditStudent}
        handleConfirmOperation={handleConfirmOperation}
      />
    </div>
  );
};
