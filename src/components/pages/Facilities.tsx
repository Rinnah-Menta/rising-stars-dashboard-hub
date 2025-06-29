
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useFacilitiesData, Facility } from '@/hooks/useFacilitiesData';
import { FacilitiesPageHeader } from '@/components/facilities/FacilitiesPageHeader';
import { FacilitiesStats } from '@/components/facilities/FacilitiesStats';
import { FacilitiesFilters } from '@/components/facilities/FacilitiesFilters';
import { FacilitiesTable } from '@/components/facilities/FacilitiesTable';
import { FacilitiesDialog } from '@/components/facilities/FacilitiesDialog';

export const Facilities = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { facilities, addFacility, updateFacility, deleteFacility } = useFacilitiesData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    type: 'delete' as 'delete',
    title: '',
    description: '',
    onConfirm: () => {}
  });
  const [newFacility, setNewFacility] = useState<Partial<Facility>>({
    name: '',
    type: 'classroom',
    capacity: 0,
    location: '',
    status: 'available',
    description: '',
    amenities: [],
    lastMaintenance: '',
    nextMaintenance: ''
  });

  const canManageFacilities = user?.role === 'admin' || user?.role === 'non-teaching';

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         facility.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || facility.type === filterType;
    const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleDeleteFacility = (facility: Facility) => {
    setConfirmDialog({
      open: true,
      type: 'delete',
      title: 'Delete Facility',
      description: `Are you sure you want to delete "${facility.name}"? This action cannot be undone and will remove all facility records.`,
      onConfirm: () => {
        deleteFacility(facility.id);
        toast({
          title: 'Facility Deleted',
          description: 'The facility has been permanently removed.',
          variant: 'destructive'
        });
        setConfirmDialog({ ...confirmDialog, open: false });
      }
    });
  };

  const handleAddFacility = () => {
    if (!newFacility.name || !newFacility.location) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    const facilityData: Omit<Facility, 'id'> = {
      name: newFacility.name,
      type: newFacility.type as Facility['type'],
      capacity: newFacility.capacity || 0,
      location: newFacility.location,
      status: newFacility.status as Facility['status'],
      description: newFacility.description || '',
      amenities: newFacility.amenities || [],
      lastMaintenance: newFacility.lastMaintenance || '',
      nextMaintenance: newFacility.nextMaintenance || ''
    };

    addFacility(facilityData);
    resetForm();
    
    toast({
      title: 'Success',
      description: 'Facility added successfully'
    });
  };

  const handleEditFacility = (facility: Facility) => {
    setEditingFacility(facility);
    setNewFacility(facility);
    setIsAddDialogOpen(true);
  };

  const handleUpdateFacility = () => {
    if (!editingFacility) return;

    updateFacility(editingFacility.id, newFacility);
    resetForm();

    toast({
      title: 'Success',
      description: 'Facility updated successfully'
    });
  };

  const resetForm = () => {
    setNewFacility({
      name: '',
      type: 'classroom',
      capacity: 0,
      location: '',
      status: 'available',
      description: '',
      amenities: [],
      lastMaintenance: '',
      nextMaintenance: ''
    });
    setEditingFacility(null);
    setIsAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <FacilitiesPageHeader 
          canManageFacilities={canManageFacilities}
          onAddClick={() => setEditingFacility(null)}
        />
        
        <FacilitiesDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          editingFacility={editingFacility}
          newFacility={newFacility}
          setNewFacility={setNewFacility}
          onAddFacility={handleAddFacility}
          onUpdateFacility={handleUpdateFacility}
          onReset={resetForm}
        />
      </Dialog>

      <FacilitiesStats facilities={facilities} />

      <FacilitiesFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <FacilitiesTable
        filteredFacilities={filteredFacilities}
        canManageFacilities={canManageFacilities}
        onEditFacility={handleEditFacility}
        onDeleteFacility={handleDeleteFacility}
      />

      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDialog.onConfirm}
        variant="destructive"
        type="delete"
      />
    </div>
  );
};
