
import { Teacher } from '@/components/teachers/TeachersTable';

export const exportTeachersToCSV = (teachers: Teacher[]) => {
  const csvContent = [
    ['Teacher ID', 'Name', 'Subject', 'Classes', 'Experience', 'Phone', 'Status', 'Email', 'Qualification', 'Department', 'Join Date'],
    ...teachers.map(teacher => [
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
