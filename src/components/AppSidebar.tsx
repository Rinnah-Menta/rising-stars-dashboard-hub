
import React from 'react';
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
  Clock
} from 'lucide-react';

export const AppSidebar = () => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const commonItems = [
      { title: 'Dashboard', icon: Home, url: '#' },
      { title: 'Profile', icon: User, url: '#' },
      { title: 'Calendar', icon: Calendar, url: '#' },
      { title: 'Reports', icon: FileText, url: '#' },
    ];

    switch (user?.role) {
      case 'pupil':
        return [
          ...commonItems,
          { title: 'My Classes', icon: BookOpen, url: '#' },
          { title: 'Assignments', icon: FileText, url: '#' },
          { title: 'Results', icon: BarChart3, url: '#' },
          { title: 'Timetable', icon: Clock, url: '#' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { title: 'My Classes', icon: GraduationCap, url: '#' },
          { title: 'Students', icon: Users, url: '#' },
          { title: 'Assignments', icon: FileText, url: '#' },
          { title: 'Gradebook', icon: BarChart3, url: '#' },
          { title: 'Attendance', icon: Clock, url: '#' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { title: 'My Children', icon: Users, url: '#' },
          { title: 'Academic Progress', icon: BarChart3, url: '#' },
          { title: 'Fee Payments', icon: DollarSign, url: '#' },
          { title: 'Communication', icon: FileText, url: '#' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { title: 'Students', icon: GraduationCap, url: '#' },
          { title: 'Teachers', icon: Users, url: '#' },
          { title: 'Classes', icon: BookOpen, url: '#' },
          { title: 'Finances', icon: DollarSign, url: '#' },
          { title: 'Analytics', icon: BarChart3, url: '#' },
          { title: 'Settings', icon: Settings, url: '#' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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
