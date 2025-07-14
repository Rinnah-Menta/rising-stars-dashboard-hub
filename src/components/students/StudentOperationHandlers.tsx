
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { usePendingStudentOperations } from '@/hooks/usePendingStudentOperations';
import { Student } from '@/hooks/useStudents';

interface UseStudentOperationHandlersProps {
  isTeacher: boolean;
  canManageStudents: boolean;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Student) => void;
  updateStudentStatus: (id: string, status: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled') => void;
  deleteStudent: (id: string) => void;
  students: Student[];
  setConfirmationDialog: (dialog: any) => void;
  setEditingStudent: (student: Student | null) => void;
}

export const useStudentOperationHandlers = ({
  isTeacher,
  canManageStudents,
  addStudent,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
  students,
  setConfirmationDialog,
  setEditingStudent
}: UseStudentOperationHandlersProps) => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const { addPendingOperation } = usePendingStudentOperations();
  const { toast } = useToast();

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
  };

  const handleUpdateStudent = (studentData: Student) => {
    if (isTeacher) {
      setConfirmationDialog({
        open: true,
        type: 'edit',
        data: { studentData, originalStudent: studentData }
      });
    } else {
      updateStudent(studentData.id, studentData);
    }
    setEditingStudent(null);
  };

  const handleConfirmOperation = (confirmationDialog: any) => {
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

  const handleArchiveStudent = (id: string) => {
    if (!canManageStudents) {
      toast({
        title: "Access Denied",
        description: "Only class teachers and admins can archive students.",
        variant: "destructive"
      });
      return;
    }

    updateStudentStatus(id, 'archived');
    toast({
      title: "Student Archived",
      description: "Student has been moved to archived status.",
    });
  };

  const handleExport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Class', 'Age', 'Parent/Guardian', 'Contact', 'Account Status'],
      ...students.map(student => [
        student.id,
        student.name,
        student.class,
        student.age.toString(),
        student.parent,
        student.phone,
        student.status
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

  return {
    handleAddStudent,
    handleEditStudent,
    handleUpdateStudent,
    handleConfirmOperation,
    handleDeleteStudent,
    handleArchiveStudent,
    handleExport
  };
};
