
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeachersStats } from './TeachersStats';
import { TeacherPageHeader } from './TeacherPageHeader';
import { TeachersTable } from './TeachersTable';
import { TeacherDialog } from './TeacherDialog';
import { TeacherViewDialog } from './TeacherViewDialog';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive' | 'Archived';
  experience: string;
  email?: string;
  address?: string;
  qualification?: string;
  department?: string;
}

const mockTeachers: Teacher[] = [
  { id: 'TCH001', name: 'Sarah Nakiwala', subject: 'Mathematics', classes: 'P.5A, P.6B, P.7A', phone: '+256 700 123 456', status: 'Active', experience: '8 years', email: 'sarah@school.com', qualification: 'Bachelor of Education', department: 'Primary Upper' },
  { id: 'TCH002', name: 'John Mugisha', subject: 'English', classes: 'P.4A, P.5B, P.6A', phone: '+256 701 234 567', status: 'Active', experience: '12 years', email: 'john@school.com', qualification: 'Master of Education', department: 'Primary Upper' },
  { id: 'TCH003', name: 'Grace Namuli', subject: 'Science', classes: 'P.6A, P.7B', phone: '+256 702 345 678', status: 'Active', experience: '6 years', qualification: 'Diploma in Education', department: 'Primary Upper' },
  { id: 'TCH004', name: 'David Ssekandi', subject: 'Social Studies', classes: 'P.5A, P.6B', phone: '+256 703 456 789', status: 'On Leave', experience: '15 years', qualification: 'Bachelor of Arts', department: 'Primary Upper' },
  { id: 'TCH005', name: 'Mary Achieng', subject: 'Art & Craft', classes: 'P.4A, P.5A, P.6A', phone: '+256 704 567 890', status: 'Active', experience: '4 years', qualification: 'Certificate in Education', department: 'Arts' },
  { id: 'TCH006', name: 'Robert Okello', subject: 'Physical Education', classes: 'All Classes', phone: '+256 705 678 901', status: 'Active', experience: '10 years', qualification: 'Bachelor of Science', department: 'Sports' },
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
        teacher.classes.toLowerCase().includes(searchTerm.toLowerCase())
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
    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...teacherData } : t));
    } else {
      const newTeacher: Teacher = {
        id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
        ...teacherData
      };
      setTeachers(prev => [...prev, newTeacher]);
    }
    setIsDialogOpen(false);
  };

  const handleArchiveTeacher = (id: string) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: 'Archived' as const } : t));
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const handleExport = () => {
    const csvContent = [
      ['Teacher ID', 'Name', 'Subject', 'Classes', 'Experience', 'Phone', 'Status', 'Email', 'Qualification', 'Department'],
      ...filteredTeachers.map(teacher => [
        teacher.id,
        teacher.name,
        teacher.subject,
        teacher.classes,
        teacher.experience,
        teacher.phone,
        teacher.status,
        teacher.email || '',
        teacher.qualification || '',
        teacher.department || ''
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
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEditTeacher={handleEditTeacher}
            onViewTeacher={handleViewTeacher}
            onArchiveTeacher={handleArchiveTeacher}
            onDeleteTeacher={handleDeleteTeacher}
            filterStatus={filterStatus}
            onFilterChange={setFilterStatus}
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
