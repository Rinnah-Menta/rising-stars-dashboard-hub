
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search students..." 
          className="pl-10 w-full sm:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select value={filterStatus} onValueChange={setFilterStatus}>
        <SelectTrigger className="w-full sm:w-40">
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Filter by fees" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Students</SelectItem>
          <SelectItem value="Paid">Paid</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Overdue">Overdue</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
