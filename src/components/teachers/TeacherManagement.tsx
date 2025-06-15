
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TeachersStats } from './TeachersStats';
import { TeacherPageHeader } from './TeacherPageHeader';
import { TeachersTable } from './TeachersTable';
import { TeacherDialog } from './TeacherDialog';

const mockTeachers = [
  { id: 'TCH001', name: 'Sarah Nakiwala', subject: 'Mathematics', classes: 'P.5A, P.6B, P.7A', phone: '+256 700 123 456', status: 'Active', experience: '8 years' },
  { id: 'TCH002', name: 'John Mugisha', subject: 'English', classes: 'P.4A, P.5B, P.6A', phone: '+256 701 234 567', status: 'Active', experience: '12 years' },
  { id: 'TCH003', name: 'Grace Namuli', subject: 'Science', classes: 'P.6A, P.7B', phone: '+256 702 345 678', status: 'Active', experience: '6 years' },
  { id: 'TCH004', name: 'David Ssekandi', subject: 'Social Studies', classes: 'P.5A, P.6B', phone: '+256 703 456 789', status: 'On Leave', experience: '15 years' },
  { id: 'TCH005', name: 'Mary Achieng', subject: 'Art & Craft', classes: 'P.4A, P.5A, P.6A', phone: '+256 704 567 890', status: 'Active', experience: '4 years' },
  { id: 'TCH006', name: 'Robert Okello', subject: 'Physical Education', classes: 'All Classes', phone: '+256 705 678 901', status: 'Active', experience: '10 years' },
];

export const TeacherManagement = () => {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = () => {
    setEditingTeacher(null);
    setIsDialogOpen(true);
  };

  const handleEditTeacher = (teacher: any) => {
    setEditingTeacher(teacher);
    setIsDialogOpen(true);
  };

  const handleSaveTeacher = (teacherData: any) => {
    if (editingTeacher) {
      setTeachers(prev => prev.map(t => t.id === editingTeacher.id ? { ...editingTeacher, ...teacherData } : t));
    } else {
      const newTeacher = {
        id: `TCH${String(teachers.length + 1).padStart(3, '0')}`,
        ...teacherData
      };
      setTeachers(prev => [...prev, newTeacher]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <TeacherPageHeader onAddTeacher={handleAddTeacher} />
      <TeachersStats teachers={teachers} />
      
      <Card>
        <CardContent className="p-6">
          <TeachersTable
            teachers={filteredTeachers}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onEditTeacher={handleEditTeacher}
          />
        </CardContent>
      </Card>

      <TeacherDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveTeacher}
        teacher={editingTeacher}
      />
    </div>
  );
};
