
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  FileText,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationBadge } from '@/components/ui/notification-badge';

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
  const { pendingCount } = useNotifications();

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                Welcome, {title} {lastName}
              </h1>
              <p className="text-blue-100 mt-1">
                Administrator Dashboard - Manage your school efficiently
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 w-fit">
                <Users className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-100 hover:bg-green-500/30 w-fit">
                <TrendingUp className="h-3 w-3 mr-1" />
                System Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Toggle */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button
          variant={activeView === 'overview' ? 'default' : 'outline'}
          onClick={() => onViewChange('overview')}
          className="flex items-center space-x-2"
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Overview</span>
        </Button>
        
        <div className="relative">
          <Button
            variant={activeView === 'control' ? 'default' : 'outline'}
            onClick={() => onViewChange('control')}
            className="flex items-center space-x-2 relative"
          >
            <Settings className="h-4 w-4" />
            <span>Control Panel</span>
          </Button>
          <NotificationBadge count={pendingCount} />
        </div>

        <Button
          variant="outline"
          className="flex items-center space-x-2"
        >
          <FileText className="h-4 w-4" />
          <span>Reports</span>
        </Button>
      </div>

      {pendingCount > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-3 sm:p-4">
            <div className="flex items-center space-x-3 text-orange-800">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-medium text-sm">
                  {pendingCount} pending {pendingCount === 1 ? 'action' : 'actions'} require your attention
                </p>
                <p className="text-xs text-orange-600 mt-1">
                  Check the Control Panel to review and approve pending activities
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
