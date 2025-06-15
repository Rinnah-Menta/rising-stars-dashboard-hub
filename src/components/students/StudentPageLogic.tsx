
import { useState } from 'react';
import { Student } from '@/hooks/useStudents';

export const useStudentPageLogic = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    type: 'add' | 'edit';
    data: any;
  }>({ open: false, type: 'add', data: null });

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  const openAddDialog = () => setShowAddDialog(true);

  const closeAddDialog = () => {
    setShowAddDialog(false);
    setEditingStudent(null);
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setShowAddDialog(true);
  };

  return {
    showAddDialog,
    setShowAddDialog,
    showDetailsDialog,
    setShowDetailsDialog,
    selectedStudent,
    setSelectedStudent,
    editingStudent,
    setEditingStudent,
    confirmationDialog,
    setConfirmationDialog,
    handleViewStudent,
    openAddDialog,
    closeAddDialog,
    openEditDialog
  };
};
