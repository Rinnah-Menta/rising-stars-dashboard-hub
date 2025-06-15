
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
import { Student } from '@/hooks/useStudents';
import { useToast } from '@/hooks/use-toast';

interface StudentsTableProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
  onArchive?: (id: string) => void;
  onView: (student: Student) => void;
  readOnly?: boolean;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
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
    studentName: string;
    studentId: string;
  }>({ open: false, type: 'delete', studentName: '', studentId: '' });

  const [accountActionDialog, setAccountActionDialog] = useState<{
    open: boolean;
    action: 'archive' | 'suspend';
    student: Student | null;
  }>({ open: false, action: 'archive', student: null });

  const getFeesStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDelete = (student: Student) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      studentName: student.name,
      studentId: student.id
    });
  };

  const handleArchive = (student: Student) => {
    setAccountActionDialog({
      open: true,
      action: 'archive',
      student
    });
  };

  const handleSuspend = (student: Student) => {
    setAccountActionDialog({
      open: true,
      action: 'suspend',
      student
    });
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(confirmDialog.studentId);
      toast({
        title: "Student Deleted",
        description: `${confirmDialog.studentName} has been removed from the system.`,
        variant: "destructive"
      });
    }
    setConfirmDialog({ open: false, type: 'delete', studentName: '', studentId: '' });
  };

  const handleAccountAction = (data: {
    reason: string;
    customReason?: string;
    suspensionEndDate?: Date;
    nextSteps?: string;
  }) => {
    const { action, student } = accountActionDialog;
    
    if (action === 'archive' && onArchive && student) {
      onArchive(student.id);
      toast({
        title: "Student Archived",
        description: `${student.name} has been archived. Reason: ${data.reason}`,
      });
    } else if (action === 'suspend' && student) {
      // For now, we'll just show a toast. In a real app, this would update the student status
      const endDateText = data.suspensionEndDate ? ` until ${data.suspensionEndDate.toLocaleDateString()}` : '';
      toast({
        title: "Student Suspended",
        description: `${student.name} has been suspended${endDateText}. Reason: ${data.reason}`,
      });
    }
    
    setAccountActionDialog({ open: false, action: 'archive', student: null });
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No students found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Parent/Guardian</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Fees Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.parent}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getFeesStatusColor(student.fees)}>
                    {student.fees}
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
                      <DropdownMenuItem onClick={() => onView(student)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      {!readOnly && onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(student)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {!readOnly && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleSuspend(student)}>
                            <Clock className="mr-2 h-4 w-4" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleArchive(student)}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(student)}
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
        title="Delete Student"
        description={`Are you sure you want to permanently delete ${confirmDialog.studentName}? This action cannot be undone and will remove all student records.`}
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
        personName={accountActionDialog.student?.name || ''}
        personType="student"
        onConfirm={handleAccountAction}
      />
    </>
  );
};
