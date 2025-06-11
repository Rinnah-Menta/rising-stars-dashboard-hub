
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Bell, Settings } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogoClick = () => {
    // Reload the page to go back to dashboard
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-2 sm:px-4 py-2 sm:py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <SidebarTrigger />
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={handleLogoClick}>
            <img 
              src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
              alt="Springing Stars Logo" 
              className="h-8 w-8 sm:h-10 sm:w-10 object-contain hover:opacity-80 transition-opacity"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-blue-900 hover:text-blue-700 transition-colors">Springing Stars</h1>
              <p className="text-xs sm:text-sm text-blue-700">Junior School</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-blue-900 hover:text-blue-700 transition-colors">Springing Stars</h1>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-1 sm:space-x-3">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 hidden md:flex">
              <img 
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                alt={user.name} 
                className="h-6 w-6 sm:h-8 sm:w-8 rounded-full object-cover"
              />
              <span className="text-xs sm:text-sm font-medium truncate max-w-20 sm:max-w-none">{user.name}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout} className="text-xs sm:text-sm">
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-2" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
