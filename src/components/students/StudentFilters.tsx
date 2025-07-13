
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface StudentFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterClass: string;
  setFilterClass: (classFilter: string) => void;
  availableClasses: string[];
  resultsCount: number;
}

export const StudentFilters: React.FC<StudentFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  filterClass,
  setFilterClass,
  availableClasses,
  resultsCount
}) => {
  const resultsText = searchTerm || filterClass !== 'all'
    ? `${resultsCount} result${resultsCount !== 1 ? 's' : ''} found`
    : `${resultsCount} student${resultsCount !== 1 ? 's' : ''}`;

  return (
    <div className="space-y-2">
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
        <Select value={filterClass} onValueChange={setFilterClass}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {availableClasses.map((className) => (
              <SelectItem key={className} value={className}>
                {className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <p className="text-sm text-gray-600">{resultsText}</p>
    </div>
  );
};
