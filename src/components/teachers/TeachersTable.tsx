
import React, { useState } from 'react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, GraduationCap, Eye, Edit, Archive, Trash2, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';

interface Teacher {
  id: string;
  name: string;
  subject: string;
  classes: string;
  phone: string;
  status: 'Active' | 'On Leave' | 'Inactive' | 'Archived';
  experience: string;
  email?: string;
  address?: string;
  qualification?: string;
  department?: string;
}

interface TeachersTableProps {
  teachers: Teacher[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEditTeacher: (teacher: Teacher) => void;
  onViewTeacher: (teacher: Teacher) => void;
  onArchiveTeacher: (id: string) => void;
  onDeleteTeacher: (id: string) => void;
  filterStatus: string;
  onFilterChange: (status: string) => void;
}

export const TeachersTable: React.FC<TeachersTableProps> = ({
  teachers,
  searchTerm,
  onSearchChange,
  onEditTeacher,
  onViewTeacher,
  onArchiveTeacher,
  onDeleteTeacher,
  filterStatus,
  onFilterChange
}) => {
  const { toast } = useToast();
  const [confirmationDialog, setConfirmationDialog] = useState<{
    open: boolean;
    type: 'archive' | 'delete';
    teacher: Teacher | null;
  }>({ open: false, type: 'delete', teacher: null });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'On Leave': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Inactive': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'Archived': return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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

  const handleArchiveClick = (teacher: Teacher) => {
    if (teacher.status === 'Archived') {
      toast({
        title: "Already Archived",
        description: "This teacher is already archived.",
        variant: "destructive"
      });
      return;
    }
    setConfirmationDialog({ open: true, type: 'archive', teacher });
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setConfirmationDialog({ open: true, type: 'delete', teacher });
  };

  const handleConfirmAction = () => {
    if (!confirmationDialog.teacher) return;

    if (confirmationDialog.type === 'archive') {
      onArchiveTeacher(confirmationDialog.teacher.id);
      toast({
        title: "Teacher Archived",
        description: `${confirmationDialog.teacher.name} has been archived.`,
      });
    } else {
      onDeleteTeacher(confirmationDialog.teacher.id);
      toast({
        title: "Teacher Deleted",
        description: `${confirmationDialog.teacher.name} has been deleted permanently.`,
      });
    }
    setConfirmationDialog({ open: false, type: 'delete', teacher: null });
  };

  const resultsCount = teachers.length;
  const totalResults = searchTerm ? `${resultsCount} result${resultsCount !== 1 ? 's' : ''} found` : `${resultsCount} teacher${resultsCount !== 1 ? 's' : ''}`;

  return (
    <>
      <CardHeader className="px-0 pt-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle>Teaching Staff</CardTitle>
            <p className="text-sm text-gray-600 mt-1">{totalResults}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search teachers..." 
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <Select value={filterStatus} onValueChange={onFilterChange}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <div className="overflow-x-auto">
        {resultsCount === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No teachers found matching your criteria.</p>
            {searchTerm && (
              <p className="text-sm mt-2">Try adjusting your search terms or filters.</p>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium">Teacher ID</th>
                <th className="text-left p-4 font-medium">Name</th>
                <th className="text-left p-4 font-medium">Subject</th>
                <th className="text-left p-4 font-medium">Classes</th>
                <th className="text-left p-4 font-medium">Experience</th>
                <th className="text-left p-4 font-medium">Contact</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono text-sm">{teacher.id}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-gray-400" />
                      <span>{teacher.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{teacher.subject}</td>
                  <td className="p-4 text-sm">{teacher.classes}</td>
                  <td className="p-4">{teacher.experience}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{teacher.phone}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCall(teacher.phone)}
                        className="h-6 w-6 p-0"
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={`${getStatusColor(teacher.status)} cursor-pointer`}>
                      {teacher.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onViewTeacher(teacher)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onEditTeacher(teacher)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleArchiveClick(teacher)}
                        className="h-8 w-8 p-0 text-orange-600 hover:text-orange-800"
                        disabled={teacher.status === 'Archived'}
                      >
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteClick(teacher)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmationDialog
        open={confirmationDialog.open}
        onOpenChange={(open) => setConfirmationDialog({ ...confirmationDialog, open })}
        title={confirmationDialog.type === 'archive' ? 'Archive Teacher' : 'Delete Teacher'}
        description={
          confirmationDialog.type === 'archive' 
            ? `Are you sure you want to archive ${confirmationDialog.teacher?.name}? They will be moved to archived status.`
            : `Are you sure you want to delete ${confirmationDialog.teacher?.name}? This action cannot be undone.`
        }
        confirmText={confirmationDialog.type === 'archive' ? 'Archive' : 'Delete'}
        cancelText="Cancel"
        onConfirm={handleConfirmAction}
        variant={confirmationDialog.type === 'delete' ? 'destructive' : 'default'}
        type={confirmationDialog.type}
      />
    </>
  );
};
