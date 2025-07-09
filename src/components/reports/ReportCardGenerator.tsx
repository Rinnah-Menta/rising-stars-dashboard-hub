
import React, { useState } from 'react';
import { ProfessionalReportCard } from './ProfessionalReportCard';

interface Student {
  id: string;
  name: string;
  class: string;
  dob: string;
  admissionNumber: string;
  rollNumber: string;
  section: string;
  houseColor: string;
  fatherName: string;
  motherName: string;
  address: string;
  phoneNumber: string;
}

interface Grade {
  id: number;
  student_id: string;
  subject: string;
  grade: number;
  teacher: string;
  comment: string;
  attendance: number | null;
  practicalMarks?: number;
  theoryMarks?: number;
  totalMarks: number;
  maxMarks: number;
}

interface ReportCardGeneratorProps {
  data: { students: Student[]; grades: Grade[] };
}

export const ReportCardGenerator: React.FC<ReportCardGeneratorProps> = ({ data }) => {
  const [studentId, setStudentId] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Generate Report Cards</h2>
      <div className="mb-6 p-4 bg-white rounded-lg shadow">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-3 rounded-lg w-64 mr-4"
        >
          <option value="">Select Student</option>
          {data.students.map((student: Student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.id})
            </option>
          ))}
        </select>
        <button 
          onClick={() => setStudentId(studentId)} 
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Generate Report Card
        </button>
      </div>
      
      {studentId && (
        <div className="mt-6">
          <ProfessionalReportCard data={data} studentId={studentId} />
        </div>
      )}
    </div>
  );
};
