
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useNotifications } from '@/hooks/useNotifications';
import { 
  Home, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  BarChart3,
  Settings,
  User,
  DollarSign,
  Clock,
  Award,
  MessageSquare,
  ClipboardList,
  UserCheck,
  Building,
  Bell,
  HelpCircle,
  Book
} from 'lucide-react';

export const useSidebarMenu = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const { unreadCount } = useNotifications();

  const isBooleanTrue = (value: boolean | string | undefined): boolean => {
    return value === true || value === 'true';
  };

  const shouldShowReports = () => {
    if (!user || !profileData) return false;
    
    // Admins always see reports
    if (user.role === 'admin') return true;
    
    // Teachers see reports if they are class teachers
    if (user.role === 'teacher' && isBooleanTrue(profileData.isClassTeacher)) {
      return true;
    }
    
    // Non-teaching staff see reports if they are department heads
    if (user.role === 'non-teaching' && isBooleanTrue(profileData.isDepartmentHead)) {
      return true;
    }
    
    return false;
  };

  const shouldShowStudents = () => {
    if (!user || !profileData) return false;
    
    // Admins always see students
    if (user.role === 'admin') return true;
    
    // Teachers see students if they are class teachers
    if (user.role === 'teacher' && isBooleanTrue(profileData.isClassTeacher)) {
      return true;
    }
    
    // Parents and non-teaching staff don't see students
    return false;
  };

  const getUserRoleLabel = () => {
    switch (user?.role) {
      case 'pupil': return 'Student Portal';
      case 'teacher': return 'Teacher Portal';
      case 'parent': return 'Parent Portal';
      case 'admin': return 'Admin Portal';
      case 'non-teaching': return 'Staff Portal';
      default: return 'Portal';
    }
  };

  const getMenuItems = () => {
    const allItems = {
      dashboard: { title: 'Dashboard', icon: Home, id: 'dashboard' },
      profile: { title: 'Profile', icon: User, id: 'profile' },
      calendar: { title: 'Calendar', icon: Calendar, id: 'calendar' },
      reports: { title: 'Reports', icon: FileText, id: 'reports' },
      classes: { title: 'My Classes', icon: BookOpen, id: 'classes' },
      assignments: { title: 'Assignments', icon: ClipboardList, id: 'assignments' },
      results: { title: 'Results', icon: BarChart3, id: 'results' },
      timetable: { title: 'Timetable', icon: Clock, id: 'timetable' },
      students: { title: 'Students', icon: Users, id: 'students' },
      teachers: { title: 'Teachers', icon: UserCheck, id: 'teachers' },
      finances: { title: 'Finances', icon: DollarSign, id: 'finances' },
      analytics: { title: 'Analytics', icon: BarChart3, id: 'analytics' },
      settings: { title: 'Settings', icon: Settings, id: 'settings' },
      communication: { title: 'Communication', icon: MessageSquare, id: 'communication' },
      library: { title: 'Library', icon: Book, id: 'library' },
      attendance: { title: 'Attendance', icon: UserCheck, id: 'attendance' },
      notifications: { 
        title: 'Notifications', 
        icon: Bell, 
        id: 'notifications',
        badge: user?.role === 'admin' ? unreadCount : undefined
      },
      help: { title: 'Help & Support', icon: HelpCircle, id: 'help' },
      facilities: { title: 'Facilities', icon: Building, id: 'facilities' },
      grades: { title: 'My Grades', icon: Award, id: 'grades' },
    };

    const rolesConfig = {
      pupil: [
        'dashboard', 
        'profile', 
        'calendar', 
        'classes', 
        'assignments', 
        'grades', 
        'timetable', 
        'library', 
        'communication', 
        'notifications', 
        'help'
      ],
      teacher: [
        'dashboard', 
        'profile', 
        'calendar', 
        ...(shouldShowReports() ? ['reports'] : []),
        'classes', 
        ...(shouldShowStudents() ? ['students'] : []),
        'assignments', 
        'results', 
        'timetable', 
        'attendance', 
        'communication', 
        'notifications', 
        'help'
      ],
      parent: [
        'dashboard', 
        'profile', 
        'calendar', 
        'results', 
        'finances', 
        'communication', 
        'notifications', 
        'help'
      ],
      admin: [
        'dashboard', 
        'profile', 
        'calendar', 
        'reports', 
        'students', 
        'teachers', 
        'classes', 
        'finances', 
        'analytics', 
        'settings', 
        'attendance', 
        'facilities', 
        'communication', 
        'notifications'
      ],
      'non-teaching': [
        'dashboard', 
        'profile', 
        'calendar', 
        ...(shouldShowReports() ? ['reports'] : []),
        'facilities', 
        'communication', 
        'notifications', 
        'help', 
        'settings'
      ],
    };

    const userRole = user?.role || 'pupil';
    const accessibleItems = rolesConfig[userRole] || rolesConfig.pupil;

    return accessibleItems.map(id => allItems[id]).filter(Boolean);
  };

  return {
    menuItems: getMenuItems(),
    roleLabel: getUserRoleLabel()
  };
};
