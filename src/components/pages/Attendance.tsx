
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AnimatedInView from '@/components/AnimatedInView';
import { exportAttendanceToCSV } from '@/utils/attendanceExport';
import { AttendanceStats } from '@/components/attendance/AttendanceStats';
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { useAttendanceData } from '@/hooks/useAttendanceData';
import { format } from 'date-fns';

export const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { attendanceRecords, updateAttendanceStatus } = useAttendanceData();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleQuickAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    updateAttendanceStatus(studentId, status);
    
    const student = attendanceRecords.find(r => r.studentId === studentId);
    toast({
      title: 'Attendance Updated',
      description: `${student?.studentName} marked as ${status}`,
    });
  };

  const handleExport = () => {
    const filteredData = filteredRecords;
    
    if (filteredData.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'No attendance records match your current filters.',
        variant: 'destructive',
      });
      return;
    }

    exportAttendanceToCSV(filteredData);
    
    toast({
      title: 'Export Successful',
      description: `Exported ${filteredData.length} attendance records to CSV.`,
    });
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || record.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const canManageAttendance = user?.role === 'admin' || user?.role === 'teacher';

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedInView>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-gray-600">
              Quick attendance marking for {format(selectedDate, 'MMMM dd, yyyy')}
            </p>
          </div>
          {canManageAttendance && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </AnimatedInView>

      {/* Stats Cards */}
      <AnimatedInView>
        <AttendanceStats records={filteredRecords} />
      </AnimatedInView>

      {/* Filters */}
      <AnimatedInView>
        <AttendanceFilters
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </AnimatedInView>

      {/* Quick Attendance Table */}
      <AnimatedInView>
        <AttendanceTable
          records={filteredRecords}
          selectedDate={selectedDate}
          canManageAttendance={canManageAttendance}
          onStatusChange={handleQuickAttendance}
        />
      </AnimatedInView>
    </div>
  );
};
