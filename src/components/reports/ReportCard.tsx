import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Student {
  id: number;
  name: string;
  class: string;
}

interface Subject {
  name: string;
  score: number;
  grade: string;
  remarks: string;
}

interface ReportCardProps {
  student: Student;
  term: string;
  studentClass: string;
  subjects: Subject[];
  totalMarks: number;
  average: number;
  overallGrade: string;
}

export const ReportCard = ({ student, term, studentClass, subjects, totalMarks, average, overallGrade }: ReportCardProps) => {

  if (!student) {
    return (
        <div className="p-8 text-center">
            <p>Please select a student to generate a marksheet.</p>
        </div>
    );
  }
  
  return (
    <div className="p-6 bg-white relative min-h-screen">
      {/* Full Page Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
        <img 
          src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
          alt="Watermark" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Header with Logo */}
      <header className="text-center mb-6 relative z-10">
        <div className="flex items-center justify-center mb-3">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="Springing Stars Logo" 
            className="h-16 w-16 object-contain mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-blue-900">SPRINGING STARS JUNIOR SCHOOL</h1>
            <p className="text-sm text-blue-700">Excellence in Education • Nurturing Future Leaders</p>
          </div>
        </div>
        <div className="border-t-2 border-b-2 border-blue-900 py-1">
          <h2 className="text-xl font-semibold text-blue-900 tracking-wider">STUDENT PROGRESS REPORT</h2>
        </div>
      </header>

      {/* Student Photo and Info Section */}
      <div className="flex gap-6 mb-6 relative z-10">
        {/* Student Photo */}
        <div className="flex-shrink-0">
          <div className="w-32 h-40 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-sm font-medium">Student</div>
              <div className="text-sm">Photo</div>
            </div>
          </div>
        </div>

        {/* Student Information */}
        <div className="flex-1">
          <Card className="bg-white/80 border-0 shadow-sm">
            <CardContent className="p-4 grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Name:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">{student?.name}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Term:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">{term}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Class:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">{studentClass}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Year:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">2024</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Student ID:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">SS{student?.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="flex items-baseline">
                <span className="font-semibold text-gray-700 w-28 text-sm">Date:</span>
                <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900 text-sm">{new Date().toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Grades Table */}
      <section className="mb-6 relative z-10">
        <div className="overflow-hidden rounded-lg border border-gray-300">
          <table className="w-full bg-transparent">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-3 text-left font-semibold text-gray-700 bg-transparent">Subject</th>
                <th className="p-3 text-center font-semibold text-gray-700 bg-transparent">Score (%)</th>
                <th className="p-3 text-center font-semibold text-gray-700 bg-transparent">Grade</th>
                <th className="p-3 text-left font-semibold text-gray-700 bg-transparent">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0 bg-transparent">
                  <td className="p-3 bg-transparent">{subject.name}</td>
                  <td className="p-3 text-center bg-transparent">{subject.score}</td>
                  <td className="p-3 text-center font-bold text-lg bg-transparent">{subject.grade}</td>
                  <td className="p-3 bg-transparent">{subject.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Summary and Performance */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 relative z-10">
        <Card className="p-4 bg-white/80 border-0 shadow-sm">
          <h3 className="font-semibold text-base mb-3 text-center text-blue-900">Overall Performance</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-xs text-gray-600">Total Marks</p>
              <p className="text-xl font-bold text-gray-800">{totalMarks}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Average</p>
              <p className="text-xl font-bold text-gray-800">{average}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Grade</p>
              <p className="text-xl font-bold text-blue-900">{overallGrade}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white/80 border-0 shadow-sm">
          <h3 className="font-semibold text-base mb-3 text-blue-900">Class Teacher's Comments</h3>
          <div className="bg-gray-50/70 p-3 rounded-md">
            <p className="text-xs text-gray-800">
              {student?.name} has shown excellent performance this term. Keep up the good work in Mathematics and continue reading more to improve English comprehension skills.
            </p>
          </div>
        </Card>
      </section>

      {/* Signatures */}
      <section className="grid grid-cols-3 gap-6 pt-4 relative z-10">
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-2">
            <p className="text-xs font-semibold">Class Teacher</p>
            <p className="text-xs text-gray-500">Ms. Sarah Namubiru</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-2">
            <p className="text-xs font-semibold">Head Teacher</p>
            <p className="text-xs text-gray-500">Mr. John Kasozi</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-2">
            <p className="text-xs font-semibold">Parent/Guardian</p>
            <p className="text-xs text-gray-500">Signature & Date</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-6 pt-3 border-t border-gray-200 text-xs text-gray-500 relative z-10">
        <p>This report is a confidential document of Springing Stars Junior School</p>
        <p>Generated on {new Date().toLocaleDateString()} • Report ID: MS{Date.now()}</p>
      </footer>
    </div>
  );
};
