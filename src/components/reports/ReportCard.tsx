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
    <div className="p-8 bg-white relative">
      {/* Watermark - Made more visible and properly positioned */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none z-0">
        <img 
          src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
          alt="Watermark" 
          className="w-96 h-96 object-contain"
        />
      </div>

      {/* School Header */}
      <header className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="Springing Stars Logo" 
            className="h-20 w-20 object-contain"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-900">SPRINGING STARS JUNIOR SCHOOL</h1>
            <p className="text-md text-blue-700">Excellence in Education • Nurturing Future Leaders</p>
            <p className="text-sm text-gray-600">P.O. Box 1234, Kampala, Uganda | Tel: +256 700 000 000</p>
          </div>
        </div>
        <div className="border-t-4 border-b-4 border-double border-blue-900 py-2 mt-4">
          <h2 className="text-2xl font-semibold text-blue-900 tracking-wider">STUDENT PROGRESS REPORT</h2>
        </div>
      </header>

      {/* Student Information */}
      <section className="mb-8 relative z-10">
        <Card className="bg-white/80">
          <CardContent className="p-6 grid grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Student Name:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">{student?.name}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Term:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">{term}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Class:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">{studentClass}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Academic Year:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">2024</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Student ID:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">SS{student?.id.toString().padStart(4, '0')}</span>
            </div>
            <div className="flex items-baseline">
              <span className="font-semibold text-gray-700 w-32">Date Issued:</span>
              <span className="flex-1 border-b border-dotted border-gray-400 px-2 text-gray-900">{new Date().toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Grades Table */}
      <section className="mb-8 relative z-10">
        <Card className="bg-white/80">
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-blue-50/80">
                <tr>
                  <th className="p-4 text-left font-semibold text-gray-700">Subject</th>
                  <th className="p-4 text-center font-semibold text-gray-700">Score (%)</th>
                  <th className="p-4 text-center font-semibold text-gray-700">Grade</th>
                  <th className="p-4 text-left font-semibold text-gray-700">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                    <td className="p-4">{subject.name}</td>
                    <td className="p-4 text-center">{subject.score}</td>
                    <td className="p-4 text-center font-bold text-lg">{subject.grade}</td>
                    <td className="p-4">{subject.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </section>
      
      {/* Summary and Performance */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 relative z-10">
        <Card className="p-6 bg-white/80">
          <h3 className="font-semibold text-lg mb-4 text-center text-blue-900">Overall Performance</h3>
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Marks</p>
            <p className="text-3xl font-bold text-gray-800">{totalMarks}</p>
          </div>
          <div className="text-center my-4">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-3xl font-bold text-gray-800">{average}%</p>
          </div>
          <div className="text-center bg-blue-100 rounded-lg p-3">
            <p className="text-sm font-semibold text-blue-800">Overall Grade</p>
            <p className="text-4xl font-extrabold text-blue-900">{overallGrade}</p>
          </div>
        </Card>

        <Card className="p-6 bg-white/80">
          <h3 className="font-semibold text-lg mb-4 text-blue-900">Grading Scale</h3>
          <div className="text-sm space-y-2 text-gray-700">
            <div className="flex justify-between"><span>A: 85-100%</span> <span>Excellent</span></div>
            <div className="flex justify-between"><span>A-: 80-84%</span> <span>Very Good</span></div>
            <div className="flex justify-between"><span>B+: 75-79%</span> <span>Good</span></div>
            <div className="flex justify-between"><span>B: 65-74%</span> <span>Fair</span></div>
            <div className="flex justify-between"><span>C+: 55-64%</span> <span>Satisfactory</span></div>
            <div className="flex justify-between"><span>C: 45-54%</span> <span>Needs Improvement</span></div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80">
          <h3 className="font-semibold text-lg mb-4 text-blue-900">Class Performance</h3>
          <div className="text-sm space-y-3 text-gray-700">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Class Average:</span>
              <span className="font-bold text-lg">76%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Student Position:</span>
              <span className="font-bold text-lg">3rd <span className="text-sm font-normal">out of 25</span></span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Highest Score:</span>
              <span className="font-bold text-lg">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Lowest Score:</span>
              <span className="font-bold text-lg">58%</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Teacher Comments */}
      <section className="mb-8 relative z-10">
        <Card className="bg-white/80">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-blue-900">Class Teacher's Comments</h3>
            <div className="bg-gray-50/70 p-4 rounded-md min-h-[80px]">
              <p className="text-sm text-gray-800">
                {student?.name} has shown excellent performance this term. Keep up the good work in Mathematics and continue reading more to improve English comprehension skills.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Signatures */}
      <section className="grid grid-cols-3 gap-8 pt-8 relative z-10">
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-3">
            <p className="text-sm font-semibold">Class Teacher</p>
            <p className="text-xs text-gray-500">Ms. Sarah Namubiru</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-3">
            <p className="text-sm font-semibold">Head Teacher</p>
            <p className="text-xs text-gray-500">Mr. John Kasozi</p>
          </div>
        </div>
        <div className="text-center">
          <div className="border-t-2 border-gray-300 pt-3">
            <p className="text-sm font-semibold">Parent/Guardian</p>
            <p className="text-xs text-gray-500">Signature & Date</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-12 pt-6 border-t border-gray-200 text-xs text-gray-500 relative z-10">
        <p>This report is a confidential document of Springing Stars Junior School</p>
        <p>Generated on {new Date().toLocaleDateString()} • Report ID: MS{Date.now()}</p>
      </footer>
    </div>
  );
};
