
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useReactToPrint } from 'react-to-print';

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
  const reportCardRef = useRef<HTMLDivElement>(null);

  // Sample subjects and grades data
  const subjects = [
    { name: 'English Language', score: 85, grade: 'A', remarks: 'Excellent' },
    { name: 'Mathematics', score: 78, grade: 'B+', remarks: 'Very Good' },
    { name: 'Science', score: 82, grade: 'A-', remarks: 'Excellent' },
    { name: 'Social Studies', score: 75, grade: 'B', remarks: 'Good' },
    { name: 'Luganda', score: 80, grade: 'A-', remarks: 'Very Good' },
    { name: 'Religious Education', score: 88, grade: 'A', remarks: 'Excellent' },
    { name: 'Physical Education', score: 90, grade: 'A', remarks: 'Outstanding' },
    { name: 'Music, Dance & Drama', score: 83, grade: 'A-', remarks: 'Very Good' },
  ];

  const totalMarks = subjects.reduce((sum, subject) => sum + subject.score, 0);
  const average = Math.round(totalMarks / subjects.length);
  const overallGrade = average >= 85 ? 'A' : average >= 75 ? 'B+' : average >= 65 ? 'B' : average >= 55 ? 'C+' : 'C';

  const handlePrint = useReactToPrint({
    contentRef: reportCardRef,
    documentTitle: `Report Card - ${student?.name} - ${term}`,
    onAfterPrint: () => {
      toast({
        title: "Print Complete",
        description: "Report card has been sent to printer successfully.",
      });
    },
    onPrintError: (errorLocation, error) => {
      console.error('Print error:', errorLocation, error);
      toast({
        title: "Print Error",
        description: "There was an error printing the report card.",
        variant: "destructive"
      });
    },
    pageStyle: `
      @page {
        size: A4;
        margin: 0.5in;
      }
      @media print {
        body { 
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `
  });

  const handleDownload = () => {
    // Create a new window for printing/downloading
    const printWindow = window.open('', '_blank');
    if (printWindow && reportCardRef.current) {
      const reportCardHtml = reportCardRef.current.innerHTML;
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Report Card - ${student?.name} - ${term}</title>
            <style>
              @page {
                size: A4;
                margin: 0.5in;
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
              }
              .text-2xl { font-size: 1.5rem; }
              .text-xl { font-size: 1.25rem; }
              .text-sm { font-size: 0.875rem; }
              .text-xs { font-size: 0.75rem; }
              .font-bold { font-weight: bold; }
              .font-semibold { font-weight: 600; }
              .text-center { text-align: center; }
              .text-blue-900 { color: #1e3a8a; }
              .text-blue-700 { color: #1d4ed8; }
              .text-gray-600 { color: #4b5563; }
              .text-gray-300 { color: #d1d5db; }
              .border-t-2 { border-top: 2px solid; }
              .border-b-2 { border-bottom: 2px solid; }
              .border-t { border-top: 1px solid; }
              .border-b { border-bottom: 1px solid; }
              .border { border: 1px solid; }
              .border-gray-400 { border-color: #9ca3af; }
              .border-gray-300 { border-color: #d1d5db; }
              .border-blue-900 { border-color: #1e3a8a; }
              .p-8 { padding: 2rem; }
              .p-4 { padding: 1rem; }
              .p-3 { padding: 0.75rem; }
              .p-2 { padding: 0.5rem; }
              .pt-8 { padding-top: 2rem; }
              .pt-4 { padding-top: 1rem; }
              .pt-2 { padding-top: 0.5rem; }
              .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
              .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
              .mb-8 { margin-bottom: 2rem; }
              .mb-6 { margin-bottom: 1.5rem; }
              .mb-4 { margin-bottom: 1rem; }
              .mb-2 { margin-bottom: 0.5rem; }
              .mt-8 { margin-top: 2rem; }
              .mt-2 { margin-top: 0.5rem; }
              .grid { display: grid; }
              .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
              .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
              .gap-8 { gap: 2rem; }
              .gap-4 { gap: 1rem; }
              .space-y-2 > * + * { margin-top: 0.5rem; }
              .space-y-1 > * + * { margin-top: 0.25rem; }
              .flex { display: flex; }
              .flex-1 { flex: 1 1 0%; }
              .items-center { align-items: center; }
              .justify-center { justify-content: center; }
              .w-32 { width: 8rem; }
              .h-16 { height: 4rem; }
              .w-16 { width: 4rem; }
              .w-96 { width: 24rem; }
              .h-96 { height: 24rem; }
              .w-full { width: 100%; }
              .min-h-[60px] { min-height: 60px; }
              .object-contain { object-fit: contain; }
              .relative { position: relative; }
              .absolute { position: absolute; }
              .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
              .z-10 { z-index: 10; }
              .opacity-5 { opacity: 0.05; }
              .pointer-events-none { pointer-events: none; }
              .bg-white { background-color: white; }
              .bg-blue-50 { background-color: #eff6ff; }
              .bg-gray-50 { background-color: #f9fafb; }
              .border-collapse { border-collapse: collapse; }
              table { width: 100%; border-collapse: collapse; }
              th { text-align: left; padding: 0.5rem; border: 1px solid #9ca3af; }
              td { padding: 0.5rem; border: 1px solid #9ca3af; }
              .bg-blue-50 { background-color: #eff6ff; }
            </style>
          </head>
          <body>
            ${reportCardHtml}
          </body>
        </html>
      `);
      
      printWindow.document.close();
      
      // Wait for images to load before printing
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        
        toast({
          title: "Download Complete",
          description: "Report card has been prepared for download.",
        });
      }, 1000);
    } else {
      toast({
        title: "Download Error",
        description: "Unable to open print window. Please try again.",
        variant: "destructive"
      });
    }
  };

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
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={reportCardRef} className="p-8 bg-white relative">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <img 
              src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
              alt="Watermark" 
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* School Header */}
          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center gap-4 mb-4">
              <img 
                src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
                alt="Springing Stars Logo" 
                className="h-16 w-16 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-blue-900">SPRINGING STARS JUNIOR SCHOOL</h1>
                <p className="text-sm text-blue-700">Excellence in Education • Nurturing Future Leaders</p>
                <p className="text-xs text-gray-600">P.O. Box 1234, Kampala, Uganda | Tel: +256 700 000 000</p>
              </div>
            </div>
            <div className="border-t-2 border-b-2 border-blue-900 py-2">
              <h2 className="text-xl font-semibold text-blue-900">STUDENT REPORT CARD</h2>
            </div>
          </div>

          {/* Student Information */}
          <div className="grid grid-cols-2 gap-8 mb-6 relative z-10">
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold w-32">Student Name:</span>
                <span className="border-b border-gray-300 flex-1 px-2">{student?.name}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Class:</span>
                <span className="border-b border-gray-300 flex-1 px-2">{studentClass}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Student ID:</span>
                <span className="border-b border-gray-300 flex-1 px-2">SS{student?.id.toString().padStart(4, '0')}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex">
                <span className="font-semibold w-32">Term:</span>
                <span className="border-b border-gray-300 flex-1 px-2">{term}</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Academic Year:</span>
                <span className="border-b border-gray-300 flex-1 px-2">2024</span>
              </div>
              <div className="flex">
                <span className="font-semibold w-32">Date Issued:</span>
                <span className="border-b border-gray-300 flex-1 px-2">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="mb-6 relative z-10">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-blue-50">
                  <th className="border border-gray-400 p-2 text-left">Subject</th>
                  <th className="border border-gray-400 p-2 text-center">Score (%)</th>
                  <th className="border border-gray-400 p-2 text-center">Grade</th>
                  <th className="border border-gray-400 p-2 text-center">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2">{subject.name}</td>
                    <td className="border border-gray-400 p-2 text-center">{subject.score}</td>
                    <td className="border border-gray-400 p-2 text-center font-semibold">{subject.grade}</td>
                    <td className="border border-gray-400 p-2 text-center">{subject.remarks}</td>
                  </tr>
                ))}
                <tr className="bg-blue-50 font-semibold">
                  <td className="border border-gray-400 p-2">TOTAL</td>
                  <td className="border border-gray-400 p-2 text-center">{totalMarks}</td>
                  <td className="border border-gray-400 p-2 text-center">{overallGrade}</td>
                  <td className="border border-gray-400 p-2 text-center">Average: {average}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Grading Scale */}
          <div className="grid grid-cols-2 gap-8 mb-6 relative z-10">
            <div>
              <h3 className="font-semibold mb-2">Grading Scale:</h3>
              <div className="text-sm space-y-1">
                <div>A: 85-100% (Excellent)</div>
                <div>A-: 80-84% (Very Good)</div>
                <div>B+: 75-79% (Good)</div>
                <div>B: 65-74% (Fair)</div>
                <div>C+: 55-64% (Satisfactory)</div>
                <div>C: 45-54% (Needs Improvement)</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Class Performance:</h3>
              <div className="text-sm space-y-1">
                <div>Class Average: 76%</div>
                <div>Student Position: 3rd out of 25</div>
                <div>Highest Score: 92%</div>
                <div>Lowest Score: 58%</div>
              </div>
            </div>
          </div>

          {/* Teacher Comments */}
          <div className="mb-6 relative z-10">
            <h3 className="font-semibold mb-2">Class Teacher's Comments:</h3>
            <div className="border border-gray-300 p-3 min-h-[60px] bg-gray-50">
              <p className="text-sm">
                {student?.name} has shown excellent performance this term. Keep up the good work in Mathematics and continue reading more to improve English comprehension skills.
              </p>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-8 pt-8 relative z-10">
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-semibold">Class Teacher</p>
                <p className="text-xs">Ms. Sarah Namubiru</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-semibold">Head Teacher</p>
                <p className="text-xs">Mr. John Kasozi</p>
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-gray-400 pt-2">
                <p className="text-sm font-semibold">Parent/Guardian</p>
                <p className="text-xs">Signature & Date</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-gray-300 text-xs text-gray-600 relative z-10">
            <p>This report card is a confidential document of Springing Stars Junior School</p>
            <p>Generated on {new Date().toLocaleDateString()} • Report ID: RC{Date.now()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
