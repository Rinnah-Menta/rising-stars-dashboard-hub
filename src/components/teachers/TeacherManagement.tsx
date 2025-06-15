
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeachersStats } from './TeachersStats';
import { TeacherPageHeader } from './TeacherPageHeader';
import { TeachersTable, Teacher } from './TeachersTable';
import { TeacherDialog } from './TeacherDialog';
import { TeacherViewDialog } from './TeacherViewDialog';

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

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(mockTeachers);
  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>(mockTeachers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Filter teachers based on search and status
  React.useEffect(() => {
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

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsDialogOpen(true);
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setIsDialogOpen(true);
  };

  const handleViewTeacher = (teacher: Teacher) => {
    setViewingTeacher(teacher);
    setIsViewDialogOpen(true);
  };

  const handleSaveTeacher = (teacherData: any) => {
    // Convert classes string to classesTaught array if needed
    const processedData = {
      ...teacherData,
      classesTaught: teacherData.classes ? teacherData.classes.split(', ').filter((c: string) => c.trim() !== '') : []
    };
    delete processedData.classes;

    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...processedData } : t));
    } else {
      const newTeacher: Teacher = {
        id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'active',
        ...processedData
      };
      setTeachers(prev => [...prev, newTeacher]);
    }
    setIsDialogOpen(false);
  };

  const handleArchiveTeacher = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: 'inactive' as const } : t));
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handleExport = () => {
    const csvContent = [
      ['Teacher ID', 'Name', 'Subject', 'Classes', 'Experience', 'Phone', 'Status', 'Email', 'Qualification', 'Department', 'Join Date'],
      ...filteredTeachers.map(teacher => [
        teacher.id,
        teacher.name,
        teacher.subject,
        teacher.classesTaught?.join(', ') || '',
        teacher.experience,
        teacher.phone,
        teacher.status,
        teacher.email || '',
        teacher.qualification || '',
        teacher.department || '',
        teacher.joinDate || ''
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teachers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <TeacherPageHeader 
        onAddTeacher={handleAddTeacher} 
        onExport={handleExport}
      />
      <TeachersStats teachers={filteredTeachers} />
      
      <Card>
        <CardContent className="p-6">
          <TeachersTable
            teachers={filteredTeachers}
            onEdit={handleEditTeacher}
            onView={handleViewTeacher}
            onArchive={handleArchiveTeacher}
            onDelete={handleDeleteTeacher}
          />
        </CardContent>
      </Card>

      <TeacherDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTeacher}
        teacher={editingTeacher}
      />

      <TeacherViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        teacher={viewingTeacher}
        onEdit={(teacher) => {
          setIsViewDialogOpen(false);
          handleEditTeacher(teacher);
        }}
      />
    </div>
  );
};
