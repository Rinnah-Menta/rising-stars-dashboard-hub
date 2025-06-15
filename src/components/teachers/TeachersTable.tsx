
import React, { useState } from 'react';
import { MoreHorizontal, Eye, Edit, Archive, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AccountActionDialog } from '@/components/ui/account-action-dialog';
import { useToast } from '@/hooks/use-toast';

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
  status: 'active' | 'on-leave' | 'inactive';
  classesTaught?: string[];
}

interface TeachersTableProps {
  teachers: Teacher[];
  onEdit?: (teacher: Teacher) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onView: (teacher: Teacher) => void;
  readOnly?: boolean;
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  teachers,
  onEdit,
  onDelete,
  onArchive,
  onView,
  readOnly = false
}) => {
  const { toast } = useToast();
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'delete';
    teacherName: string;
    teacherId: string;
  }>({ open: false, type: 'delete', teacherName: '', teacherId: '' });

  const [accountActionDialog, setAccountActionDialog] = useState<{
    open: boolean;
    action: 'archive' | 'suspend';
    teacher: Teacher | null;
  }>({ open: false, action: 'archive', teacher: null });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'on-leave':
        return 'bg-yellow-100 text-yellow-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(confirmDialog.teacherId);
      toast({
        title: "Teacher Deleted",
        description: `${confirmDialog.teacherName} has been removed from the system.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({ open: false, type: 'delete', teacherName: '', teacherId: '' });
  };

  const handleAccountAction = (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => {
    const { action, teacher } = accountActionDialog;
    
    if (action === 'archive' && onArchive && teacher) {
      onArchive(teacher.id);
      toast({
        title: "Teacher Archived",
        description: `${teacher.name} has been archived. Reason: ${data.reason}`,
      });
    } else if (action === 'suspend' && teacher) {
      // For now, we'll just show a toast. In a real app, this would update the teacher status
      const endDateText = data.suspensionEndDate ? ` until ${data.suspensionEndDate.toLocaleDateString()}` : '';
      toast({
        title: "Teacher Suspended",
        description: `${teacher.name} has been suspended${endDateText}. Reason: ${data.reason}`,
      });
    }
    
    setAccountActionDialog({ open: false, action: 'archive', teacher: null });
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
                  <Badge variant="secondary" className={getStatusColor(teacher.status)}>
                    {teacher.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                      <DropdownMenuItem onClick={() => onView(teacher)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {!readOnly && onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(teacher)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {!readOnly && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSuspend(teacher)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(teacher)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(teacher)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title="Delete Teacher"
        description={`Are you sure you want to permanently delete ${confirmDialog.teacherName}? This action cannot be undone and will remove all teacher records.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        variant="destructive"
        type="delete"
      />

      <AccountActionDialog
        open={accountActionDialog.open}
        onOpenChange={(open) => setAccountActionDialog({ ...accountActionDialog, open })}
        action={accountActionDialog.action}
        personName={accountActionDialog.teacher?.name || ''}
        personType="teacher"
        onConfirm={handleAccountAction}
      />
    </>
  );
};
