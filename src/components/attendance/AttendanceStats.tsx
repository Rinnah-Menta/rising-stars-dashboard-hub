
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UserCheck, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Clock 
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

interface AttendanceStatsProps {
  records: AttendanceRecord[];
}

export const AttendanceStats: React.FC<AttendanceStatsProps> = ({ records }) => {
  const getAttendanceStats = () => {
    const total = records.length;
    const present = records.filter(r => r.status === 'present').length;
    const absent = records.filter(r => r.status === 'absent').length;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;

    return { total, present, absent, attendanceRate };
  };

  const stats = getAttendanceStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <UserCheck className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.present}</p>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <XCircle className="h-8 w-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold text-primary">{stats.attendanceRate}%</p>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
