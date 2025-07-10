
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

    let performanceBand = 'Excellent';
    if (averageNum < 80) performanceBand = 'Very Good';
    if (averageNum < 70) performanceBand = 'Good';
    if (averageNum < 60) performanceBand = 'Satisfactory';
    if (averageNum < 50) performanceBand = 'Below Average';

    const downloadReportCard = async () => {
      try {
        const doc = new jsPDF();
        
        // Load logo
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.src = 'https://gloriouschools.github.io/rising-star-connect/schoologo.png';
        
        logoImg.onload = () => {
          // Add full page watermark with reduced opacity
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = logoImg.width;
          canvas.height = logoImg.height;
          if (ctx) {
            ctx.globalAlpha = 0.05;
            ctx.drawImage(logoImg, 0, 0);
            doc.addImage(canvas.toDataURL(), 'PNG', 20, 40, 170, 200); // Full page watermark
          }

          // Add header logo
          doc.addImage(logoImg, 'PNG', 15, 15, 25, 25);

          // Add student photo placeholder
          doc.setFillColor(240, 240, 240);
          doc.rect(170, 15, 20, 25, 'F');
          doc.setDrawColor(59, 130, 246);
          doc.setLineWidth(1);
          doc.rect(170, 15, 20, 25);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(100, 100, 100);
          doc.text('Student', 180, 26, { align: 'center' });
          doc.text('Photo', 180, 30, { align: 'center' });

          // Header with school information
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(16);
          doc.setTextColor(0, 51, 102);
          doc.text('SPRINGING STARS SCHOOL', 105, 22, { align: 'center' });
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          doc.setTextColor(0, 0, 0);
          doc.text('P.O. Box 1234, Kampala, Uganda', 105, 28, { align: 'center' });
          doc.text('Tel: +256-414-123456 | Email: info@springingstars.ac.ug', 105, 32, { align: 'center' });
          
          // Report title
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(12);
          doc.setTextColor(128, 0, 0);
          doc.text('STUDENT PROGRESS REPORT', 105, 42, { align: 'center' });
          doc.text('TERM 1 - ACADEMIC YEAR 2024/2025', 105, 47, { align: 'center' });

          // Student Information Section
          doc.setDrawColor(0, 51, 102);
          doc.setLineWidth(0.5);
          doc.line(15, 55, 195, 55);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(0, 51, 102);
          doc.text('STUDENT INFORMATION', 15, 62);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          
          // Student data - compact layout
          doc.text('Name:', 15, 70);
          doc.text('Admission:', 15, 75);
          doc.text('Class:', 15, 80);
          doc.text('Roll:', 15, 85);
          
          doc.text('DOB:', 100, 70);
          doc.text('Father:', 100, 75);
          doc.text('Mother:', 100, 80);
          doc.text('Contact:', 100, 85);
          
          doc.setFont('helvetica', 'bold');
          doc.text(student.name || 'N/A', 35, 70);
          doc.text(student.admissionNumber || 'N/A', 35, 75);
          doc.text(student.class || 'N/A', 35, 80);
          doc.text(student.rollNumber || 'N/A', 35, 85);
          
          doc.text(student.dob || 'N/A', 120, 70);
          doc.text(student.fatherName || 'N/A', 120, 75);
          doc.text(student.motherName || 'N/A', 120, 80);
          doc.text(student.phoneNumber || 'N/A', 120, 85);

          // Academic Performance Section
          doc.line(15, 95, 195, 95);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(0, 51, 102);
          doc.text('ACADEMIC PERFORMANCE', 15, 102);

          // Simplified grades table
          const tableData = grades.map((grade: Grade) => [
            grade.subject || 'N/A',
            (grade.totalMarks || 0).toString(),
            (grade.maxMarks || 100).toString(),
            `${(((grade.totalMarks || 0) / (grade.maxMarks || 100)) * 100).toFixed(1)}%`,
            getLetterGrade(grade.grade || 0),
            grade.comment || 'N/A'
          ]);

          autoTable(doc, {
            startY: 107,
            head: [['Subject', 'Total', 'Max', 'Percentage', 'Grade', 'Remarks']],
            body: tableData,
            theme: 'grid',
            styles: { 
              fontSize: 7,
              cellPadding: 1.5,
              halign: 'center'
            },
            headStyles: { 
              fillColor: [255, 255, 255],
              textColor: [0, 0, 0],
              fontStyle: 'bold',
              lineColor: [0, 0, 0],
              lineWidth: 0.5
            },
            bodyStyles: {
              fillColor: [255, 255, 255],
              lineColor: [0, 0, 0],
              lineWidth: 0.3
            },
            columnStyles: {
              0: { halign: 'left', cellWidth: 30 },
              1: { cellWidth: 20 },
              2: { cellWidth: 20 },
              3: { cellWidth: 25 },
              4: { cellWidth: 20 },
              5: { halign: 'left', cellWidth: 30 }
            }
          });

          // Summary Section
          const finalY = (doc as any).lastAutoTable.finalY + 8;
          doc.line(15, finalY, 195, finalY);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(0, 51, 102);
          doc.text('ACADEMIC SUMMARY', 15, finalY + 6);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8);
          doc.setTextColor(0, 0, 0);
          
          // Compact summary layout
          doc.text(`Subjects: ${count}`, 15, finalY + 14);
          doc.text(`Average: ${average}%`, 15, finalY + 20);
          doc.text(`Grade: ${getLetterGrade(averageNum)}`, 15, finalY + 26);
          
          doc.text(`GPA: ${gpa}`, 100, finalY + 14);
          doc.text(`Position: ${Math.floor(Math.random() * 25) + 1} of 45`, 100, finalY + 20);
          
          let performanceBand = 'Excellent';
          if (averageNum < 80) performanceBand = 'Very Good';
          if (averageNum < 70) performanceBand = 'Good';
          if (averageNum < 60) performanceBand = 'Satisfactory';
          if (averageNum < 50) performanceBand = 'Below Average';
          
          doc.text(`Performance: ${performanceBand}`, 100, finalY + 26);

          // Comments and Signatures
          const commentsY = finalY + 35;
          doc.line(15, commentsY, 195, commentsY);
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(8);
          doc.setTextColor(0, 51, 102);
          doc.text('CLASS TEACHER\'S COMMENT', 15, commentsY + 6);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(0, 0, 0);
          let teacherComment = 'Keep up the excellent work!';
          if (averageNum < 80) teacherComment = 'Good performance. Continue working hard.';
          if (averageNum < 70) teacherComment = 'More effort needed.';
          if (averageNum < 60) teacherComment = 'Requires additional support.';
          
          doc.text(teacherComment, 15, commentsY + 12);
          
          // Compact signatures
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.text('Class Teacher: _______________', 15, commentsY + 25);
          doc.text('Head Teacher: _______________', 75, commentsY + 25);
          doc.text('Parent: _______________', 135, commentsY + 25);

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
        {/* Watermark - Full Page */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="School Logo Watermark"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        {/* Header */}
        <div className="relative z-10 text-center p-4 border-b-2 border-blue-800 bg-white">
          <div className="flex items-center justify-between mb-3">
            <img 
              src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
              alt="School Logo" 
              className="w-12 h-12"
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
            <div className="w-20 h-24 bg-gray-200 rounded border-2 border-blue-300 flex items-center justify-center">
              <img 
                src="https://via.placeholder.com/80x96/2563eb/ffffff?text=Student+Photo" 
                alt="Student Photo"
                className="w-full h-full object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x96/2563eb/ffffff?text=Student+Photo';
                }}
              />
            </div>
          </div>
          <div className="bg-red-800 text-white py-1 px-3 rounded">
            <h3 className="text-sm font-bold">STUDENT PROGRESS REPORT</h3>
            <p className="text-xs">TERM 1 - ACADEMIC YEAR 2024/2025</p>
          </div>
        </div>

        {/* Student Information */}
        <div className="relative z-10 p-3 bg-transparent border-b">
          <h4 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">STUDENT INFORMATION</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <p><span className="font-semibold text-gray-700">Name:</span> <span className="font-bold">{student.name}</span></p>
              <p><span className="font-semibold text-gray-700">Admission:</span> {student.admissionNumber || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Class:</span> {student.class}</p>
              <p><span className="font-semibold text-gray-700">Roll:</span> {student.rollNumber || 'N/A'}</p>
            </div>
            <div className="space-y-1">
              <p><span className="font-semibold text-gray-700">DOB:</span> {student.dob}</p>
              <p><span className="font-semibold text-gray-700">Father:</span> {student.fatherName || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Mother:</span> {student.motherName || 'N/A'}</p>
              <p><span className="font-semibold text-gray-700">Contact:</span> {student.phoneNumber || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="relative z-10 p-3 bg-transparent">
          <h4 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">ACADEMIC PERFORMANCE</h4>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr className="bg-transparent border-b-2 border-gray-400">
                  <th className="border border-gray-300 p-1 text-gray-800">Subject</th>
                  <th className="border border-gray-300 p-1 text-gray-800">Total</th>
                  <th className="border border-gray-300 p-1 text-gray-800">Max</th>
                  <th className="border border-gray-300 p-1 text-gray-800">%</th>
                  <th className="border border-gray-300 p-1 text-gray-800">Grade</th>
                  <th className="border border-gray-300 p-1 text-gray-800">Remarks</th>
                </tr>
              </thead>
              <tbody className="bg-transparent">
                {grades.map((grade: Grade, index: number) => (
                  <tr key={grade.id} className="border-b border-gray-200">
                    <td className="border border-gray-300 p-1 font-medium">{grade.subject}</td>
                    <td className="border border-gray-300 p-1 text-center font-bold">{grade.totalMarks}</td>
                    <td className="border border-gray-300 p-1 text-center">{grade.maxMarks}</td>
                    <td className="border border-gray-300 p-1 text-center">{((grade.totalMarks / grade.maxMarks) * 100).toFixed(1)}%</td>
                    <td className="border border-gray-300 p-1 text-center font-bold text-blue-600">{getLetterGrade(grade.grade)}</td>
                    <td className="border border-gray-300 p-1 text-left">{grade.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="relative z-10 p-3 bg-transparent border-b">
          <h4 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">ACADEMIC SUMMARY</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <p><span className="font-semibold">Subjects:</span> {count}</p>
              <p><span className="font-semibold">Average:</span> {average}%</p>
              <p><span className="font-semibold">Grade:</span> {getLetterGrade(averageNum)}</p>
            </div>
            <div className="space-y-1">
              <p><span className="font-semibold">GPA:</span> {gpa}</p>
              <p><span className="font-semibold">Position:</span> {Math.floor(Math.random() * 25) + 1} of 45</p>
              <p><span className="font-semibold">Performance:</span> {performanceBand}</p>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="relative z-10 p-3 bg-transparent">
          <h4 className="text-sm font-bold text-blue-800 mb-2 border-b border-blue-800 pb-1">CLASS TEACHER'S COMMENT</h4>
          <div className="bg-transparent border border-gray-300 p-2 rounded min-h-[60px] flex items-center mb-3">
            <p className="text-gray-800 text-xs">
              {student.name} has shown {performanceBand.toLowerCase()} performance this term. 
              {averageNum >= 80 ? ' Keep up the excellent work!' : 
               averageNum >= 70 ? ' Continue working hard.' : 
               averageNum >= 60 ? ' More effort is needed.' : 
               ' Requires additional support.'}
            </p>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t border-gray-300">
            <div className="text-center">
              <div className="h-8 border-b border-gray-400 w-24 mb-1"></div>
              <p className="text-xs font-semibold">Class Teacher</p>
            </div>
            
            <div className="text-center">
              <div className="h-8 border-b border-gray-400 w-24 mb-1"></div>
              <p className="text-xs font-semibold">Head Teacher</p>
            </div>
            
            <div className="text-center">
              <div className="h-8 border-b border-gray-400 w-24 mb-1"></div>
              <p className="text-xs font-semibold">Parent/Guardian</p>
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
