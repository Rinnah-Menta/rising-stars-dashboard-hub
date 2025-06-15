
import { useState, useEffect } from 'react';

export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parent: string;
  phone: string;
  fees: 'Paid' | 'Pending' | 'Overdue';
  email?: string;
  address?: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadStudents();
  }, []);

  // Filter students based on search and status
  useEffect(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => student.fees === filterStatus);
    }

    setFilteredStudents(filtered);
  }, [students, searchTerm, filterStatus]);

  const loadStudents = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockStudents: Student[] = [
        { id: 'SS001', name: 'Sarah Nakato', class: 'P.7A', age: 13, parent: 'Robert Nakato', phone: '+256 700 123 456', fees: 'Paid' },
        { id: 'SS002', name: 'John Mukasa', class: 'P.6B', age: 12, parent: 'Grace Mukasa', phone: '+256 701 234 567', fees: 'Pending' },
        { id: 'SS003', name: 'Mary Namuli', class: 'P.5A', age: 11, parent: 'Peter Namuli', phone: '+256 702 345 678', fees: 'Paid' },
        { id: 'SS004', name: 'David Ssali', class: 'P.7B', age: 14, parent: 'Jane Ssali', phone: '+256 703 456 789', fees: 'Paid' },
        { id: 'SS005', name: 'Ruth Auma', class: 'P.4A', age: 10, parent: 'James Auma', phone: '+256 704 567 890', fees: 'Overdue' },
        { id: 'SS006', name: 'Samuel Okello', class: 'P.6A', age: 12, parent: 'Helen Okello', phone: '+256 705 678 901', fees: 'Paid' },
        { id: 'SS007', name: 'Grace Nalubega', class: 'P.5B', age: 11, parent: 'Moses Nalubega', phone: '+256 706 789 012', fees: 'Pending' },
        { id: 'SS008', name: 'Emmanuel Kato', class: 'P.7A', age: 13, parent: 'Sarah Kato', phone: '+256 707 890 123', fees: 'Paid' },
      ];
      setStudents(mockStudents);
      setLoading(false);
    }, 1000);
  };

  const getStats = () => {
    const total = students.length;
    const paid = students.filter(s => s.fees === 'Paid').length;
    const pending = students.filter(s => s.fees === 'Pending').length;
    const overdue = students.filter(s => s.fees === 'Overdue').length;
    
    return { total, paid, pending, overdue };
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: `SS${String(students.length + 1).padStart(3, '0')}`
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === id ? { ...student, ...updates } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  return {
    students: filteredStudents,
    allStudents: students,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    stats: getStats(),
    addStudent,
    updateStudent,
    deleteStudent,
    refreshStudents: loadStudents
  };
};
