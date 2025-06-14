import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
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

export const AppSidebar = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();

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
      notifications: { title: 'Notifications', icon: Bell, id: 'notifications' },
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
        'students', 
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
        'students', 
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

  const handleMenuClick = (itemId: string) => {
    const path = itemId === 'dashboard' ? '/' : `/${itemId}`;
    navigate(path);
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

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{getUserRoleLabel()}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    isActive={location.pathname === (item.id === 'dashboard' ? '/' : `/${item.id}`)}
                  >
                    <button 
                      className="flex items-center space-x-2 w-full"
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
