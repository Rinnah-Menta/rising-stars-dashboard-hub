
import React, { useState, useEffect } from 'react';
import { ReportManager } from '../reports/ReportManager';

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

const initialData = {
  students: [
    { 
      id: "S001", 
      name: "John Doe", 
      class: "10A", 
      dob: "2008-05-15",
      admissionNumber: "ADM2023001",
      rollNumber: "101",
      section: "A",
      houseColor: "Blue",
      fatherName: "Robert Doe",
      motherName: "Mary Doe",
      address: "123 Main Street, Kampala",
      phoneNumber: "+256 701 234 567"
    },
    { 
      id: "S002", 
      name: "Jane Smith", 
      class: "10B", 
      dob: "2008-07-22",
      admissionNumber: "ADM2023002",
      rollNumber: "102",
      section: "B",
      houseColor: "Red",
      fatherName: "James Smith",
      motherName: "Sarah Smith",
      address: "456 Oak Avenue, Kampala",
      phoneNumber: "+256 702 345 678"
    },
    { 
      id: "S003", 
      name: "Alice Johnson", 
      class: "11A", 
      dob: "2007-03-10",
      admissionNumber: "ADM2022001",
      rollNumber: "201",
      section: "A",
      houseColor: "Green",
      fatherName: "Michael Johnson",
      motherName: "Linda Johnson",
      address: "789 Pine Road, Kampala",
      phoneNumber: "+256 703 456 789"
    },
  ],
  grades: [
    { id: 1, student_id: "S001", subject: "Mathematics", grade: 85, teacher: "Mr. Brown", comment: "Shows strong analytical skills.", attendance: 95, practicalMarks: 40, theoryMarks: 45, totalMarks: 85, maxMarks: 100 },
    { id: 2, student_id: "S001", subject: "English Language", grade: 90, teacher: "Ms. Green", comment: "Excellent writing abilities.", attendance: 92, practicalMarks: 45, theoryMarks: 45, totalMarks: 90, maxMarks: 100 },
    { id: 3, student_id: "S001", subject: "Physics", grade: 78, teacher: "Dr. Wilson", comment: "Good understanding of concepts.", attendance: 88, practicalMarks: 35, theoryMarks: 43, totalMarks: 78, maxMarks: 100 },
    { id: 4, student_id: "S001", subject: "Chemistry", grade: 82, teacher: "Mrs. Davis", comment: "Excellent laboratory skills.", attendance: 90, practicalMarks: 38, theoryMarks: 44, totalMarks: 82, maxMarks: 100 },
    { id: 5, student_id: "S001", subject: "Biology", grade: 88, teacher: "Dr. White", comment: "Outstanding performance.", attendance: 96, practicalMarks: 42, theoryMarks: 46, totalMarks: 88, maxMarks: 100 },
    { id: 6, student_id: "S001", subject: "History", grade: 80, teacher: "Mr. Black", comment: "Good grasp of historical concepts.", attendance: 93, practicalMarks: 0, theoryMarks: 80, totalMarks: 80, maxMarks: 100 },
    { id: 7, student_id: "S001", subject: "Geography", grade: 75, teacher: "Ms. Taylor", comment: "Needs improvement in map work.", attendance: 87, practicalMarks: 30, theoryMarks: 45, totalMarks: 75, maxMarks: 100 },
    { id: 8, student_id: "S001", subject: "Computer Science", grade: 92, teacher: "Mr. Anderson", comment: "Exceptional programming skills.", attendance: 98, practicalMarks: 47, theoryMarks: 45, totalMarks: 92, maxMarks: 100 },
    { id: 9, student_id: "S002", subject: "Mathematics", grade: 78, teacher: "Mr. Brown", comment: "Needs to practice algebra.", attendance: 88, practicalMarks: 35, theoryMarks: 43, totalMarks: 78, maxMarks: 100 },
    { id: 10, student_id: "S002", subject: "English Language", grade: 85, teacher: "Ms. Green", comment: "Good comprehension skills.", attendance: 90, practicalMarks: 40, theoryMarks: 45, totalMarks: 85, maxMarks: 100 },
  ],
};

export const Reports: React.FC = () => {
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem('schoolData') || 'null') || initialData);
  const [nextGradeId, setNextGradeId] = useState(Math.max(...data.grades.map((g: Grade) => g.id), 0) + 1);

  useEffect(() => {
    localStorage.setItem('schoolData', JSON.stringify(data));
  }, [data]);

  return (
    <ReportManager 
      data={data} 
      setData={setData} 
      nextGradeId={nextGradeId} 
      setNextGradeId={setNextGradeId} 
    />
  );
};
