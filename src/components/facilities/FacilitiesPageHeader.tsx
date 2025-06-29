
import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import AnimatedInView from '@/components/AnimatedInView';

interface FacilitiesPageHeaderProps {
  canManageFacilities: boolean;
  onAddClick: () => void;
}

export const FacilitiesPageHeader: React.FC<FacilitiesPageHeaderProps> = ({
  canManageFacilities,
  onAddClick
}) => {
  return (
    <AnimatedInView>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facilities Management</h1>
          <p className="text-gray-600">Manage school facilities and resources</p>
        </div>
        {canManageFacilities && (
          <DialogTrigger asChild>
            <Button onClick={onAddClick}>
              <Plus className="h-4 w-4 mr-2" />
              Add Facility
            </Button>
          </DialogTrigger>
        )}
      </div>
    </AnimatedInView>
  );
};
