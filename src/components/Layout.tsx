
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
          <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-auto">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </SidebarProvider>
  );
};
