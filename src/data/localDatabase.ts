
import { User } from '@/types/auth';

export const localDatabase = {
  users: [
    {
      id: '1',
      email: 'john.mukasa@pupil.springingstars.ac.ug',
      password: 'pupil123',
      role: 'pupil' as const,
      name: 'John Mukasa',
      class: 'Primary 6',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: '2',
      email: 'sarah.nambi@teacher.springingstars.ac.ug',
      password: 'teacher123',
      role: 'teacher' as const,
      name: 'Sarah Nambi',
      subject: 'Mathematics & Science',
      class: 'Primary 5 & 6',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: '3',
      email: 'david.kato@staff.springingstars.ac.ug',
      password: 'staff123',
      role: 'non-teaching' as const,
      name: 'David Kato',
      department: 'Administration',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: '4',
      email: 'grace.nalongo@parent.springingstars.ac.ug',
      password: 'parent123',
      role: 'parent' as const,
      name: 'Grace Nalongo',
      children: ['John Mukasa', 'Mary Nakato'],
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b123?w=400&h=400&fit=crop&crop=face'
    },
    {
      id: '5',
      email: 'admin@springingstars.ac.ug',
      password: 'admin123',
      role: 'admin' as const,
      name: 'Moses Ssebunya',
      department: 'School Administration',
      avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop&crop=face'
    }
  ] as User[]
};
