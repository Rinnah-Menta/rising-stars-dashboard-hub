
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from '@/components/Navbar';
import { AppSidebar } from '@/components/AppSidebar';
import { Footer } from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div className="flex flex-1 pt-16">
          <AppSidebar />
          <main className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 overflow-x-auto">
            <div className="max-w-full mx-auto h-full">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};
