
import { EventInput } from '@fullcalendar/core';
import { CalendarIcon, Clock, MapPin, User, BookOpen, FileText, Users, Briefcase } from 'lucide-react';

export interface CalendarEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  extendedProps: {
    location: string;
    type: 'exam' | 'event' | 'meeting' | 'assignment' | 'class';
    description?: string;
    teacherId: string;
    time: string;
  };
}

export const eventTypeConfig = {
  exam: { color: '#ef4444', icon: FileText, label: 'Exam' },
  event: { color: '#3b82f6', icon: CalendarIcon, label: 'Event' },
  meeting: { color: '#10b981', icon: Users, label: 'Meeting' },
  assignment: { color: '#f59e0b', icon: BookOpen, label: 'Assignment' },
  class: { color: '#8b5cf6', icon: User, label: 'Class' },
};

export const initialFormData = {
  id: '',
  title: '',
  date: '',
  time: '',
  location: '',
  type: 'class' as CalendarEvent['extendedProps']['type'],
  description: '',
  allDay: false,
};
