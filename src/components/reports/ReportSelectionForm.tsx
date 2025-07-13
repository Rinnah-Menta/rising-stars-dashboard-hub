import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Student } from '@/hooks/useStudents';
import { ReportSelections } from './types';

interface ReportSelectionFormProps {
  selections: ReportSelections;
  onSelectionsChange: (selections: ReportSelections) => void;
  availableClasses: string[];
  filteredStudents: Student[];
  availableTerms: string[];
  onGenerateReport: () => void;
  onResetSelections: () => void;
}

export const ReportSelectionForm: React.FC<ReportSelectionFormProps> = ({
  selections,
  onSelectionsChange,
  availableClasses,
  filteredStudents,
  availableTerms,
  onGenerateReport,
  onResetSelections
}) => {
  const { selectedStudentId, selectedTerm, selectedClass } = selections;

  const updateSelection = (key: keyof ReportSelections, value: string) => {
    onSelectionsChange({
      ...selections,
      [key]: value
    });
  };

  const formatClassName = (className: string) => {
    return className.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Class Filter */}
        <div className="space-y-2">
          <Label htmlFor="class-select">Filter by Class (Optional)</Label>
          <Select value={selectedClass} onValueChange={(value) => updateSelection('selectedClass', value)}>
            <SelectTrigger id="class-select">
              <SelectValue placeholder="All classes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Classes</SelectItem>
              {availableClasses.map((className) => (
                <SelectItem key={className} value={className}>
                  {formatClassName(className)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Student Selection */}
        <div className="space-y-2">
          <Label htmlFor="student-select">Select Student *</Label>
          <Select value={selectedStudentId} onValueChange={(value) => updateSelection('selectedStudentId', value)}>
            <SelectTrigger id="student-select">
              <SelectValue placeholder="Choose a student" />
            </SelectTrigger>
            <SelectContent>
              {filteredStudents.map((student) => (
                <SelectItem key={student.id} value={student.id}>
                  {student.name} ({student.class})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Term Selection */}
        <div className="space-y-2">
          <Label htmlFor="term-select">Select Term *</Label>
          <Select value={selectedTerm} onValueChange={(value) => updateSelection('selectedTerm', value)}>
            <SelectTrigger id="term-select">
              <SelectValue placeholder="Choose a term" />
            </SelectTrigger>
            <SelectContent>
              {availableTerms.map((term) => (
                <SelectItem key={term} value={term}>
                  {term}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button 
          onClick={onGenerateReport}
          disabled={!selectedStudentId || !selectedTerm}
          className="bg-primary hover:bg-primary/90"
        >
          Generate Report Card
        </Button>
        <Button 
          variant="outline" 
          onClick={onResetSelections}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};