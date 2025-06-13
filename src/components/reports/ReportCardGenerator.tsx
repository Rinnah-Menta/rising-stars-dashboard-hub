
import React, { useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print Started",
      description: "Report card is being prepared for printing.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Report card PDF is being generated.",
    });
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
                <span className="border-b border-gray-300 flex-1 px-2">{new Date().toLocaleDateLength()}</span>
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
