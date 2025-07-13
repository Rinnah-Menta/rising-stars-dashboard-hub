
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LogOut, Sun, Moon, User, Settings } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { profileData } = useProfile();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const getTitle = () => {
    if (!profileData?.title) return '';
    const title = profileData.title.toLowerCase();
    switch (title) {
      case 'teacher':
        return 'Tr.';
      case 'mr':
        return 'Mr.';
      case 'mrs':
        return 'Mrs.';
      case 'ms':
        return 'Ms.';
      default:
        return '';
    }
  };

  const getLastName = () => {
    return profileData?.lastName || '';
  };

  const getFirstName = () => {
    return profileData?.firstName || '';
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const getFormattedGender = () => {
    if (!profileData?.gender) return '';
    return capitalize(profileData.gender);
  };

  const getRoleDisplayName = () => {
    if (!user?.role) return '';
    return capitalize(user.role);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border px-2 sm:px-4 py-2 sm:py-3 shadow-sm">
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
              <h1 className="text-lg sm:text-xl font-bold text-primary hover:text-primary/80 transition-colors">Springing Stars</h1>
              <p className="text-xs sm:text-sm text-primary/70">Junior School</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Springing Stars</h1>
            </div>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-1 sm:space-x-3">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            
            <div className="flex items-center space-x-2 hidden md:flex">
              <span className="text-sm font-medium">
                {getTitle()} {getLastName()} ({getRoleDisplayName()})
              </span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                  <img 
                    src={profileData?.avatar || user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'} 
                    alt={getFirstName() || user.name} 
                    className="h-full w-full rounded-full object-cover"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};
