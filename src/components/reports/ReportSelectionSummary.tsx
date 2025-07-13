import React from 'react';
import { Student } from '@/hooks/useStudents';
import { ReportSelections } from './types';

interface ReportSelectionSummaryProps {
  selections: ReportSelections;
  filteredStudents: Student[];
}

export const ReportSelectionSummary: React.FC<ReportSelectionSummaryProps> = ({
  selections,
  filteredStudents
}) => {
  const { selectedStudentId, selectedTerm } = selections;

  if (!selectedStudentId) return null;

  const selectedStudent = filteredStudents.find(s => s.id === selectedStudentId);

  return (
    <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
      <p className="text-sm text-primary">
        <strong>Selected:</strong> {selectedStudent?.name || 'Unknown Student'}
        {selectedTerm && ` - ${selectedTerm}`}
      </p>
    </div>
  );
};