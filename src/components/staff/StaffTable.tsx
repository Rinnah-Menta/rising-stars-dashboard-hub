
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StaffTableActions } from './StaffTableActions';
import { StaffStatusBadge } from './StaffStatusBadge';
import { StaffTableDialogs } from './StaffTableDialogs';

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'teaching' | 'non-teaching';
  subject?: string;
  department: string;
  qualification: string;
  experience: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive' | 'suspended' | 'archived' | 'terminated';
  classesTaught?: string[];
  role?: string;
}

interface StaffTableProps {
  staff: StaffMember[];
  onEdit?: (staffMember: StaffMember) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onSuspend?: (id: string) => void;
  onTerminate?: (id: string) => void;
  onView: (staffMember: StaffMember) => void;
  readOnly?: boolean;
}

export const StaffTable: React.FC<StaffTableProps> = ({
  staff,
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
    staffName: string;
    staffId: string;
  }>({ open: false, type: 'delete', staffName: '', staffId: '' });

  const [accountActionDialog, setAccountActionDialog] = useState<{
    open: boolean;
    action: 'archive' | 'suspend' | 'terminate';
    staffMember: StaffMember | null;
  }>({ open: false, action: 'archive', staffMember: null });

  const handleDelete = (staffMember: StaffMember) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      staffName: staffMember.name,
      staffId: staffMember.id
    });
  };

  const handleArchive = (staffMember: StaffMember) => {
    setAccountActionDialog({
      open: true,
      action: 'archive',
      staffMember
    });
  };

  const handleSuspend = (staffMember: StaffMember) => {
    setAccountActionDialog({
      open: true,
      action: 'suspend',
      staffMember
    });
  };

  const handleTerminate = (staffMember: StaffMember) => {
    setAccountActionDialog({
      open: true,
      action: 'terminate',
      staffMember
    });
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No staff members found matching your criteria</p>
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
              <TableHead>Type</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Subject/Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell className="font-medium">{staffMember.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    staffMember.type === 'teaching' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {staffMember.type === 'teaching' ? 'Teaching' : 'Non-Teaching'}
                  </span>
                </TableCell>
                <TableCell>{staffMember.email}</TableCell>
                <TableCell>{staffMember.phone}</TableCell>
                <TableCell>{staffMember.subject || staffMember.role || 'N/A'}</TableCell>
                <TableCell>{staffMember.department}</TableCell>
                <TableCell>{staffMember.experience}</TableCell>
                <TableCell>
                  <StaffStatusBadge status={staffMember.status} />
                </TableCell>
                <TableCell className="text-right">
                  <StaffTableActions
                    staffMember={staffMember}
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

      <StaffTableDialogs
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
