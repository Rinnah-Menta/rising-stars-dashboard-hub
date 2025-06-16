
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
import { StaffMember } from './StaffTable';

interface StaffTableActionsProps {
  staffMember: StaffMember;
  onView: (staffMember: StaffMember) => void;
  onEdit?: (staffMember: StaffMember) => void;
  onArchive: (staffMember: StaffMember) => void;
  onSuspend: (staffMember: StaffMember) => void;
  onTerminate: (staffMember: StaffMember) => void;
  onDelete: (staffMember: StaffMember) => void;
  readOnly?: boolean;
}

export const StaffTableActions: React.FC<StaffTableActionsProps> = ({
  staffMember,
  onView,
  onEdit,
  onArchive,
  onSuspend,
  onTerminate,
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
        <DropdownMenuItem onClick={() => onView(staffMember)}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        {!readOnly && onEdit && (
          <DropdownMenuItem onClick={() => onEdit(staffMember)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {!readOnly && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSuspend(staffMember)}>
              <Clock className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onArchive(staffMember)}>
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onTerminate(staffMember)}
              className="text-red-600"
            >
              <UserX className="mr-2 h-4 w-4" />
              Terminate
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(staffMember)}
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
