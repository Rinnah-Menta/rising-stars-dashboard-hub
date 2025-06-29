
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Facility } from '@/hooks/useFacilitiesData';

interface FacilitiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingFacility: Facility | null;
  newFacility: Partial<Facility>;
  setNewFacility: (facility: Partial<Facility>) => void;
  onAddFacility: () => void;
  onUpdateFacility: () => void;
  onReset: () => void;
}

export const FacilitiesDialog: React.FC<FacilitiesDialogProps> = ({
  open,
  onOpenChange,
  editingFacility,
  newFacility,
  setNewFacility,
  onAddFacility,
  onUpdateFacility,
  onReset
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingFacility ? 'Edit Facility' : 'Add New Facility'}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Facility Name *</Label>
            <Input
              id="name"
              value={newFacility.name || ''}
              onChange={(e) => setNewFacility({...newFacility, name: e.target.value})}
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Select 
              value={newFacility.type} 
              onValueChange={(value) => setNewFacility({...newFacility, type: value as Facility['type']})}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classroom">Classroom</SelectItem>
                <SelectItem value="laboratory">Laboratory</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="sports">Sports</SelectItem>
                <SelectItem value="auditorium">Auditorium</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              value={newFacility.capacity || ''}
              onChange={(e) => setNewFacility({...newFacility, capacity: parseInt(e.target.value) || 0})}
            />
          </div>
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={newFacility.location || ''}
              onChange={(e) => setNewFacility({...newFacility, location: e.target.value})}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newFacility.description || ''}
              onChange={(e) => setNewFacility({...newFacility, description: e.target.value})}
            />
          </div>
          <div className="col-span-2 flex gap-2">
            <Button onClick={editingFacility ? onUpdateFacility : onAddFacility}>
              {editingFacility ? 'Update' : 'Add'} Facility
            </Button>
            <Button variant="outline" onClick={onReset}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
