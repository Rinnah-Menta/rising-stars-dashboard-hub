export interface ReportStudent {
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

export interface ReportGrade {
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

export interface ReportData {
  students: ReportStudent[];
  grades: ReportGrade[];
}

export interface ReportSelections {
  selectedStudentId: string;
  selectedTerm: string;
  selectedClass: string;
}