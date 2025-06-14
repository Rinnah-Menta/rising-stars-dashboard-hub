
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import { SidebarMenuContent } from '@/components/sidebar/SidebarMenuContent';

export const AppSidebar = () => {
  const { menuItems, roleLabel } = useSidebarMenu();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{roleLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuContent menuItems={menuItems} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
