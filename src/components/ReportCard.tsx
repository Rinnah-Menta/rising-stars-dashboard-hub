
import { Card, CardContent } from "@/components/ui/card";

interface ReportCardProps {
  data: {
    studentId: string;
    studentName: string;
    class: string;
    section: string;
    rollNumber: string;
    subjects: {
      name: string;
      marks: number;
      maxMarks: number;
      grade: string;
    }[];
    term: string;
    totalMarks: number;
    maxTotalMarks: number;
    percentage: number;
    overallGrade: string;
  };
}

export const ReportCard = ({ data }: ReportCardProps) => {
  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case "A+": return "text-green-600";
      case "A": return "text-blue-600";
      case "B+": return "text-yellow-600";
      case "B": return "text-orange-600";
      case "C": return "text-purple-600";
      case "F": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white print:shadow-none print:border">
      <CardContent className="p-0">
        {/* Watermark */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <div className="text-8xl font-bold text-gray-400 transform rotate-45">
              EDUMA NAGE PRO
            </div>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 text-center relative">
            <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">EP</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">EduManage Pro School</h1>
            <p className="text-lg opacity-90">Academic Excellence Report</p>
            <div className="mt-4 text-sm opacity-75">
              123 Education Street, Knowledge City, State 12345
            </div>
          </div>

          {/* Student Info */}
          <div className="p-8 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              STUDENT REPORT CARD - {data.term}
            </h2>
            
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Student Name:</span>
                  <span className="text-gray-900 font-medium">{data.studentName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Student ID:</span>
                  <span className="text-gray-900">{data.studentId}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Class:</span>
                  <span className="text-gray-900">{data.class} - Section {data.section}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Roll Number:</span>
                  <span className="text-gray-900">{data.rollNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Academic Year:</span>
                  <span className="text-gray-900">2024-2025</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-32">Date:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Subject-wise Performance</h3>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Subject</th>
                    <th className="px-6 py-4 text-center font-semibold">Marks Obtained</th>
                    <th className="px-6 py-4 text-center font-semibold">Maximum Marks</th>
                    <th className="px-6 py-4 text-center font-semibold">Percentage</th>
                    <th className="px-6 py-4 text-center font-semibold">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.subjects.map((subject, index) => (
                    <tr key={subject.name} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="px-6 py-4 font-medium text-gray-900">{subject.name}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{subject.marks}</td>
                      <td className="px-6 py-4 text-center text-gray-700">{subject.maxMarks}</td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {Math.round((subject.marks / subject.maxMarks) * 100)}%
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-bold text-lg ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <td className="px-6 py-4 font-bold text-lg">TOTAL</td>
                    <td className="px-6 py-4 text-center font-bold text-lg">{data.totalMarks}</td>
                    <td className="px-6 py-4 text-center font-bold text-lg">{data.maxTotalMarks}</td>
                    <td className="px-6 py-4 text-center font-bold text-lg">{data.percentage}%</td>
                    <td className="px-6 py-4 text-center font-bold text-xl">{data.overallGrade}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="p-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-green-200">
                <div className="text-3xl font-bold text-green-600 mb-2">{data.percentage}%</div>
                <div className="text-gray-700 font-medium">Overall Percentage</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-blue-200">
                <div className={`text-3xl font-bold mb-2 ${getGradeColor(data.overallGrade)}`}>
                  {data.overallGrade}
                </div>
                <div className="text-gray-700 font-medium">Overall Grade</div>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {data.subjects.filter(s => ["A+", "A"].includes(s.grade)).length}
                </div>
                <div className="text-gray-700 font-medium">A+ & A Grades</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="w-48 border-b border-gray-400 mb-2"></div>
                <div className="text-sm font-medium text-gray-700">Class Teacher</div>
              </div>
              
              <div className="text-center">
                <div className="w-48 border-b border-gray-400 mb-2"></div>
                <div className="text-sm font-medium text-gray-700">Principal</div>
              </div>
              
              <div className="text-center">
                <div className="w-48 border-b border-gray-400 mb-2"></div>
                <div className="text-sm font-medium text-gray-700">Parent's Signature</div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p className="mb-2">This is a computer-generated report card. No signature required.</p>
              <p>For any queries, please contact the school administration.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
