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


interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent';
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Users className="h-5 w-5" />
            Students Attendance ({records.length})
          </CardTitle>
          
          {canManageAttendance && selectedStudents.length > 0 && onBulkAttendance && (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedStudents.length} selected
              </span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-green-600 border-green-600 hover:bg-green-50 text-xs sm:text-sm"
                  onClick={() => onBulkAttendance('present')}
                >
                  <UserCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Mark Present
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-red-600 border-red-600 hover:bg-red-50 text-xs sm:text-sm"
                  onClick={() => onBulkAttendance('absent')}
                >
                  <UserX className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Mark Absent
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {canManageAttendance && onStudentSelect && (
                  <TableHead className="w-8 sm:w-12">
                    <Checkbox
                      checked={allSelected}
                      onCheckedChange={onSelectAll}
                      aria-label="Select all students"
                      className={someSelected ? "data-[state=checked]:bg-primary" : ""}
                    />
                  </TableHead>
                )}
                <TableHead className="min-w-[200px]">Student</TableHead>
                <TableHead className="hidden sm:table-cell">Class</TableHead>
                <TableHead>Status</TableHead>
                {canManageAttendance && <TableHead className="min-w-[180px]">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.length === 0 ? (
                <TableRow>
                  <TableCell 
                    colSpan={canManageAttendance ? 5 : 4} 
                    className="text-center py-8 text-muted-foreground"
                  >
                    No students found for the selected class.
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
                      <div>
                        <div className="font-medium text-sm sm:text-base">{record.studentName}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">ID: {record.studentId}</div>
                        <div className="text-xs text-muted-foreground sm:hidden">{record.class}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline" className="text-xs">{record.class}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    {canManageAttendance && (
                      <TableCell>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-2">
                          <Button
                            size="sm"
                            variant={record.status === 'present' ? 'default' : 'outline'}
                            className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 text-xs sm:text-sm w-full sm:w-auto"
                            onClick={() => onStatusChange(record.studentId, 'present')}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={record.status === 'absent' ? 'default' : 'outline'}
                            className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 text-xs sm:text-sm w-full sm:w-auto"
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