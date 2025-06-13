import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Student {
  id: number;
  name: string;
  class: string;
}

interface MarksheetGeneratorProps {
  student: Student;
  term: string;
  class: string;
}

export const MarksheetGenerator = React.forwardRef<HTMLDivElement, MarksheetGeneratorProps>(
  ({ student, term, class: studentClass }, ref) => {

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

  if (!student) {
    return (
        <div ref={ref} className="p-8 text-center">
            <p>Please select a student to generate a marksheet.</p>
        </div>
    );
  }
  
  return (
    <div ref={ref} className="p-8 bg-white relative">
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
          <h2 className="text-xl font-semibold text-blue-900">STUDENT PROGRESS REPORT</h2>
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
        <p>This report is a confidential document of Springing Stars Junior School</p>
        <p>Generated on {new Date().toLocaleDateString()} • Report ID: MS{Date.now()}</p>
      </div>
    </div>
  );
});

MarksheetGenerator.displayName = 'MarksheetGenerator';
