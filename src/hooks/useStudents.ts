
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { localStudentDatabase } from '@/data/studentdata';

export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parent: string;
  phone: string;
  email?: string;
  address?: string;
  status: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled';
  dateOfBirth?: string;
  schoolPayCode?: string;
}

export const useStudents = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadStudents();
  }, []);

  // Filter students based on search, status, and teacher's classes
  useEffect(() => {
    let filtered = allStudents;

    // Filter by teacher's classes if user is a teacher
    if (user?.role === 'teacher' && profileData?.classesTaught) {
      try {
        const classesTaught = Array.isArray(profileData.classesTaught) 
          ? profileData.classesTaught 
          : JSON.parse(profileData.classesTaught || '[]');
        
        filtered = filtered.filter(student => 
          classesTaught.includes(student.class)
        );
      } catch (error) {
        console.error('Error parsing classes taught:', error);
        filtered = [];
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterClass !== 'all') {
      filtered = filtered.filter(student => student.class === filterClass);
    }

    setFilteredStudents(filtered);
  }, [allStudents, searchTerm, filterClass, user, profileData]);

  const loadStudents = () => {
    setLoading(true);
    // Load real student data from studentdata.ts
    setTimeout(() => {
      const realStudents: Student[] = localStudentDatabase.users.map(student => ({
        id: student.id,
        name: student.name,
        class: student.class,
        age: Math.floor(Math.random() * 5) + 6, // Random age between 6-10 for primary school
        parent: 'Parent/Guardian',
        phone: `+256 77${Math.floor(1000000 + Math.random() * 9000000)}`,
        email: student.email,
        address: 'Kampala, Uganda',
        status: 'active' as const,
        dateOfBirth: student.dateOfBirth || '',
        schoolPayCode: student.schoolPayCode || ''
      }));
      setAllStudents(realStudents);
      setLoading(false);
    }, 1000);
  };

  const getStats = () => {
    const total = filteredStudents.length;
    const activeClasses = [...new Set(filteredStudents.map(s => s.class))].length;
    const activeStudents = filteredStudents.filter(s => s.status === 'active').length;
    const inactiveStudents = filteredStudents.filter(s => s.status !== 'active').length;
    
    return { total, activeClasses, activeStudents, inactiveStudents };
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: `SS${String(allStudents.length + 1).padStart(3, '0')}`,
      status: 'active' as const
    };
    setAllStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setAllStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, ...updates } : student
      )
    );
  };

  const updateStudentStatus = (id: string, status: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled') => {
    setAllStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, status } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setAllStudents(prev => prev.filter(student => student.id !== id));
  };

  // Get available classes
  const getAvailableClasses = () => {
    return [...new Set(allStudents.map(student => student.class))].sort();
  };

  return {
    students: filteredStudents,
    allStudents,
    loading,
    searchTerm,
    setSearchTerm,
    filterClass,
    setFilterClass,
    availableClasses: getAvailableClasses(),
    stats: getStats(),
    addStudent,
    updateStudent,
    updateStudentStatus,
    deleteStudent,
    refreshStudents: loadStudents
  };
};
