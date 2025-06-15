
import React from 'react';
import { MoreHorizontal, Eye, Edit, Archive, Trash2, Clock, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parent: string;
  phone: string;
  fees: string;
  status: 'active' | 'inactive' | 'suspended' | 'archived' | 'expelled';
}

interface StudentTableActionsProps {
  student: Student;
  onView: (student: Student) => void;
  onEdit?: (student: Student) => void;
  onArchive: (student: Student) => void;
  onSuspend: (student: Student) => void;
  onExpel: (student: Student) => void;
  onDelete: (student: Student) => void;
  readOnly?: boolean;
}

export const StudentTableActions: React.FC<StudentTableActionsProps> = ({
  student,
  onView,
  onEdit,
  onArchive,
  onSuspend,
  onExpel,
  onDelete,
  readOnly = false
}) => {
  return (
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
            <DropdownMenuItem onClick={() => onSuspend(student)}>
              <Clock className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(student)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onExpel(student)}
              className="text-red-600"
            >
              <UserX className="mr-2 h-4 w-4" />
              Expel
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(student)}
              className="text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
