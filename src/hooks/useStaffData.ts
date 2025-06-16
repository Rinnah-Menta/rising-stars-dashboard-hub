
import { useState } from 'react';
import { StaffMember } from '@/components/staff/StaffTable';

const mockStaff: StaffMember[] = [
  { 
    id: 'STF001', 
    name: 'Sarah Nakiwala', 
    type: 'teaching',
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
    id: 'STF002', 
    name: 'John Mugisha', 
    type: 'teaching',
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
    id: 'STF003', 
    name: 'Grace Namuli', 
    type: 'teaching',
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
    id: 'STF004', 
    name: 'David Ssekandi', 
    type: 'teaching',
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
    id: 'STF005', 
    name: 'Mary Achieng', 
    type: 'teaching',
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
    id: 'STF006', 
    name: 'Robert Okello', 
    type: 'teaching',
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
  {
    id: 'STF007',
    name: 'Alice Namukasa',
    type: 'non-teaching',
    role: 'Accountant',
    phone: '+256 706 789 012',
    status: 'active',
    experience: '7 years',
    qualification: 'Bachelor of Commerce',
    department: 'Finance',
    email: 'alice@school.com',
    joinDate: '2017-05-20'
  },
  {
    id: 'STF008',
    name: 'Peter Mukasa',
    type: 'non-teaching',
    role: 'IT Support',
    phone: '+256 707 890 123',
    status: 'active',
    experience: '5 years',
    qualification: 'Diploma in Computer Science',
    department: 'IT',
    email: 'peter@school.com',
    joinDate: '2019-03-15'
  }
];

export const useStaffData = () => {
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff);

  const addStaffMember = (staffData: any) => {
    // Convert classes string to classesTaught array if needed for teaching staff
    const processedData = {
      ...staffData,
      classesTaught: staffData.classes && staffData.type === 'teaching' 
        ? staffData.classes.split(', ').filter((c: string) => c.trim() !== '') 
        : []
    };
    delete processedData.classes;

    const newStaffMember: StaffMember = {
      id: `STF${String(staff.length + 1).padStart(3, '0')}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'active',
      ...processedData
    };
    setStaff(prev => [...prev, newStaffMember]);
  };

  const updateStaffMember = (editingStaff: StaffMember, staffData: any) => {
    // Convert classes string to classesTaught array if needed for teaching staff
    const processedData = {
      ...staffData,
      classesTaught: staffData.classes && staffData.type === 'teaching'
        ? staffData.classes.split(', ').filter((c: string) => c.trim() !== '') 
        : []
    };
    delete processedData.classes;

    setStaff(prev => prev.map(s => s.id === editingStaff.id ? { ...editingStaff, ...processedData } : s));
  };

  const updateStaffStatus = (id: string, status: StaffMember['status']) => {
    setStaff(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };

  const archiveStaffMember = (id: string) => {
    updateStaffStatus(id, 'archived');
  };

  const suspendStaffMember = (id: string) => {
    updateStaffStatus(id, 'suspended');
  };

  const terminateStaffMember = (id: string) => {
    updateStaffStatus(id, 'terminated');
  };

  const deleteStaffMember = (id: string) => {
    setStaff(prev => prev.filter(s => s.id !== id));
  };

  return {
    staff,
    addStaffMember,
    updateStaffMember,
    updateStaffStatus,
    archiveStaffMember,
    suspendStaffMember,
    terminateStaffMember,
    deleteStaffMember
  };
};
