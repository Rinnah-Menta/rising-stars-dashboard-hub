
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  id: string;
}

interface SidebarMenuContentProps {
  menuItems: MenuItem[];
}

export const SidebarMenuContent: React.FC<SidebarMenuContentProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (itemId: string) => {
    const path = itemId === 'dashboard' ? '/' : `/${itemId}`;
    navigate(path);
  };

  return (
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
  );
};
