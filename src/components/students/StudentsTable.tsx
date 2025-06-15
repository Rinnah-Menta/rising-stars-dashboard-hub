
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2, Phone, Users, Lock } from 'lucide-react';
import { Student } from '@/hooks/useStudents';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface StudentsTableProps {
  students: Student[];
  onEdit?: (student: Student) => void;
  onDelete?: (id: string) => void;
  onView: (student: Student) => void;
  readOnly?: boolean;
}

export const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  onEdit,
  onDelete,
  onView,
  readOnly = false
}) => {
  const { toast } = useToast();
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    student: Student | null;
  }>({ open: false, student: null });

  const getFeesStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
    toast({
      title: "Calling...",
      description: `Dialing ${phone}`,
    });
  };

  const handleDeleteClick = (student: Student) => {
    setDeleteConfirmation({ open: true, student });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.student) {
      onDelete(deleteConfirmation.student.id);
      toast({
        title: "Student deleted",
        description: `${deleteConfirmation.student.name} has been removed from the system.`,
      });
    }
    setDeleteConfirmation({ open: false, student: null });
  };

  if (students.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No students found matching your criteria.</p>
        {readOnly && (
          <p className="text-sm mt-2">Make sure your profile includes the classes you teach.</p>
        )}
      </div>
    );
  }

  return (
    <>
      {readOnly && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-center gap-2">
          <Lock className="h-4 w-4 text-amber-600" />
          <span className="text-sm text-amber-700">
            Read-only mode: You can view student information but cannot make changes.
          </span>
        </div>
      )}
      
      <div className="overflow-x-auto">
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
              <TableRow key={student.id} className="hover:bg-gray-50">
                <TableCell className="font-mono text-sm font-medium">{student.id}</TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.class}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>{student.parent}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{student.phone}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCall(student.phone)}
                      className="h-6 w-6 p-0"
                    >
                      <Phone className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary" 
                    className={`${getFeesStatusColor(student.fees)} cursor-pointer`}
                  >
                    {student.fees}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(student)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {!readOnly && onEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(student)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    {!readOnly && onDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(student)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {!readOnly && (
        <ConfirmationDialog
          open={deleteConfirmation.open}
          onOpenChange={(open) => setDeleteConfirmation({ open, student: null })}
          title="Delete Student"
          description={`Are you sure you want to delete ${deleteConfirmation.student?.name}? This action cannot be undone.`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirm}
          variant="destructive"
          type="delete"
        />
      )}
    </>
  );
};
