
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProfessionalReportCard } from './ProfessionalReportCard';
import { ReportSelectionForm } from './ReportSelectionForm';
import { ReportSelectionSummary } from './ReportSelectionSummary';
import { useReportGenerator } from './hooks/useReportGenerator';

export const ReportCardGenerator: React.FC = () => {
  const {
    selections,
    setSelections,
    filteredStudents,
    availableClasses,
    availableTerms,
    reportData,
    handleGenerateReport,
    resetSelections
  } = useReportGenerator();

  const isReportReady = selections.selectedStudentId && selections.selectedTerm;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Generate Report Cards</CardTitle>
          <p className="text-muted-foreground">Select student and term to generate a professional report card</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReportSelectionForm
            selections={selections}
            onSelectionsChange={setSelections}
            availableClasses={availableClasses}
            filteredStudents={filteredStudents}
            availableTerms={availableTerms}
            onGenerateReport={handleGenerateReport}
            onResetSelections={resetSelections}
          />
          
          <ReportSelectionSummary
            selections={selections}
            filteredStudents={filteredStudents}
          />
        </CardContent>
      </Card>
      
      {isReportReady && (
        <div className="mt-6">
          <ProfessionalReportCard 
            data={reportData} 
            studentId={selections.selectedStudentId} 
          />
        </div>
      )}
    </div>
  );
};
