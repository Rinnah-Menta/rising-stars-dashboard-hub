import { useState } from 'react';
import { useStudents } from '@/hooks/useStudents';
import { ReportSelections } from '../types';
import { transformStudentDataForReport, getAvailableTerms } from '../utils/reportDataTransform';
import { useToast } from '@/hooks/use-toast';

export const useReportGenerator = () => {
  const { toast } = useToast();
  const { allStudents, availableClasses } = useStudents();
  
  const [selections, setSelections] = useState<ReportSelections>({
    selectedStudentId: '',
    selectedTerm: '',
    selectedClass: 'all'
  });

  const filteredStudents = selections.selectedClass && selections.selectedClass !== 'all'
    ? allStudents.filter(student => student.class === selections.selectedClass)
    : allStudents;

  const availableTerms = getAvailableTerms();
  const reportData = transformStudentDataForReport(allStudents);

  const handleGenerateReport = () => {
    if (!selections.selectedStudentId) {
      toast({
        title: "Student Required",
        description: "Please select a student to generate the report card.",
        variant: "destructive"
      });
      return;
    }
    if (!selections.selectedTerm) {
      toast({
        title: "Term Required", 
        description: "Please select a term to generate the report card.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generated",
      description: "Report card has been generated successfully.",
    });
  };

  const resetSelections = () => {
    setSelections({
      selectedStudentId: '',
      selectedTerm: '',
      selectedClass: 'all'
    });
  };

  return {
    selections,
    setSelections,
    filteredStudents,
    availableClasses,
    availableTerms,
    reportData,
    handleGenerateReport,
    resetSelections
  };
};