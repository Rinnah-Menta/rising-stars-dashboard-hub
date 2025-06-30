
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

interface StudentManagerProps {
  data: { students: Student[]; grades: Grade[] };
  setData: React.Dispatch<any>;
}

export const StudentManager: React.FC<StudentManagerProps> = ({ data, setData }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [dob, setDob] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.students.some((s: Student) => s.id === id)) {
      alert('Student ID already exists.');
      return;
    }
    setData({
      ...data,
      students: [...data.students, { 
        id, 
        name, 
        class: studentClass, 
        dob,
        admissionNumber: `ADM${new Date().getFullYear()}${String(data.students.length + 1).padStart(3, '0')}`,
        rollNumber: String(data.students.length + 1),
        section: 'A',
        houseColor: 'Blue',
        fatherName: '',
        motherName: '',
        address: '',
        phoneNumber: ''
      }],
    });
    setName('');
    setId('');
    setStudentClass('');
    setDob('');
  };

  const deleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student and their grades?')) {
      setData({
        students: data.students.filter((s: Student) => s.id !== id),
        grades: data.grades.filter((g: Grade) => g.student_id !== id),
      });
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-blue-900">Manage Students</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Student Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Student ID"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          placeholder="Class (e.g., 10A)"
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="Date of Birth"
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Add Student
        </button>
      </form>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Date of Birth</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.students.map((student: Student) => (
            <tr key={student.id}>
              <td className="border p-2">{student.id}</td>
              <td className="border p-2">{student.name}</td>
              <td className="border p-2">{student.class}</td>
              <td className="border p-2">{student.dob}</td>
              <td className="border p-2">
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
