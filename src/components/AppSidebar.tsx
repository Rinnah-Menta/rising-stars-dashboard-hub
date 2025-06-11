
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
import { Timetable } from '@/components/pages/Timetable';
import { Assignments } from '@/components/pages/Assignments';
import { Results } from '@/components/pages/Results';

export const AppSidebar = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

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
          { title: 'Gradebook', icon: BarChart3, id: 'gradebook' },
          { title: 'Attendance', icon: Clock, id: 'attendance' },
        ];
      case 'parent':
        return [
          ...commonItems,
          { title: 'My Children', icon: Users, id: 'children' },
          { title: 'Academic Progress', icon: BarChart3, id: 'progress' },
          { title: 'Fee Payments', icon: DollarSign, id: 'payments' },
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
    setCurrentPage(itemId);
    // In a real app, this would use React Router
    console.log(`Navigating to: ${itemId}`);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'timetable':
        return <Timetable />;
      case 'assignments':
        return <Assignments />;
      case 'results':
        return <Results />;
      default:
        return null;
    }
  };

  return (
    <>
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
                      onClick={() => handleMenuClick(item.id)}
                    >
                      <button className="flex items-center space-x-2 w-full">
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
      
      {/* Render page content when sidebar items are clicked */}
      {currentPage !== 'dashboard' && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <div className="p-4">
            <button 
              onClick={() => setCurrentPage('dashboard')}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
            {renderPageContent()}
          </div>
        </div>
      )}
    </>
  );
};
