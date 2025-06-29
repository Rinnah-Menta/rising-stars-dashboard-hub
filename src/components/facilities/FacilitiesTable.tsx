
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, MapPin, Users, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { Facility } from '@/hooks/useFacilitiesData';
import AnimatedInView from '@/components/AnimatedInView';

interface FacilitiesTableProps {
  filteredFacilities: Facility[];
  canManageFacilities: boolean;
  onEditFacility: (facility: Facility) => void;
  onDeleteFacility: (facility: Facility) => void;
}

export const FacilitiesTable: React.FC<FacilitiesTableProps> = ({
  filteredFacilities,
  canManageFacilities,
  onEditFacility,
  onDeleteFacility
}) => {
  const getStatusIcon = (status: Facility['status']) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'occupied': return <Users className="h-4 w-4 text-blue-600" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'reserved': return <Clock className="h-4 w-4 text-orange-600" />;
    }
  };

  const getStatusVariant = (status: Facility['status']) => {
    switch (status) {
      case 'available': return 'default';
      case 'occupied': return 'secondary';
      case 'maintenance': return 'destructive';
      case 'reserved': return 'outline';
      default: return 'default';
    }
  };

  return (
    <AnimatedInView>
      <Card>
        <CardHeader>
          <CardTitle>Facilities List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                {canManageFacilities && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell className="font-medium">{facility.name}</TableCell>
                  <TableCell className="capitalize">{facility.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {facility.location}
                    </div>
                  </TableCell>
                  <TableCell>{facility.capacity}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(facility.status)} className="flex items-center gap-1 w-fit">
                      {getStatusIcon(facility.status)}
                      {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                    </Badge>
                  </TableCell>
                  {canManageFacilities && (
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onEditFacility(facility)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDeleteFacility(facility)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AnimatedInView>
  );
};
