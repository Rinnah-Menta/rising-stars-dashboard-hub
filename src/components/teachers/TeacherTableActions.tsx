
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
import { Teacher } from './TeachersTable';

interface TeacherTableActionsProps {
  teacher: Teacher;
  onView: (teacher: Teacher) => void;
  onEdit?: (teacher: Teacher) => void;
  onArchive: (teacher: Teacher) => void;
  onSuspend: (teacher: Teacher) => void;
  onDelete: (teacher: Teacher) => void;
  readOnly?: boolean;
}

export const TeacherTableActions: React.FC<TeacherTableActionsProps> = ({
  teacher,
  onView,
  onEdit,
  onArchive,
  onSuspend,
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
            <DropdownMenuItem onClick={() => onSuspend(teacher)}>
              <Clock className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(teacher)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(teacher)}
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
