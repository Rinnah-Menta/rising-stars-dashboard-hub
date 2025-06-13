import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Printer } from 'lucide-react';
import { ReportCard } from './ReportCard';
import { subjects } from '@/data/marks';
import { ReportCardPDF } from './ReportCardPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { usePrint } from '@/hooks/usePrint';

interface Student {
  id: number;
  name: string;
  class: string;
}

interface ReportCardGeneratorProps {
  student: Student;
  term: string;
  class: string;
  onClose: () => void;
}

export const ReportCardGenerator = ({ student, term, class: studentClass, onClose }: ReportCardGeneratorProps) => {
  const handlePrint = usePrint();

  const totalMarks = subjects.reduce((sum, subject) => sum + subject.score, 0);
  const average = Math.round(totalMarks / subjects.length);
  const overallGrade = average >= 85 ? 'A' : average >= 75 ? 'B+' : average >= 65 ? 'B' : average >= 55 ? 'C+' : 'C';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Student Report Card</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <PDFDownloadLink
              document={
                <ReportCardPDF
                  student={student}
                  term={term}
                  studentClass={studentClass}
                  subjects={subjects}
                  totalMarks={totalMarks}
                  average={average}
                  overallGrade={overallGrade}
                />
              }
              fileName={`Report-Card-${student?.name}-${term}.pdf`}
            >
              {({ loading }) => (
                <Button variant="outline" size="sm" disabled={loading}>
                  <Download className="h-4 w-4 mr-2" />
                  {loading ? 'Loading...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="printable-area">
          <ReportCard
            student={student}
            term={term}
            studentClass={studentClass}
            subjects={subjects}
            totalMarks={totalMarks}
            average={average}
            overallGrade={overallGrade}
          />
        </div>
      </div>
    </div>
  );
}; 