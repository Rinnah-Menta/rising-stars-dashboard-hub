
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
    <AnimatedInView className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Admin Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3">
          <Button className="h-auto p-4 flex-col space-y-2">
            <Users className="h-6 w-6" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={onControlPanelClick}>
            <Shield className="h-6 w-6" />
            <span className="text-sm">System Control</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-sm">All Reports</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <Bell className="h-6 w-6" />
            <span className="text-sm">Notifications</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <School className="h-6 w-6" />
            <span className="text-sm">School Settings</span>
          </Button>
          <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
            <DollarSign className="h-6 w-6" />
            <span className="text-sm">Financial Control</span>
          </Button>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
