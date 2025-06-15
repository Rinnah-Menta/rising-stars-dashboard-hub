
import { useState } from 'react';
import { Teacher } from '@/components/teachers/TeachersTable';

const mockTeachers: Teacher[] = [
  { 
    id: 'TCH001', 
    name: 'Sarah Nakiwala', 
    subject: 'Mathematics', 
    phone: '+256 700 123 456', 
    status: 'active', 
    experience: '8 years', 
    email: 'sarah@school.com', 
    qualification: 'Bachelor of Education', 
    department: 'Primary Upper',
    joinDate: '2016-01-15',
    classesTaught: ['P.5A', 'P.6B', 'P.7A']
  },
  { 
    id: 'TCH002', 
    name: 'John Mugisha', 
    subject: 'English', 
    phone: '+256 701 234 567', 
    status: 'active', 
    experience: '12 years', 
    email: 'john@school.com', 
    qualification: 'Master of Education', 
    department: 'Primary Upper',
    joinDate: '2012-03-20',
    classesTaught: ['P.4A', 'P.5B', 'P.6A']
  },
  { 
    id: 'TCH003', 
    name: 'Grace Namuli', 
    subject: 'Science', 
    phone: '+256 702 345 678', 
    status: 'active', 
    experience: '6 years', 
    qualification: 'Diploma in Education', 
    department: 'Primary Upper',
    email: 'grace@school.com',
    joinDate: '2018-08-10',
    classesTaught: ['P.6A', 'P.7B']
  },
  { 
    id: 'TCH004', 
    name: 'David Ssekandi', 
    subject: 'Social Studies', 
    phone: '+256 703 456 789', 
    status: 'on-leave', 
    experience: '15 years', 
    qualification: 'Bachelor of Arts', 
    department: 'Primary Upper',
    email: 'david@school.com',
    joinDate: '2009-02-14',
    classesTaught: ['P.5A', 'P.6B']
  },
  { 
    id: 'TCH005', 
    name: 'Mary Achieng', 
    subject: 'Art & Craft', 
    phone: '+256 704 567 890', 
    status: 'active', 
    experience: '4 years', 
    qualification: 'Certificate in Education', 
    department: 'Arts',
    email: 'mary@school.com',
    joinDate: '2020-09-01',
    classesTaught: ['P.4A', 'P.5A', 'P.6A']
  },
  { 
    id: 'TCH006', 
    name: 'Robert Okello', 
    subject: 'Physical Education', 
    phone: '+256 705 678 901', 
    status: 'active', 
    experience: '10 years', 
    qualification: 'Bachelor of Science', 
    department: 'Sports',
    email: 'robert@school.com',
    joinDate: '2014-01-15',
    classesTaught: ['All Classes']
  },
];

export const useTeacherData = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);

  const addTeacher = (teacherData: any) => {
    // Convert classes string to classesTaught array if needed
    const processedData = {
      ...teacherData,
      classesTaught: teacherData.classes ? teacherData.classes.split(', ').filter((c: string) => c.trim() !== '') : []
    };
    delete processedData.classes;

    const newTeacher: Teacher = {
      id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      ...processedData
    };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const updateTeacher = (editingTeacher: Teacher, teacherData: any) => {
    // Convert classes string to classesTaught array if needed
    const processedData = {
      ...teacherData,
      classesTaught: teacherData.classes ? teacherData.classes.split(', ').filter((c: string) => c.trim() !== '') : []
    };
    delete processedData.classes;

    setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...processedData } : t));
  };

  const archiveTeacher = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: 'inactive' as const } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  return {
    teachers,
    addTeacher,
    updateTeacher,
    archiveTeacher,
    deleteTeacher
  };
};
