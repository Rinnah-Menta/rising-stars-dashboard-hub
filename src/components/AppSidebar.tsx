
import React, { useState } from 'react';
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
import { useNavigation } from '@/contexts/NavigationContext';
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
  const { currentPage, setCurrentPage } = useNavigation();

  const getMenuItems = () => {
    const commonItems = [
      { title: 'Dashboard', icon: Home, id: 'dashboard' },
      { title: 'Profile', icon: User, id: 'profile' },
      { title: 'Calendar', icon: Calendar, id: 'calendar' },
      { title: 'Reports', icon: FileText, id: 'reports' },
    ];

    switch (user?.role) {
      case 'pupil':
        return [
          ...commonItems,
          { title: 'My Classes', icon: BookOpen, id: 'classes' },
          { title: 'Assignments', icon: FileText, id: 'assignments' },
          { title: 'Results', icon: BarChart3, id: 'results' },
          { title: 'Timetable', icon: Clock, id: 'timetable' },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { title: 'My Classes', icon: GraduationCap, id: 'classes' },
          { title: 'Students', icon: Users, id: 'students' },
          { title: 'Assignments', icon: FileText, id: 'assignments' },
          { title: 'Gradebook', icon: BarChart3, id: 'results' },
          { title: 'Attendance', icon: Clock, id: 'timetable' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { title: 'My Children', icon: Users, id: 'students' },
          { title: 'Academic Progress', icon: BarChart3, id: 'results' },
          { title: 'Fee Payments', icon: DollarSign, id: 'finances' },
          { title: 'Communication', icon: MessageSquare, id: 'communication' },
        ];
      case 'admin':
        return [
          ...commonItems,
          { title: 'Students', icon: GraduationCap, id: 'students' },
          { title: 'Teachers', icon: Users, id: 'teachers' },
          { title: 'Classes', icon: BookOpen, id: 'classes' },
          { title: 'Finances', icon: DollarSign, id: 'finances' },
          { title: 'Analytics', icon: BarChart3, id: 'analytics' },
          { title: 'Settings', icon: Settings, id: 'settings' },
        ];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  const handleMenuClick = (itemId: string) => {
    console.log(`Navigating to: ${itemId}`);
    setCurrentPage(itemId);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentPage === item.id}
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
