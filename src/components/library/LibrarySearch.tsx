
import React from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

interface LibrarySearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  resultCount: number;
}

export const LibrarySearch: React.FC<LibrarySearchProps> = ({
  searchTerm,
  setSearchTerm,
  resultCount
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search documents by title, class, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        {searchTerm && (
          <p className="text-sm text-gray-600 mt-2">
            {resultCount} document{resultCount !== 1 ? 's' : ''} found
          </p>
        )}
      </CardContent>
    </Card>
  );
};
