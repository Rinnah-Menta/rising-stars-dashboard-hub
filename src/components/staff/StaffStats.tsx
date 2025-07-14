
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Clock, Archive } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { StaffMember } from './StaffTable';

interface StaffStatsProps {
  staff: StaffMember[];
  loading?: boolean;
}

export const StaffStats: React.FC<StaffStatsProps> = ({ staff, loading = false }) => {
  const totalStaff = staff.length;
  const activeStaff = staff.filter(s => s.status === 'active').length;
  const onLeaveStaff = staff.filter(s => s.status === 'on-leave').length;
  const inactiveStaff = staff.filter(s => s.status === 'inactive' || s.status === 'archived').length;
  const teachingStaff = staff.filter(s => s.type === 'teaching').length;
  const nonTeachingStaff = staff.filter(s => s.type === 'non-teaching').length;

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStaff}</div>
          <p className="text-xs text-muted-foreground">
            {teachingStaff} Teaching, {nonTeachingStaff} Non-Teaching
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{activeStaff}</div>
          <p className="text-xs text-muted-foreground">
            Currently working
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">On Leave</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{onLeaveStaff}</div>
          <p className="text-xs text-muted-foreground">
            Temporarily absent
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          <Archive className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-600">{inactiveStaff}</div>
          <p className="text-xs text-muted-foreground">
            Archived or inactive
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
