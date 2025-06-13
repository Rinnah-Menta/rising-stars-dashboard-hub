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
  MessageSquare
} from 'lucide-react';

export const AppSidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    const allItems = {
      dashboard: { title: 'Dashboard', icon: Home, id: 'dashboard' },
      profile: { title: 'Profile', icon: User, id: 'profile' },
      calendar: { title: 'Calendar', icon: Calendar, id: 'calendar' },
      reports: { title: 'Reports', icon: FileText, id: 'reports' },
      classes: { title: 'My Classes', icon: BookOpen, id: 'classes' },
      assignments: { title: 'Assignments', icon: FileText, id: 'assignments' },
      results: { title: 'Results', icon: BarChart3, id: 'results' },
      timetable: { title: 'Timetable', icon: Clock, id: 'timetable' },
      students: { title: 'Students', icon: Users, id: 'students' },
      teachers: { title: 'Teachers', icon: Users, id: 'teachers' },
      finances: { title: 'Finances', icon: DollarSign, id: 'finances' },
      analytics: { title: 'Analytics', icon: BarChart3, id: 'analytics' },
      settings: { title: 'Settings', icon: Settings, id: 'settings' },
      communication: { title: 'Communication', icon: MessageSquare, id: 'communication' },
    };

    const rolesConfig = {
      pupil: ['dashboard', 'profile', 'calendar', 'reports', 'classes', 'assignments', 'results', 'timetable'],
      teacher: ['dashboard', 'profile', 'calendar', 'reports', 'classes', 'students', 'assignments', 'results', 'timetable'],
      parent: ['dashboard', 'profile', 'calendar', 'reports', 'students', 'results', 'finances', 'communication'],
      admin: ['dashboard', 'profile', 'calendar', 'reports', 'students', 'teachers', 'classes', 'finances', 'analytics', 'settings'],
      'non-teaching': ['dashboard', 'profile', 'calendar', 'reports', 'settings'],
    };

    const userRole = user?.role || 'pupil';
    const accessibleItems = rolesConfig[userRole] || rolesConfig.pupil;

    return accessibleItems.map(id => allItems[id]);
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (itemId: string) => {
    const path = itemId === 'dashboard' ? '/' : `/${itemId}`;
    navigate(path);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
