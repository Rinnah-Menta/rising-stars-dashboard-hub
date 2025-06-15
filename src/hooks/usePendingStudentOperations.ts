
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Student } from './useStudents';

export interface PendingStudentOperation {
  id: string;
  type: 'add' | 'edit' | 'delete';
  studentData: Partial<Student>;
  originalStudent?: Student;
  teacherName: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
  reason?: string;
}

export const usePendingStudentOperations = () => {
  const { user } = useAuth();
  const [pendingOperations, setPendingOperations] = useState<PendingStudentOperation[]>([]);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadPendingOperations();
    }
  }, [user]);

  const loadPendingOperations = () => {
    const stored = localStorage.getItem('pending_student_operations');
    if (stored) {
      setPendingOperations(JSON.parse(stored));
    }
  };

  const savePendingOperations = (operations: PendingStudentOperation[]) => {
    localStorage.setItem('pending_student_operations', JSON.stringify(operations));
    setPendingOperations(operations);
  };

  const addPendingOperation = (operation: Omit<PendingStudentOperation, 'id' | 'timestamp' | 'status'>) => {
    const newOperation: PendingStudentOperation = {
      ...operation,
      id: `pending_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    const updated = [...pendingOperations, newOperation];
    savePendingOperations(updated);

    // Add notification for admin
    const notifications = JSON.parse(localStorage.getItem('admin_notifications') || '[]');
    const newNotification = {
      id: `notif_${Date.now()}`,
      type: 'student_operation',
      message: `${operation.type} student request from ${operation.teacherName}`,
      user: operation.teacherName,
      timestamp: new Date().toISOString(),
      read: false,
      status: 'pending'
    };
    
    notifications.unshift(newNotification);
    localStorage.setItem('admin_notifications', JSON.stringify(notifications));

    return newOperation.id;
  };

  const approveOperation = (operationId: string) => {
    const updated = pendingOperations.map(op => 
      op.id === operationId ? { ...op, status: 'approved' as const } : op
    );
    savePendingOperations(updated);
  };

  const rejectOperation = (operationId: string, reason?: string) => {
    const updated = pendingOperations.map(op => 
      op.id === operationId ? { ...op, status: 'rejected' as const, reason } : op
    );
    savePendingOperations(updated);
  };

  const getPendingCount = () => {
    return pendingOperations.filter(op => op.status === 'pending').length;
  };

  return {
    pendingOperations,
    addPendingOperation,
    approveOperation,
    rejectOperation,
    getPendingCount,
    refreshOperations: loadPendingOperations
  };
};
