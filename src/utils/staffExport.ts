
import { StaffMember } from '@/components/staff/StaffTable';

export const exportStaffToCSV = (staff: StaffMember[]) => {
  const headers = [
    'ID',
    'Name',
    'Type',
    'Email',
    'Phone',
    'Subject/Role',
    'Department',
    'Qualification',
    'Experience',
    'Status',
    'Join Date',
    'Classes Taught'
  ];

  const csvContent = [
    headers.join(','),
    ...staff.map(member => [
      member.id,
      `"${member.name}"`,
      member.type,
      member.email,
      member.phone,
      `"${member.subject || member.role || 'N/A'}"`,
      `"${member.department}"`,
      `"${member.qualification}"`,
      `"${member.experience}"`,
      member.status,
      member.joinDate,
      `"${member.classesTaught?.join(', ') || 'N/A'}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `staff_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
