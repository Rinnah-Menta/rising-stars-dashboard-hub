
import { useState, useEffect } from 'react';

export interface Facility {
  id: string;
  name: string;
  type: 'classroom' | 'laboratory' | 'library' | 'sports' | 'auditorium' | 'office' | 'other';
  capacity: number;
  location: string;
  status: 'available' | 'occupied' | 'maintenance' | 'reserved';
  description: string;
  amenities: string[];
  lastMaintenance: string;
  nextMaintenance: string;
}

const STORAGE_KEY = 'facilities_data';

const defaultFacilities: Facility[] = [
  {
    id: '1',
    name: 'Science Laboratory',
    type: 'laboratory',
    capacity: 30,
    location: 'Block A, Floor 2',
    status: 'available',
    description: 'Fully equipped science laboratory with modern equipment',
    amenities: ['Microscopes', 'Lab benches', 'Safety equipment', 'Chemical storage'],
    lastMaintenance: '2024-05-15',
    nextMaintenance: '2024-07-15'
  },
  {
    id: '2',
    name: 'Main Library',
    type: 'library',
    capacity: 100,
    location: 'Block B, Ground Floor',
    status: 'occupied',
    description: 'Central library with extensive book collection',
    amenities: ['Reading tables', 'Computer stations', 'WiFi', 'Study rooms'],
    lastMaintenance: '2024-04-20',
    nextMaintenance: '2024-08-20'
  },
  {
    id: '3',
    name: 'Sports Hall',
    type: 'sports',
    capacity: 200,
    location: 'Sports Complex',
    status: 'maintenance',
    description: 'Indoor sports facility for various activities',
    amenities: ['Basketball court', 'Volleyball nets', 'Changing rooms', 'Equipment storage'],
    lastMaintenance: '2024-06-01',
    nextMaintenance: '2024-06-30'
  }
];

export const useFacilitiesData = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        setFacilities(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading facilities data:', error);
        setFacilities(defaultFacilities);
      }
    } else {
      setFacilities(defaultFacilities);
    }
  }, []);

  // Save data to localStorage whenever facilities change
  useEffect(() => {
    if (facilities.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(facilities));
    }
  }, [facilities]);

  const addFacility = (facilityData: Omit<Facility, 'id'>) => {
    const newFacility: Facility = {
      ...facilityData,
      id: Date.now().toString()
    };
    setFacilities(prev => [...prev, newFacility]);
  };

  const updateFacility = (id: string, facilityData: Partial<Facility>) => {
    setFacilities(prev => prev.map(facility => 
      facility.id === id ? { ...facility, ...facilityData } : facility
    ));
  };

  const deleteFacility = (id: string) => {
    setFacilities(prev => prev.filter(facility => facility.id !== id));
  };

  return {
    facilities,
    addFacility,
    updateFacility,
    deleteFacility
  };
};
