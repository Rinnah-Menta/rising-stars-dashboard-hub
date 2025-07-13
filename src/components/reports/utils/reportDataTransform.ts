import { Student } from '@/hooks/useStudents';
import { ReportData, ReportStudent } from '../types';

export const transformStudentDataForReport = (students: Student[]): ReportData => {
  const transformedStudents: ReportStudent[] = students.map(student => ({
    id: student.id,
    name: student.name,
    class: student.class,
    dob: student.dateOfBirth || '',
    admissionNumber: student.schoolPayCode || student.id,
    rollNumber: student.id.replace(/\D/g, '') || '1',
    section: student.class.split('_').pop() || 'A',
    houseColor: getRandomHouseColor(),
    fatherName: 'Father Name', // TODO: Get from parent data when available
    motherName: 'Mother Name', // TODO: Get from parent data when available  
    address: student.address || 'Kampala, Uganda',
    phoneNumber: student.phone
  }));

  return {
    students: transformedStudents,
    grades: [] // TODO: Integrate with grades system when available
  };
};

const getRandomHouseColor = (): string => {
  const colors = ['Red', 'Blue', 'Green', 'Yellow'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getAvailableTerms = (): string[] => {
  return [
    'Term 1 - 2024',
    'Term 2 - 2024', 
    'Term 3 - 2024',
    'Term 1 - 2025',
    'Term 2 - 2025',
    'Term 3 - 2025'
  ];
};