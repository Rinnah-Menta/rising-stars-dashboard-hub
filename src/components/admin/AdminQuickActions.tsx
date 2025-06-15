
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, Bell, School, DollarSign, Shield } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

interface AdminQuickActionsProps {
  onControlPanelClick: () => void;
}

export const AdminQuickActions: React.FC<AdminQuickActionsProps> = ({ onControlPanelClick }) => {
  return (
    <AnimatedInView>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Admin Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Button className="h-auto p-4 flex-col space-y-2 text-xs">
              <Users className="h-5 w-5" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-xs" onClick={onControlPanelClick}>
              <Shield className="h-5 w-5" />
              <span>System Control</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-xs">
              <BookOpen className="h-5 w-5" />
              <span>All Reports</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-xs">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-xs">
              <School className="h-5 w-5" />
              <span>School Settings</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col space-y-2 text-xs">
              <DollarSign className="h-5 w-5" />
              <span>Financial Control</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
