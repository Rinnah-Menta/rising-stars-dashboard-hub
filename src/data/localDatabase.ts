
import { User } from '@/types/auth';

export const localDatabase = {
  users: [
    // Pupils
    {
      id: '1',
      email: 'john.doe@pupil.rising-stars.edu',
      password: 'pupil123',
      role: 'pupil' as const,
      name: 'John Doe',
      class: 'Grade 5A',
      avatar: '👦'
    },
    {
      id: '2',
      email: 'mary.smith@pupil.rising-stars.edu',
      password: 'pupil123',
      role: 'pupil' as const,
      name: 'Mary Smith',
      class: 'Grade 4B',
      avatar: '👧'
    },
    // Teachers
    {
      id: '3',
      email: 'jane.wilson@teacher.rising-stars.edu',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'Ms. Jane Wilson',
      subject: 'Mathematics',
      department: 'Primary Education',
      avatar: '👩‍🏫'
    },
    {
      id: '4',
      email: 'robert.brown@teacher.rising-stars.edu',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'Mr. Robert Brown',
      subject: 'Science',
      department: 'Primary Education',
      avatar: '👨‍🏫'
    },
    // Non-teaching Staff
    {
      id: '5',
      email: 'sarah.jones@staff.rising-stars.edu',
      password: 'staff123',
      role: 'non-teaching' as const,
      name: 'Sarah Jones',
      department: 'Administration',
      avatar: '👩‍💼'
    },
    {
      id: '6',
      email: 'mike.davis@staff.rising-stars.edu',
      password: 'staff123',
      role: 'non-teaching' as const,
      name: 'Mike Davis',
      department: 'Maintenance',
      avatar: '👨‍🔧'
    },
    // Parents
    {
      id: '7',
      email: 'alice.doe@parent.rising-stars.edu',
      password: 'parent123',
      role: 'parent' as const,
      name: 'Alice Doe',
      children: ['John Doe'],
      avatar: '👩'
    },
    {
      id: '8',
      email: 'mark.smith@parent.rising-stars.edu',
      password: 'parent123',
      role: 'parent' as const,
      name: 'Mark Smith',
      children: ['Mary Smith'],
      avatar: '👨'
    },
    // Administrators
    {
      id: '9',
      email: 'admin@rising-stars.edu',
      password: 'admin123',
      role: 'admin' as const,
      name: 'Dr. Patricia Anderson',
      department: 'School Administration',
      avatar: '👩‍💼'
    },
    {
      id: '10',
      email: 'principal@rising-stars.edu',
      password: 'admin123',
      role: 'admin' as const,
      name: 'Mr. James Thompson',
      department: 'Principal Office',
      avatar: '👨‍💼'
    }
  ] as User[]
};
