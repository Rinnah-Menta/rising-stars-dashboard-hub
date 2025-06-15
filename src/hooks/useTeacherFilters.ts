
import { useState, useEffect } from 'react';
import { Teacher } from '@/components/teachers/TeachersTable';

export const useTeacherFilters = (teachers: Teacher[]) => {
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(teachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    let filtered = teachers;

    if (searchTerm) {
      filtered = filtered.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (teacher.classesTaught && teacher.classesTaught.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(teacher => teacher.status === filterStatus);
    }

    setFilteredTeachers(filtered);
  }, [teachers, searchTerm, filterStatus]);

  return {
    filteredTeachers,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus
  };
};
