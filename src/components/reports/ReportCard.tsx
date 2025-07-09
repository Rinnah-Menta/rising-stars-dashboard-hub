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
        <div className="relative overflow-hidden">
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
          <div className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 text-center">
            <div className="flex items-center justify-between mb-4">
              <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">EP</span>
                </div>
              </div>
              
              {/* Student Photo */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/20 rounded-lg overflow-hidden border-2 border-white/30">
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
            
            <h1 className="text-2xl font-bold mb-2">EduManage Pro School</h1>
            <p className="text-base opacity-90">Academic Excellence Report</p>
            <div className="mt-3 text-sm opacity-75">
              123 Education Street, Knowledge City, State 12345
            </div>
          </div>

          {/* Student Info */}
          <div className="relative z-10 p-6 bg-gradient-to-r from-gray-50 to-blue-50">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              STUDENT REPORT CARD - {data.term}
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Student Name:</span>
                  <span className="text-gray-900 font-medium">{data.studentName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Student ID:</span>
                  <span className="text-gray-900">{data.studentId}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Class:</span>
                  <span className="text-gray-900">{data.class} - Section {data.section}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Roll Number:</span>
                  <span className="text-gray-900">{data.rollNumber}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Academic Year:</span>
                  <span className="text-gray-900">2024-2025</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-28">Date:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grades Table - Transparent */}
          <div className="relative z-10 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Subject-wise Performance</h3>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <table className="w-full bg-transparent">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Subject</th>
                    <th className="px-4 py-3 text-center font-semibold">Marks Obtained</th>
                    <th className="px-4 py-3 text-center font-semibold">Maximum Marks</th>
                    <th className="px-4 py-3 text-center font-semibold">Percentage</th>
                    <th className="px-4 py-3 text-center font-semibold">Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent">
                  {data.subjects.map((subject, index) => (
                    <tr key={subject.name} className="border-b border-gray-200 bg-transparent">
                      <td className="px-4 py-3 font-medium text-gray-900">{subject.name}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{subject.marks}</td>
                      <td className="px-4 py-3 text-center text-gray-700">{subject.maxMarks}</td>
                      <td className="px-4 py-3 text-center text-gray-700">
                        {Math.round((subject.marks / subject.maxMarks) * 100)}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`font-bold text-lg ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <td className="px-4 py-3 font-bold text-base">TOTAL</td>
                    <td className="px-4 py-3 text-center font-bold text-base">{data.totalMarks}</td>
                    <td className="px-4 py-3 text-center font-bold text-base">{data.maxTotalMarks}</td>
                    <td className="px-4 py-3 text-center font-bold text-base">{data.percentage}%</td>
                    <td className="px-4 py-3 text-center font-bold text-lg">{data.overallGrade}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Performance Summary - Compact */}
          <div className="relative z-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-white/70 rounded-lg shadow-sm border border-green-200">
                <div className="text-2xl font-bold text-green-600 mb-1">{data.percentage}%</div>
                <div className="text-gray-700 font-medium text-sm">Overall Percentage</div>
              </div>
              
              <div className="text-center p-4 bg-white/70 rounded-lg shadow-sm border border-blue-200">
                <div className={`text-2xl font-bold mb-1 ${getGradeColor(data.overallGrade)}`}>
                  {data.overallGrade}
                </div>
                <div className="text-gray-700 font-medium text-sm">Overall Grade</div>
              </div>
            </div>
          </div>

          {/* Footer - Compact */}
          <div className="relative z-10 p-4 bg-gray-50 border-t">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="w-32 border-b border-gray-400 mb-1"></div>
                <div className="text-xs font-medium text-gray-700">Class Teacher</div>
              </div>
              
              <div className="text-center">
                <div className="w-32 border-b border-gray-400 mb-1"></div>
                <div className="text-xs font-medium text-gray-700">Principal</div>
              </div>
              
              <div className="text-center">
                <div className="w-32 border-b border-gray-400 mb-1"></div>
                <div className="text-xs font-medium text-gray-700">Parent's Signature</div>
              </div>
            </div>
            
            <div className="mt-3 text-center text-xs text-gray-600">
              <p>This is a computer-generated report card. No signature required.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
