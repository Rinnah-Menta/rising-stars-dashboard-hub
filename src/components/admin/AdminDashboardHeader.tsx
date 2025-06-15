
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

interface AdminDashboardHeaderProps {
  title: string;
  lastName: string;
  activeView: string;
  onViewChange: (view: string) => void;
}

export const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({
  title,
  lastName,
  activeView,
  onViewChange
}) => {
  return (
    <AnimatedInView>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome back, {title} {lastName}!</h1>
            <p className="text-blue-100 mt-2">Complete oversight and control of the entire school system.</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant={activeView === 'overview' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => onViewChange('overview')}
              className="text-white border-white hover:bg-white/20"
            >
              Overview
            </Button>
            <Button 
              variant={activeView === 'control' ? 'secondary' : 'outline'} 
              size="sm"
              onClick={() => onViewChange('control')}
              className="text-white border-white hover:bg-white/20"
            >
              <Shield className="h-4 w-4 mr-2" />
              Control Panel
            </Button>
          </div>
        </div>
      </div>
    </AnimatedInView>
  );
};
