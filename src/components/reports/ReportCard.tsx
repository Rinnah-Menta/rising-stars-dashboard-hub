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
    <div className="p-4 bg-white relative min-h-screen">
      {/* Full Page Watermark */}
      <div className="fixed inset-0 flex items-center justify-center opacity-3 pointer-events-none z-0">
        <img 
          src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
          alt="Watermark" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header with Logo at Top Center */}
      <header className="text-center mb-4 relative z-10">
        <div className="flex items-center justify-center mb-2">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="Springing Stars Logo" 
            className="h-20 w-20 object-contain"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-900">SPRINGING STARS JUNIOR SCHOOL</h1>
          <p className="text-xs text-blue-700">Excellence in Education • Nurturing Future Leaders</p>
        </div>
        <div className="border-t-2 border-b-2 border-blue-900 py-1 mt-2">
          <h2 className="text-lg font-semibold text-blue-900 tracking-wider">STUDENT PROGRESS REPORT</h2>
        </div>
      </header>

      {/* Student Photo and Info Section */}
      <div className="flex gap-4 mb-4 relative z-10">
        {/* Student Photo - More Prominent */}
        <div className="flex-shrink-0">
          <div className="w-24 h-32 bg-gray-100 border-2 border-gray-400 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-xs font-medium">Student</div>
              <div className="text-xs">Photo</div>
            </div>
          </div>
        </div>

        {/* Student Information - Compact */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Name:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">{student?.name}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Term:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">{term}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Class:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">{studentClass}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Year:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">2024</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Student ID:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">SS{student?.id.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-20">Date:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-1 text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grades Table - Transparent */}
      <section className="mb-3 relative z-10">
        <div className="border border-gray-300 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2 text-left font-semibold text-gray-700 text-xs">Subject</th>
                <th className="p-2 text-center font-semibold text-gray-700 text-xs">Score (%)</th>
                <th className="p-2 text-center font-semibold text-gray-700 text-xs">Grade</th>
                <th className="p-2 text-left font-semibold text-gray-700 text-xs">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="p-2 text-xs">{subject.name}</td>
                  <td className="p-2 text-center text-xs">{subject.score}</td>
                  <td className="p-2 text-center font-bold text-sm">{subject.grade}</td>
                  <td className="p-2 text-xs">{subject.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Summary and Performance - Compact */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3 relative z-10">
        <div className="p-3 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-center text-blue-900">Overall Performance</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <p className="text-xs text-gray-600">Total Marks</p>
              <p className="text-lg font-bold text-gray-800">{totalMarks}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Average</p>
              <p className="text-lg font-bold text-gray-800">{average}%</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600">Grade</p>
              <p className="text-lg font-bold text-blue-900">{overallGrade}</p>
            </div>
          </div>
        </div>

        <div className="p-3 border border-gray-300 rounded-lg">
          <h3 className="font-semibold text-sm mb-2 text-blue-900">Class Teacher's Comments</h3>
          <div className="p-2 border border-gray-200 rounded">
            <p className="text-xs text-gray-800">
              {student?.name} has shown excellent performance this term. Keep up the good work in Mathematics and continue reading more to improve English comprehension skills.
            </p>
          </div>
        </div>
      </section>

      {/* Signatures - Compact */}
      <section className="grid grid-cols-3 gap-4 pt-2 relative z-10">
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-1">
            <p className="text-xs font-semibold">Class Teacher</p>
            <p className="text-xs text-gray-500">Ms. Sarah Namubiru</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-1">
            <p className="text-xs font-semibold">Head Teacher</p>
            <p className="text-xs text-gray-500">Mr. John Kasozi</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-1">
            <p className="text-xs font-semibold">Parent/Guardian</p>
            <p className="text-xs text-gray-500">Signature & Date</p>
          </div>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="text-center mt-3 pt-2 border-t border-gray-200 text-xs text-gray-500 relative z-10">
        <p>This report is a confidential document of Springing Stars Junior School</p>
        <p>Generated on {new Date().toLocaleDateString()} • Report ID: MS{Date.now()}</p>
      </footer>
    </div>
  );
};
