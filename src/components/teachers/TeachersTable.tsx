
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TeacherTableActions } from './TeacherTableActions';
import { TeacherStatusBadge } from './TeacherStatusBadge';
import { TeacherTableDialogs } from './TeacherTableDialogs';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  qualification: string;
  experience: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive' | 'suspended' | 'archived' | 'terminated';
  classesTaught?: string[];
}

interface TeachersTableProps {
  teachers: Teacher[];
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onTerminate?: (id: string) => void;
  onView: (teacher: Teacher) => void;
  readOnly?: boolean;
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  teachers,
  onEdit,
  onDelete,
  onArchive,
  onSuspend,
  onTerminate,
  onView,
  readOnly = false
}) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'delete';
    teacherName: string;
    teacherId: string;
  }>({ open: false, type: 'delete', teacherName: '', teacherId: '' });

  const [accountActionDialog, setAccountActionDialog] = useState<{
    open: boolean;
    action: 'archive' | 'suspend' | 'terminate';
    teacher: Teacher | null;
  }>({ open: false, action: 'archive', teacher: null });

  const handleDelete = (teacher: Teacher) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      teacherName: teacher.name,
      teacherId: teacher.id
    });
  };

  const handleArchive = (teacher: Teacher) => {
    setAccountActionDialog({
      open: true,
      action: 'archive',
      teacher
    });
  };

  const handleSuspend = (teacher: Teacher) => {
    setAccountActionDialog({
      open: true,
      action: 'suspend',
      teacher
    });
  };

  const handleTerminate = (teacher: Teacher) => {
    setAccountActionDialog({
      open: true,
      action: 'terminate',
      teacher
    });
  };

  if (teachers.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No teachers found matching your criteria</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="font-medium">{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.phone}</TableCell>
                <TableCell>{teacher.subject}</TableCell>
                <TableCell>{teacher.department}</TableCell>
                <TableCell>{teacher.experience}</TableCell>
                <TableCell>
                  <TeacherStatusBadge status={teacher.status} />
                </TableCell>
                <TableCell className="text-right">
                  <TeacherTableActions
                    teacher={teacher}
                    onView={onView}
                    onEdit={onEdit}
                    onArchive={handleArchive}
                    onSuspend={handleSuspend}
                    onTerminate={handleTerminate}
                    onDelete={handleDelete}
                    readOnly={readOnly}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TeacherTableDialogs
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        accountActionDialog={accountActionDialog}
        setAccountActionDialog={setAccountActionDialog}
        onDelete={onDelete}
        onArchive={onArchive}
        onSuspend={onSuspend}
        onTerminate={onTerminate}
      />
    </>
  );
};
