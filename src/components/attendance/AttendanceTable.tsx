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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

interface AttendanceTableProps {
  records: AttendanceRecord[];
  selectedDate: Date;
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Students Attendance ({records.length})
          </CardTitle>
          
          {canManageAttendance && selectedStudents.length > 0 && onBulkAttendance && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedStudents.length} selected
              </span>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-green-600 border-green-600 hover:bg-green-50"
                onClick={() => onBulkAttendance('present')}
              >
                <UserCheck className="h-4 w-4 mr-1" />
                Mark Present
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-red-600 border-red-600 hover:bg-red-50"
                onClick={() => onBulkAttendance('absent')}
              >
                <UserX className="h-4 w-4 mr-1" />
                Mark Absent
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {canManageAttendance && onStudentSelect && (
                  <TableHead className="w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={onSelectAll}
                      aria-label="Select all students"
                      className={someSelected ? "data-[state=checked]:bg-primary" : ""}
                    />
                  </TableHead>
                )}
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time In</TableHead>
                {canManageAttendance && <TableHead>Quick Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={canManageAttendance ? 6 : 5} 
                    className="text-center py-8 text-muted-foreground"
                  >
                    No students found for the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                records.map((record) => (
                  <TableRow key={record.studentId}>
                    {canManageAttendance && onStudentSelect && (
                      <TableCell>
                        <Checkbox
                          checked={selectedStudents.includes(record.studentId)}
                          onCheckedChange={() => onStudentSelect(record.studentId)}
                          aria-label={`Select ${record.studentName}`}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage 
                            src={`https://fresh-teacher-uganda.github.io/talk-of-the-day/src/assets/photos/${encodeURIComponent(record.studentName)}.JPG`} 
                            alt={record.studentName}
                          />
                          <AvatarFallback>
                            {record.studentName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.studentName}</div>
                          <div className="text-sm text-muted-foreground">ID: {record.studentId}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{record.class}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {record.timeIn || '-'}
                      </span>
                    </TableCell>
                    {canManageAttendance && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={record.status === 'present' ? 'default' : 'outline'}
                            className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                            onClick={() => onStatusChange(record.studentId, 'present')}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={record.status === 'absent' ? 'default' : 'outline'}
                            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => onStatusChange(record.studentId, 'absent')}
                          >
                            <XCircle className="h-3 w-3 mr-1" />
                            Absent
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};