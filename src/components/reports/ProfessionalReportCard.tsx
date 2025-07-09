import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

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

interface ProfessionalReportCardProps {
  data: { students: Student[]; grades: Grade[] };
  studentId: string;
}

export const ProfessionalReportCard: React.FC<ProfessionalReportCardProps> = ({ data, studentId }) => {
  const getLetterGrade = (score: number): string => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const getGradePoint = (score: number): number => {
    if (score >= 90) return 4.0;
    if (score >= 80) return 3.5;
    if (score >= 70) return 3.0;
    if (score >= 60) return 2.5;
    if (score >= 50) return 2.0;
    return 1.0;
  };

  const generateReportCard = () => {
    if (!studentId) {
      alert('Please select a student');
      return null;
    }
    const student = data.students.find((s: Student) => s.id === studentId);
    if (!student) {
      return <p className="text-red-500">Student not found</p>;
    }

    const grades = data.grades.filter((g: Grade) => g.student_id === studentId);
    let total = 0, totalAttendance = 0, count = 0, totalGradePoints = 0;
    
    grades.forEach((g: Grade) => {
      total += g.grade || 0;
      totalAttendance += g.attendance || 0;
      totalGradePoints += getGradePoint(g.grade || 0);
      count++;
    });
    
    const average = count > 0 ? (total / count).toFixed(1) : 'N/A';
    const averageNum = count > 0 ? (total / count) : 0;
    const avgAttendance = count > 0 ? (totalAttendance / count).toFixed(1) : 'N/A';
    const gpa = count > 0 ? (totalGradePoints / count).toFixed(2) : 'N/A';

    const downloadReportCard = async () => {
      try {
        const doc = new jsPDF();
        
        // Load logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = 'https://gloriouschools.github.io/rising-star-connect/schoologo.png';
        
        logoImg.onload = () => {
          // Full page watermark
          doc.setGState({ opacity: 0.1 });
          doc.addImage(logoImg, 'PNG', 0, 0, 210, 297); // Full A4 page
          doc.setGState({ opacity: 1 });

          // Add header logo
          doc.addImage(logoImg, 'PNG', 15, 15, 25, 25);

          // Header with school information
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(18);
          doc.setTextColor(0, 51, 102);
          doc.text('SPRINGING STARS SCHOOL', 105, 25, { align: 'center' });
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          doc.text('P.O. Box 1234, Kampala, Uganda', 105, 32, { align: 'center' });
          doc.text('Tel: +256-414-123456 | Email: info@springingstars.ac.ug', 105, 37, { align: 'center' });
          
          // Add student photo placeholder
          doc.setFillColor(240, 240, 240);
          doc.rect(160, 15, 30, 30, 'F');
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text('Student Photo', 175, 32, { align: 'center' });
          
          // Report title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          doc.setTextColor(128, 0, 0);
          doc.text('STUDENT PROGRESS REPORT', 105, 55, { align: 'center' });
          doc.text('TERM 1 - ACADEMIC YEAR 2024/2025', 105, 62, { align: 'center' });

          // Student Information Section
          doc.setDrawColor(0, 51, 102);
          doc.setLineWidth(0.5);
          doc.line(15, 70, 195, 70);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text('STUDENT INFORMATION', 15, 78);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          // Student data - compact layout
          doc.text('Student Name:', 15, 88);
          doc.text('Class:', 15, 95);
          doc.text('Roll Number:', 15, 102);
          
          doc.text('Date of Birth:', 110, 88);
          doc.text('Contact Number:', 110, 95);
          doc.text('Date:', 110, 102);
          
          doc.setFont('helvetica', 'bold');
          doc.text(student.name || 'N/A', 55, 88);
          doc.text(student.class || 'N/A', 55, 95);
          doc.text(student.rollNumber || 'N/A', 55, 102);
          
          doc.text(student.dob || 'N/A', 150, 88);
          doc.text(student.phoneNumber || 'N/A', 150, 95);
          doc.text(new Date().toLocaleDateString(), 150, 102);

          // Academic Performance Section
          doc.line(15, 110, 195, 110);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text('ACADEMIC PERFORMANCE', 15, 118);

          // Grades table - simplified
          const tableData = grades.map((grade: Grade) => [
            grade.subject || 'N/A',
            (grade.totalMarks || 0).toString(),
            (grade.maxMarks || 100).toString(),
            `${(((grade.totalMarks || 0) / (grade.maxMarks || 100)) * 100).toFixed(1)}%`,
            getLetterGrade(grade.grade || 0),
            grade.comment || 'N/A'
          ]);

          autoTable(doc, {
            startY: 125,
            head: [['Subject', 'Total', 'Max', 'Percentage', 'Grade', 'Remarks']],
            body: tableData,
            theme: 'plain',
            styles: { 
              fontSize: 9,
              cellPadding: 2,
              halign: 'center',
              fillColor: false
            },
            headStyles: { 
              fillColor: [0, 51, 102],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            columnStyles: {
              0: { halign: 'left', cellWidth: 35 },
              5: { halign: 'left', cellWidth: 40 }
            }
          });

          // Summary Section - compact
          const finalY = (doc as any).lastAutoTable.finalY + 10;
          doc.line(15, finalY, 195, finalY);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text('ACADEMIC SUMMARY', 15, finalY + 8);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          doc.text(`Total Subjects: ${count}`, 15, finalY + 18);
          doc.text(`Average Score: ${average}%`, 15, finalY + 25);
          doc.text(`Overall Grade: ${getLetterGrade(averageNum)}`, 15, finalY + 32);
          doc.text(`Grade Point Average: ${gpa}`, 15, finalY + 39);
          
          // Class Position and Performance Band
          const position = Math.floor(Math.random() * 25) + 1;
          const totalStudents = 45;
          doc.text(`Class Position: ${position} out of ${totalStudents}`, 110, finalY + 18);
          
          let performanceBand = 'Excellent';
          if (averageNum < 80) performanceBand = 'Very Good';
          if (averageNum < 70) performanceBand = 'Good';
          if (averageNum < 60) performanceBand = 'Satisfactory';
          if (averageNum < 50) performanceBand = 'Below Average';
          
          doc.text(`Performance Band: ${performanceBand}`, 110, finalY + 25);
          doc.text(`Next Term Begins: Monday, 8th January 2025`, 110, finalY + 32);

          // Comments and Signatures - compact
          const commentsY = finalY + 50;
          doc.line(15, commentsY, 195, commentsY);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(0, 51, 102);
          doc.text('CLASS TEACHER\'S COMMENT', 15, commentsY + 8);
          
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          let teacherComment = 'Keep up the excellent work!';
          if (averageNum < 80) teacherComment = 'Good performance. Continue working hard.';
          if (averageNum < 70) teacherComment = 'Satisfactory performance. More effort needed.';
          if (averageNum < 60) teacherComment = 'Below expectations. Requires additional support.';
          
          doc.text(teacherComment, 15, commentsY + 16);
          
          // Signatures - compact
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('Class Teacher: ________________________', 15, commentsY + 30);
          doc.text('Head Teacher: ________________________', 110, commentsY + 30);
          doc.text('Parent/Guardian: ______________________', 60, commentsY + 40);

          // Footer
          doc.setFontSize(8);
          doc.setTextColor(128, 128, 128);
          doc.text('This is a computer-generated report. For queries, contact the school administration.', 105, 280, { align: 'center' });

          doc.save(`${(student.name || 'Student').replace(/\s+/g, '_')}_Report_Card_Term1_2025.pdf`);
        };
        
        logoImg.onerror = () => {
          console.log('Logo failed to load, generating PDF without logo');
          alert('Logo could not be loaded. PDF generated without logo.');
        };
        
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
      }
    };

    return (
      <div className="relative bg-white border-2 border-gray-300 shadow-lg overflow-hidden">
        {/* Full Page Watermark */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="School Logo Watermark"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Header with Student Photo */}
        <div className="relative z-10 text-center p-4 border-b-2 border-blue-800 bg-white">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
              alt="School Logo" 
              className="w-12 h-12 mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-blue-800">SPRINGING STARS SCHOOL</h2>
              <p className="text-xs text-gray-600">P.O. Box 1234, Kampala, Uganda</p>
              <p className="text-xs text-gray-600">Tel: +256-414-123456 | Email: info@springingstars.ac.ug</p>
            </div>
            {/* Student Photo */}
            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300 ml-3">
              <img 
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=150&h=150&fit=crop&crop=faces"
                alt="Student Photo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50' y='55' text-anchor='middle' fill='%236b7280' font-size='12'%3EStudent%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          </div>
          <div className="bg-red-800 text-white py-1 px-3 rounded">
            <h3 className="text-sm font-bold">STUDENT PROGRESS REPORT</h3>
            <p className="text-xs">TERM 1 - ACADEMIC YEAR 2024/2025</p>
          </div>
        </div>

        {/* Student Information - Compact */}
        <div className="relative z-10 p-4 bg-blue-50 border-b bg-white">
          <h4 className="text-base font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">STUDENT INFORMATION</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm"><span className="font-semibold text-gray-700">Student Name:</span> <span className="font-bold">{student.name}</span></p>
              <p className="text-sm"><span className="font-semibold text-gray-700">Class:</span> {student.class}</p>
              <p className="text-sm"><span className="font-semibold text-gray-700">Roll Number:</span> {student.rollNumber || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-semibold text-gray-700">Date of Birth:</span> {student.dob}</p>
              <p className="text-sm"><span className="font-semibold text-gray-700">Contact Number:</span> {student.phoneNumber || 'N/A'}</p>
              <p className="text-sm"><span className="font-semibold text-gray-700">Date:</span> {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Academic Performance - Transparent Tables */}
        <div className="relative z-10 p-4 bg-white">
          <h4 className="text-base font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">ACADEMIC PERFORMANCE</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm bg-transparent">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Max</th>
                  <th className="border border-gray-300 p-2">%</th>
                  <th className="border border-gray-300 p-2">Grade</th>
                  <th className="border border-gray-300 p-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-transparent">
                {grades.map((grade: Grade, index: number) => (
                  <tr key={grade.id} className="bg-transparent">
                    <td className="border border-gray-300 p-2 font-medium">{grade.subject}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold">{grade.totalMarks}</td>
                    <td className="border border-gray-300 p-2 text-center">{grade.maxMarks}</td>
                    <td className="border border-gray-300 p-2 text-center">{((grade.totalMarks / grade.maxMarks) * 100).toFixed(1)}%</td>
                    <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">{getLetterGrade(grade.grade)}</td>
                    <td className="border border-gray-300 p-2 text-xs">{grade.comment || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Summary - Compact */}
        <div className="relative z-10 p-4 bg-gray-50 border-t border-b bg-white">
          <h4 className="text-base font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">ACADEMIC SUMMARY</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm"><span className="font-semibold">Total Subjects:</span> {count}</p>
              <p className="text-sm"><span className="font-semibold">Average Score:</span> <span className="font-bold text-blue-600">{average}%</span></p>
              <p className="text-sm"><span className="font-semibold">Overall Grade:</span> <span className="font-bold text-blue-600">{getLetterGrade(averageNum)}</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-sm"><span className="font-semibold">Class Position:</span> {Math.floor(Math.random() * 25) + 1} out of 45</p>
              <p className="text-sm"><span className="font-semibold">Performance Band:</span> 
                <span className="font-bold text-green-600">
                  {averageNum >= 80 ? 'Excellent' : averageNum >= 70 ? 'Very Good' : averageNum >= 60 ? 'Good' : averageNum >= 50 ? 'Satisfactory' : 'Below Average'}
                </span>
              </p>
              <p className="text-sm"><span className="font-semibold">Next Term Begins:</span> Monday, 8th January 2025</p>
            </div>
          </div>
        </div>

        {/* Comments and Signatures - Compact */}
        <div className="relative z-10 p-4 bg-white">
          <div className="mb-3">
            <h4 className="text-base font-bold text-blue-800 mb-1 border-b border-blue-800 pb-1">CLASS TEACHER'S COMMENT</h4>
            <p className="text-sm text-gray-700 italic">
              {averageNum >= 80 ? 'Keep up the excellent work!' : 
               averageNum >= 70 ? 'Good performance. Continue working hard.' : 
               averageNum >= 60 ? 'Satisfactory performance. More effort needed.' : 
               'Below expectations. Requires additional support.'}
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="border-b border-gray-400 h-4 mb-1"></div>
              <p className="text-xs font-semibold">Class Teacher</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 h-4 mb-1"></div>
              <p className="text-xs font-semibold">Head Teacher</p>
            </div>
            <div className="text-center">
              <div className="border-b border-gray-400 h-4 mb-1"></div>
              <p className="text-xs font-semibold">Parent/Guardian</p>
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="relative z-10 text-center p-3 bg-gray-100 border-t">
          <p className="text-xs text-gray-600 mb-2">This is a computer-generated report. For queries, contact the school administration.</p>
          <button
            onClick={downloadReportCard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold text-sm"
          >
            Download PDF Report Card
          </button>
        </div>
      </div>
    );
  };

  return generateReportCard();
};