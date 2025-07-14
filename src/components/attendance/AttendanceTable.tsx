import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  CheckCircle, 
  XCircle, 
  Users,
  UserCheck,
  UserX
} from 'lucide-react';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

interface AttendanceTableProps {
  records: AttendanceRecord[];
  canManageAttendance: boolean;
  onStatusChange: (studentId: string, status: AttendanceRecord['status']) => void;
  selectedStudents?: string[];
  onStudentSelect?: (studentId: string) => void;
  onSelectAll?: () => void;
  onBulkAttendance?: (status: 'present' | 'absent') => void;
}

const getStatusBadge = (status: AttendanceRecord['status']) => {
  switch (status) {
    case 'present':
      return (
        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="h-3 w-3 mr-1" />
          Present
        </Badge>
      );
    case 'absent':
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="h-3 w-3 mr-1" />
          Absent
        </Badge>
      );
    default:
      return null;
  }
};

export const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  records, 
  canManageAttendance, 
  onStatusChange,
  selectedStudents = [],
  onStudentSelect,
  onSelectAll,
  onBulkAttendance
}) => {
  const allSelected = selectedStudents.length === records.length && records.length > 0;
  const someSelected = selectedStudents.length > 0 && selectedStudents.length < records.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Quick Attendance - {format(selectedDate, 'MMMM dd, yyyy')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Current Status</TableHead>
              {canManageAttendance && <TableHead>Quick Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.studentId}</TableCell>
                <TableCell>{record.studentName}</TableCell>
                <TableCell>{record.class}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                {canManageAttendance && (
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant={record.status === 'present' ? 'default' : 'outline'}
                        onClick={() => onStatusChange(record.studentId, 'present')}
                        className="text-xs px-2 py-1"
                      >
                        Present
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'absent' ? 'destructive' : 'outline'}
                        onClick={() => onStatusChange(record.studentId, 'absent')}
                        className="text-xs px-2 py-1"
                      >
                        Absent
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'late' ? 'secondary' : 'outline'}
                        onClick={() => onStatusChange(record.studentId, 'late')}
                        className="text-xs px-2 py-1"
                      >
                        Late
                      </Button>
                      <Button
                        size="sm"
                        variant={record.status === 'excused' ? 'outline' : 'outline'}
                        onClick={() => onStatusChange(record.studentId, 'excused')}
                        className="text-xs px-2 py-1"
                      >
                        Excused
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {records.length === 0 && (
          <div className="text-center py-8">
            <UserX className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No students found</p>
            <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};