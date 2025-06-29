
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building, CheckCircle, Users, AlertTriangle } from 'lucide-react';
import { Facility } from '@/hooks/useFacilitiesData';
import AnimatedInView from '@/components/AnimatedInView';

interface FacilitiesStatsProps {
  facilities: Facility[];
}

export const FacilitiesStats: React.FC<FacilitiesStatsProps> = ({ facilities }) => {
  const getStats = () => {
    return {
      total: facilities.length,
      available: facilities.filter(f => f.status === 'available').length,
      occupied: facilities.filter(f => f.status === 'occupied').length,
      maintenance: facilities.filter(f => f.status === 'maintenance').length
    };
  };

  const stats = getStats();

  return (
    <AnimatedInView>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Facilities</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
                <p className="text-sm text-gray-600">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.maintenance}</p>
                <p className="text-sm text-gray-600">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedInView>
  );
};
