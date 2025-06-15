
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ClassSelectorProps {
  selectedClasses: string[];
  onClassToggle: (className: string) => void;
  onRemoveClass: (className: string) => void;
}

const availableClasses = [
  'P.1A', 'P.1B', 'P.2A', 'P.2B', 'P.3A', 'P.3B', 
  'P.4A', 'P.4B', 'P.5A', 'P.5B', 'P.6A', 'P.6B', 'P.7A', 'P.7B'
];

export const ClassSelector: React.FC<ClassSelectorProps> = ({
  selectedClasses,
  onClassToggle,
  onRemoveClass
}) => {
  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="classes">Classes Taught *</Label>
      <Select onValueChange={onClassToggle}>
        <SelectTrigger>
          <SelectValue placeholder="Select classes to teach" />
        </SelectTrigger>
        <SelectContent>
          {availableClasses.map((className) => (
            <SelectItem 
              key={className} 
              value={className}
              disabled={selectedClasses.includes(className)}
            >
              {className} {selectedClasses.includes(className) && '✓'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedClasses.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedClasses.map((className) => (
            <Badge key={className} variant="secondary" className="flex items-center gap-1">
              {className}
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => onRemoveClass(className)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
