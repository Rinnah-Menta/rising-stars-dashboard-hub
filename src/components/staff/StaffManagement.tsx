
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StaffStats } from './StaffStats';
import { StaffPageHeader } from './StaffPageHeader';
import { StaffTable, StaffMember } from './StaffTable';
import { StaffDialog } from './StaffDialog';
import { StaffViewDialog } from './StaffViewDialog';
import { StaffFilters } from './StaffFilters';
import { useStaffData } from '@/hooks/useStaffData';
import { useStaffFilters } from '@/hooks/useStaffFilters';
import { exportStaffToCSV } from '@/utils/staffExport';

export const StaffManagement = () => {
  const { 
    staff, 
    addStaffMember, 
    updateStaffMember, 
    archiveStaffMember, 
    suspendStaffMember, 
    terminateStaffMember, 
    deleteStaffMember 
  } = useStaffData();
  const { 
    filteredStaff, 
    searchTerm, 
    setSearchTerm, 
    filterStatus, 
    setFilterStatus,
    filterType,
    setFilterType 
  } = useStaffFilters(staff);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [viewingStaff, setViewingStaff] = useState<StaffMember | null>(null);

  const handleAddStaff = () => {
    setEditingStaff(null);
    setIsDialogOpen(true);
  };

  const handleEditStaff = (staffMember: StaffMember) => {
    setEditingStaff(staffMember);
    setIsDialogOpen(true);
  };

  const handleViewStaff = (staffMember: StaffMember) => {
    setViewingStaff(staffMember);
    setIsViewDialogOpen(true);
  };

  const handleSaveStaff = (staffData: any) => {
    if (editingStaff) {
      updateStaffMember(editingStaff, staffData);
    } else {
      addStaffMember(staffData);
    }
    setIsDialogOpen(false);
  };

  const handleExport = () => {
    exportStaffToCSV(filteredStaff);
  };

  return (
    <div className="space-y-6">
      <StaffPageHeader 
        onAddStaff={handleAddStaff} 
        onExport={handleExport}
      />
      <StaffStats staff={filteredStaff} />
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Staff List</CardTitle>
            <StaffFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              filterType={filterType}
              setFilterType={setFilterType}
              resultsCount={filteredStaff.length}
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <StaffTable
            staff={filteredStaff}
            onEdit={handleEditStaff}
            onView={handleViewStaff}
            onArchive={archiveStaffMember}
            onSuspend={suspendStaffMember}
            onTerminate={terminateStaffMember}
            onDelete={deleteStaffMember}
          />
        </CardContent>
      </Card>

      <StaffDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSaveStaff}
        staffMember={editingStaff}
      />

      <StaffViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        staffMember={viewingStaff}
        onEdit={(staffMember) => {
          setIsViewDialogOpen(false);
          handleEditStaff(staffMember);
        }}
      />
    </div>
  );
};
