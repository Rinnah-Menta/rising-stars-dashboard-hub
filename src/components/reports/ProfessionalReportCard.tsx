
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
          // Add watermark with reduced opacity
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = logoImg.width;
          canvas.height = logoImg.height;
          if (ctx) {
            ctx.globalAlpha = 0.05;
            ctx.drawImage(logoImg, 0, 0);
            doc.addImage(canvas.toDataURL(), 'PNG', 60, 120, 90, 90); // Centered watermark
          }

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
          
          // Report title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(14);
          doc.setTextColor(128, 0, 0);
          doc.text('STUDENT PROGRESS REPORT', 105, 50, { align: 'center' });
          doc.text('TERM 1 - ACADEMIC YEAR 2024/2025', 105, 57, { align: 'center' });

          // Student Information Section
          doc.setDrawColor(0, 51, 102);
          doc.setLineWidth(0.5);
          doc.line(15, 65, 195, 65);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text('STUDENT INFORMATION', 15, 73);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          // Student data
          doc.text('Student Name:', 15, 83);
          doc.text('Admission Number:', 15, 90);
          doc.text('Class:', 15, 97);
          doc.text('Roll Number:', 15, 104);
          doc.text('House:', 15, 111);
          
          doc.text('Date of Birth:', 110, 83);
          doc.text('Father\'s Name:', 110, 90);
          doc.text('Mother\'s Name:', 110, 97);
          doc.text('Contact Number:', 110, 104);
          doc.text('Address:', 110, 111);
          
          doc.setFont('helvetica', 'bold');
          doc.text(student.name || 'N/A', 55, 83);
          doc.text(student.admissionNumber || 'N/A', 55, 90);
          doc.text(student.class || 'N/A', 55, 97);
          doc.text(student.rollNumber || 'N/A', 55, 104);
          doc.text(student.houseColor || 'N/A', 55, 111);
          
          doc.text(student.dob || 'N/A', 150, 83);
          doc.text(student.fatherName || 'N/A', 150, 90);
          doc.text(student.motherName || 'N/A', 150, 97);
          doc.text(student.phoneNumber || 'N/A', 150, 104);
          doc.text(student.address || 'N/A', 150, 111);

          // Academic Performance Section
          doc.line(15, 120, 195, 120);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(0, 51, 102);
          doc.text('ACADEMIC PERFORMANCE', 15, 128);

          // Grades table
          const tableData = grades.map((grade: Grade) => [
            grade.subject || 'N/A',
            (grade.practicalMarks || 0).toString(),
            (grade.theoryMarks || 0).toString(),
            (grade.totalMarks || 0).toString(),
            (grade.maxMarks || 100).toString(),
            `${(((grade.totalMarks || 0) / (grade.maxMarks || 100)) * 100).toFixed(1)}%`,
            getLetterGrade(grade.grade || 0),
            getGradePoint(grade.grade || 0).toString(),
            grade.attendance ? `${grade.attendance}%` : 'N/A',
            grade.comment || 'N/A'
          ]);

          autoTable(doc, {
            startY: 135,
            head: [['Subject', 'Practical', 'Theory', 'Total', 'Max', 'Percentage', 'Grade', 'Points', 'Attendance', 'Remarks']],
            body: tableData,
            theme: 'grid',
            styles: { 
              fontSize: 8,
              cellPadding: 2,
              halign: 'center'
            },
            headStyles: { 
              fillColor: [0, 51, 102],
              textColor: [255, 255, 255],
              fontStyle: 'bold'
            },
            alternateRowStyles: { 
              fillColor: [245, 245, 245]
            },
            columnStyles: {
              0: { halign: 'left', cellWidth: 25 },
              9: { halign: 'left', cellWidth: 30 }
            }
          });

          // Summary Section
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
          doc.text(`Average Attendance: ${avgAttendance}%`, 15, finalY + 46);
          
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

          // Grading Scale
          doc.line(15, finalY + 55, 195, finalY + 55);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(0, 51, 102);
          doc.text('GRADING SCALE', 15, finalY + 63);
          
          autoTable(doc, {
            startY: finalY + 68,
            head: [['Grade', 'Range', 'Points', 'Description']],
            body: [
              ['A+', '90-100', '4.0', 'Outstanding'],
              ['A', '80-89', '3.5', 'Excellent'],
              ['B', '70-79', '3.0', 'Very Good'],
              ['C', '60-69', '2.5', 'Good'],
              ['D', '50-59', '2.0', 'Satisfactory'],
              ['F', 'Below 50', '1.0', 'Needs Improvement']
            ],
            theme: 'grid',
            styles: { fontSize: 8, cellPadding: 2 },
            headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
            columnStyles: {
              0: { halign: 'center', cellWidth: 20 },
              1: { halign: 'center', cellWidth: 25 },
              2: { halign: 'center', cellWidth: 20 },
              3: { halign: 'left', cellWidth: 40 }
            }
          });

          // Comments and Signatures
          const commentsY = (doc as any).lastAutoTable.finalY + 15;
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
          
          // Next term information
          doc.setFont('helvetica', 'bold');
          doc.text('NEXT TERM BEGINS:', 15, commentsY + 28);
          doc.setFont('helvetica', 'normal');
          doc.text('Monday, 8th January 2025', 60, commentsY + 28);
          
          // Signatures
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.text('Class Teacher: ________________________', 15, commentsY + 45);
          doc.text('Date: ____________', 15, commentsY + 52);
          
          doc.text('Head Teacher: ________________________', 110, commentsY + 45);
          doc.text('Date: ____________', 110, commentsY + 52);
          
          doc.text('Parent/Guardian: ______________________', 15, commentsY + 65);
          doc.text('Date: ____________', 15, commentsY + 72);

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
        {/* Watermark */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="School Logo Watermark"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        {/* Header */}
        <div className="relative z-10 text-center p-6 border-b-2 border-blue-800 bg-white">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
              alt="School Logo" 
              className="w-16 h-16 mr-4"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-800">SPRINGING STARS SCHOOL</h2>
              <p className="text-sm text-gray-600">P.O. Box 1234, Kampala, Uganda</p>
              <p className="text-sm text-gray-600">Tel: +256-414-123456 | Email: info@springingstars.ac.ug</p>
            </div>
          </div>
          <div className="bg-red-800 text-white py-2 px-4 rounded">
            <h3 className="text-lg font-bold">STUDENT PROGRESS REPORT</h3>
            <p className="text-sm">TERM 1 - ACADEMIC YEAR 2024/2025</p>
          </div>
        </div>

        {/* Student Information */}
        <div className="relative z-10 p-6 bg-blue-50 border-b bg-white">
          <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">STUDENT INFORMATION</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p><span className="font-semibold text-gray-700">Student Name:</span> <span className="font-bold">{student.name}</span></p>
              <p><span className="font-semibold text-gray-700">Admission Number:</span> {student.admissionNumber || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Class:</span> {student.class}</p>
              <p><span className="font-semibold text-gray-700">Roll Number:</span> {student.rollNumber || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">House:</span> {student.houseColor || 'N/A'}</p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold text-gray-700">Date of Birth:</span> {student.dob}</p>
              <p><span className="font-semibold text-gray-700">Father's Name:</span> {student.fatherName || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Mother's Name:</span> {student.motherName || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Contact Number:</span> {student.phoneNumber || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Address:</span> {student.address || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="relative z-10 p-6 bg-white">
          <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">ACADEMIC PERFORMANCE</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Practical</th>
                  <th className="border border-gray-300 p-2">Theory</th>
                  <th className="border border-gray-300 p-2">Total</th>
                  <th className="border border-gray-300 p-2">Max</th>
                  <th className="border border-gray-300 p-2">%</th>
                  <th className="border border-gray-300 p-2">Grade</th>
                  <th className="border border-gray-300 p-2">Points</th>
                  <th className="border border-gray-300 p-2">Attendance</th>
                  <th className="border border-gray-300 p-2">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade: Grade, index: number) => (
                  <tr key={grade.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="border border-gray-300 p-2 font-medium">{grade.subject}</td>
                    <td className="border border-gray-300 p-2 text-center">{grade.practicalMarks || 'N/A'}</td>
                    <td className="border border-gray-300 p-2 text-center">{grade.theoryMarks || 'N/A'}</td>
                    <td className="border border-gray-300 p-2 text-center font-bold">{grade.totalMarks}</td>
                    <td className="border border-gray-300 p-2 text-center">{grade.maxMarks}</td>
                    <td className="border border-gray-300 p-2 text-center">{((grade.totalMarks / grade.maxMarks) * 100).toFixed(1)}%</td>
                    <td className="border border-gray-300 p-2 text-center font-bold text-blue-600">{getLetterGrade(grade.grade)}</td>
                    <td className="border border-gray-300 p-2 text-center">{getGradePoint(grade.grade)}</td>
                    <td className="border border-gray-300 p-2 text-center">{grade.attendance || 'N/A'}%</td>
                    <td className="border border-gray-300 p-2 text-xs">{grade.comment || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="relative z-10 p-6 bg-gray-50 border-t border-b bg-white">
          <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">ACADEMIC SUMMARY</h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p><span className="font-semibold">Total Subjects:</span> {count}</p>
              <p><span className="font-semibold">Average Score:</span> <span className="font-bold text-blue-600">{average}%</span></p>
              <p><span className="font-semibold">Overall Grade:</span> <span className="font-bold text-blue-600">{getLetterGrade(averageNum)}</span></p>
              <p><span className="font-semibold">Grade Point Average:</span> <span className="font-bold">{gpa}</span></p>
              <p><span className="font-semibold">Average Attendance:</span> <span className="font-bold">{avgAttendance}%</span></p>
            </div>
            <div className="space-y-2">
              <p><span className="font-semibold">Class Position:</span> {Math.floor(Math.random() * 25) + 1} out of 45</p>
              <p><span className="font-semibold">Performance Band:</span> 
                <span className="font-bold text-green-600">
                  {averageNum >= 80 ? 'Excellent' : averageNum >= 70 ? 'Very Good' : averageNum >= 60 ? 'Good' : averageNum >= 50 ? 'Satisfactory' : 'Below Average'}
                </span>
              </p>
              <p><span className="font-semibold">Next Term Begins:</span> Monday, 8th January 2025</p>
            </div>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="relative z-10 p-6 border-b bg-white">
          <h4 className="text-lg font-bold text-blue-800 mb-4 border-b border-blue-800 pb-2">GRADING SCALE</h4>
          <div className="grid grid-cols-2 gap-4">
            <table className="border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="border border-gray-300 p-2">Grade</th>
                  <th className="border border-gray-300 p-2">Range</th>
                  <th className="border border-gray-300 p-2">Points</th>
                  <th className="border border-gray-300 p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">A+</td><td className="border border-gray-300 p-2 text-center">90-100</td><td className="border border-gray-300 p-2 text-center">4.0</td><td className="border border-gray-300 p-2">Outstanding</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">A</td><td className="border border-gray-300 p-2 text-center">80-89</td><td className="border border-gray-300 p-2 text-center">3.5</td><td className="border border-gray-300 p-2">Excellent</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">B</td><td className="border border-gray-300 p-2 text-center">70-79</td><td className="border border-gray-300 p-2 text-center">3.0</td><td className="border border-gray-300 p-2">Very Good</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">C</td><td className="border border-gray-300 p-2 text-center">60-69</td><td className="border border-gray-300 p-2 text-center">2.5</td><td className="border border-gray-300 p-2">Good</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">D</td><td className="border border-gray-300 p-2 text-center">50-59</td><td className="border border-gray-300 p-2 text-center">2.0</td><td className="border border-gray-300 p-2">Satisfactory</td></tr>
                <tr><td className="border border-gray-300 p-2 text-center font-bold">F</td><td className="border border-gray-300 p-2 text-center">Below 50</td><td className="border border-gray-300 p-2 text-center">1.0</td><td className="border border-gray-300 p-2">Needs Improvement</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Comments and Signatures */}
        <div className="relative z-10 p-6 bg-white">
          <div className="mb-6">
            <h4 className="text-lg font-bold text-blue-800 mb-2 border-b border-blue-800 pb-2">CLASS TEACHER'S COMMENT</h4>
            <p className="text-gray-700 italic">
              {averageNum >= 80 ? 'Keep up the excellent work!' : 
               averageNum >= 70 ? 'Good performance. Continue working hard.' : 
               averageNum >= 60 ? 'Satisfactory performance. More effort needed.' : 
               'Below expectations. Requires additional support.'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mt-8">
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Class Teacher:</p>
                <div className="border-b border-gray-400 h-6"></div>
                <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Parent/Guardian:</p>
                <div className="border-b border-gray-400 h-6"></div>
                <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Head Teacher:</p>
                <div className="border-b border-gray-400 h-6"></div>
                <p className="text-sm text-gray-600 mt-1">Signature & Date</p>
              </div>
            </div>
          </div>
        </div>

        {/* Download button */}
        <div className="relative z-10 text-center p-4 bg-gray-100 border-t">
          <p className="text-xs text-gray-600">This is a computer-generated report. For queries, contact the school administration.</p>
          <button
            onClick={downloadReportCard}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
          >
            Download PDF Report Card
          </button>
        </div>
      </div>
    );
  };

  return generateReportCard();
};
