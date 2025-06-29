
import { useState, useEffect } from 'react';

export interface Assignment {
  id: number;
  title: string;
  subject: string;
  teacher: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'in-progress' | 'overdue';
  description: string;
  priority: 'high' | 'medium' | 'low';
  submissionDate?: string;
  grade?: string;
  feedback?: string;
  workContent?: string;
  lastWorkedOn?: string;
  submissionContent?: string;
  submissionFiles?: string[];
}

export const useAssignmentsData = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load assignments from localStorage on mount
  useEffect(() => {
    const savedAssignments = localStorage.getItem('assignments');
    if (savedAssignments) {
      try {
        const parsedAssignments = JSON.parse(savedAssignments);
        setAssignments(parsedAssignments);
      } catch (error) {
        console.error('Error parsing assignments from localStorage:', error);
        setAssignments(getDefaultAssignments());
      }
    } else {
      setAssignments(getDefaultAssignments());
    }
    setLoading(false);
  }, []);

  // Save assignments to localStorage whenever assignments change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('assignments', JSON.stringify(assignments));
    }
  }, [assignments, loading]);

  const getDefaultAssignments = (): Assignment[] => [
    {
      id: 1,
      title: 'Mathematics - Fractions Worksheet',
      subject: 'Mathematics',
      teacher: 'Ms. Nakato',
      dueDate: '2024-06-15',
      status: 'pending',
      description: 'Complete exercises 1-15 on fractions and decimals conversion.',
      priority: 'high',
    },
    {
      id: 2,
      title: 'English - Creative Writing Essay',
      subject: 'English',
      teacher: 'Mr. Okello',
      dueDate: '2024-06-18',
      status: 'submitted',
      description: 'Write a 300-word essay about "My Dream for Uganda".',
      priority: 'medium',
      submissionDate: '2024-06-17',
      grade: 'A-',
      feedback: 'Excellent work! Very creative and well-structured essay.',
      submissionContent: 'My dream for Uganda is to see a country where every child has access to quality education...',
      submissionFiles: ['essay-draft.docx', 'references.pdf'],
    },
    {
      id: 3,
      title: 'Science - Plant Growth Experiment',
      subject: 'Science',
      teacher: 'Ms. Apio',
      dueDate: '2024-06-20',
      status: 'in-progress',
      description: 'Observe and record plant growth over 7 days. Submit observation chart.',
      priority: 'medium',
      workContent: 'Day 1: Planted seeds in different soil types.\nDay 2: No visible growth yet.\nDay 3: Small sprouts appearing in organic soil.',
      lastWorkedOn: '2024-06-18',
    },
    {
      id: 4,
      title: 'Social Studies - Uganda Map Drawing',
      subject: 'Social Studies',
      teacher: 'Mr. Musoke',
      dueDate: '2024-06-12',
      status: 'overdue',
      description: 'Draw and label the districts of Uganda with their capitals.',
      priority: 'high',
    },
  ];

  const updateAssignmentStatus = (id: number, status: Assignment['status']) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id 
        ? { 
            ...assignment, 
            status,
            ...(status === 'submitted' ? { submissionDate: new Date().toISOString().split('T')[0] } : {})
          }
        : assignment
    ));
  };

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    const newId = Math.max(...assignments.map(a => a.id)) + 1;
    setAssignments(prev => [...prev, { ...assignment, id: newId }]);
  };

  const updateAssignment = (id: number, updates: Partial<Assignment>) => {
    setAssignments(prev => prev.map(assignment => 
      assignment.id === id ? { ...assignment, ...updates } : assignment
    ));
  };

  const deleteAssignment = (id: number) => {
    setAssignments(prev => prev.filter(assignment => assignment.id !== id));
  };

  const getStats = () => {
    return {
      total: assignments.length,
      pending: assignments.filter(a => a.status === 'pending').length,
      inProgress: assignments.filter(a => a.status === 'in-progress').length,
      submitted: assignments.filter(a => a.status === 'submitted').length,
      overdue: assignments.filter(a => a.status === 'overdue').length,
    };
  };

  return {
    assignments,
    loading,
    updateAssignmentStatus,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    getStats,
  };
};
