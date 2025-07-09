
import React, { useState } from 'react';

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

interface GradeManagerProps {
  data: { students: Student[]; grades: Grade[] };
  setData: React.Dispatch<any>;
  nextGradeId: number;
  setNextGradeId: React.Dispatch<React.SetStateAction<number>>;
}

export const GradeManager: React.FC<GradeManagerProps> = ({ 
  data, 
  setData, 
  nextGradeId, 
  setNextGradeId 
}) => {
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [teacher, setTeacher] = useState('');
  const [comment, setComment] = useState('');
  const [attendance, setAttendance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const gradeNum = parseInt(grade);
    setData({
      ...data,
      grades: [
        ...data.grades,
        {
          id: nextGradeId,
          student_id: studentId,
          subject,
          grade: gradeNum,
          teacher,
          comment,
          attendance: attendance ? parseInt(attendance) : null,
          practicalMarks: Math.floor(gradeNum * 0.4),
          theoryMarks: Math.ceil(gradeNum * 0.6),
          totalMarks: gradeNum,
          maxMarks: 100,
        },
      ],
    });
    setNextGradeId(nextGradeId + 1);
    setStudentId('');
    setSubject('');
    setGrade('');
    setTeacher('');
    setComment('');
    setAttendance('');
  };

  const deleteGrade = (id: number) => {
    if (window.confirm('Are you sure you want to delete this grade?')) {
      setData({
        ...data,
        grades: data.grades.filter((g: Grade) => g.id !== id),
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-blue-900">Enter Grades</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Student</option>
          {data.students.map((student: Student) => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.id})
            </option>
          ))}
        </select>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade (0-100)"
          min="0"
          max="100"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
          placeholder="Subject Teacher"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Teacher Comment"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          placeholder="Attendance (%)"
          min="0"
          max="100"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add Grade
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2">Student ID</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Grade</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Comment</th>
            <th className="border p-2">Attendance</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.grades.map((grade: Grade) => {
            const student = data.students.find((s: Student) => s.id === grade.student_id);
            return student ? (
              <tr key={grade.id}>
                <td className="border p-2">{grade.student_id}</td>
                <td className="border p-2">{grade.subject}</td>
                <td className="border p-2">{grade.grade}/100</td>
                <td className="border p-2">{grade.teacher || 'N/A'}</td>
                <td className="border p-2">{grade.comment || ''}</td>
                <td className="border p-2">{grade.attendance || 'N/A'}%</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteGrade(grade.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
};
