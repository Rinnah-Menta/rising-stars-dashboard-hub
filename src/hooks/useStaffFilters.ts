
import { useState, useEffect } from 'react';
import { StaffMember } from '@/components/staff/StaffTable';

export const useStaffFilters = (staff: StaffMember[]) => {
  const [filteredStaff, setFilteredStaff] = useState<StaffMember[]>(staff);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    let filtered = staff;

    if (searchTerm) {
      filtered = filtered.filter(staffMember =>
        staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (staffMember.subject && staffMember.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (staffMember.role && staffMember.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
        staffMember.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (staffMember.classesTaught && staffMember.classesTaught.join(', ').toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(staffMember => staffMember.status === filterStatus);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(staffMember => staffMember.type === filterType);
    }

    setFilteredStaff(filtered);
  }, [staff, searchTerm, filterStatus, filterType]);

  return {
    filteredStaff,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filterType,
    setFilterType
  };
};
