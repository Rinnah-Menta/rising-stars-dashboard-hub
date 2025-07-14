
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
          <div className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 text-center">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">EP</span>
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">EduManage Pro School</h1>
                <p className="text-sm opacity-90">Academic Excellence Report</p>
                <div className="text-xs opacity-75">
                  123 Education Street, Knowledge City, State 12345
                </div>
              </div>

              {/* Student Photo */}
              <div className="w-24 h-32 bg-white/20 rounded-lg flex items-center justify-center border-2 border-white/30">
                <img 
                  src="https://via.placeholder.com/120x150/4f46e5/ffffff?text=Student+Photo" 
                  alt="Student Photo"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/120x150/4f46e5/ffffff?text=Student+Photo';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="relative z-10 p-4 bg-transparent">
            <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
              STUDENT REPORT CARD - {data.term}
            </h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">Name:</span>
                  <span className="text-gray-900 font-medium">{data.studentName}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">ID:</span>
                  <span className="text-gray-900">{data.studentId}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">Class:</span>
                  <span className="text-gray-900">{data.class} - {data.section}</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">Roll:</span>
                  <span className="text-gray-900">{data.rollNumber}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">Year:</span>
                  <span className="text-gray-900">2024-2025</span>
                </div>
                <div className="flex">
                  <span className="font-semibold text-gray-700 w-20">Date:</span>
                  <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grades Table */}
          <div className="relative z-10 p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Subject-wise Performance</h3>
            
            <div className="overflow-hidden rounded-lg border border-gray-300">
              <table className="w-full">
                <thead className="bg-transparent border-b-2 border-gray-300">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-800 text-sm border-r border-gray-300">Subject</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">Marks</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">Max</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">%</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm">Grade</th>
                  </tr>
                </thead>
                <tbody className="bg-transparent">
                  {data.subjects.map((subject, index) => (
                    <tr key={subject.name} className="border-b border-gray-200">
                      <td className="px-3 py-2 font-medium text-gray-900 text-sm border-r border-gray-200">{subject.name}</td>
                      <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">{subject.marks}</td>
                      <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">{subject.maxMarks}</td>
                      <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">
                        {Math.round((subject.marks / subject.maxMarks) * 100)}%
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`font-bold text-sm ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-transparent border-t-2 border-gray-400">
                  <tr>
                    <td className="px-3 py-2 font-bold text-sm border-r border-gray-300">TOTAL</td>
                    <td className="px-3 py-2 text-center font-bold text-sm border-r border-gray-300">{data.totalMarks}</td>
                    <td className="px-3 py-2 text-center font-bold text-sm border-r border-gray-300">{data.maxTotalMarks}</td>
                    <td className="px-3 py-2 text-center font-bold text-sm border-r border-gray-300">{data.percentage}%</td>
                    <td className="px-3 py-2 text-center font-bold text-lg">{data.overallGrade}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="relative z-10 p-4 bg-transparent">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-transparent rounded border border-gray-300">
                <div className="text-xl font-bold text-green-600 mb-1">{data.percentage}%</div>
                <div className="text-gray-700 font-medium text-xs">Overall %</div>
              </div>
              
              <div className="text-center p-3 bg-transparent rounded border border-gray-300">
                <div className={`text-xl font-bold mb-1 ${getGradeColor(data.overallGrade)}`}>
                  {data.overallGrade}
                </div>
                <div className="text-gray-700 font-medium text-xs">Overall Grade</div>
              </div>
              
              <div className="text-center p-3 bg-transparent rounded border border-gray-300">
                <div className="text-xl font-bold text-purple-600 mb-1">
                  {data.subjects.filter(s => ["A+", "A"].includes(s.grade)).length}
                </div>
                <div className="text-gray-700 font-medium text-xs">A+ & A Grades</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 p-4 bg-transparent border-t border-gray-300">
            <div className="flex justify-between items-center mb-4">
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
            
            <div className="text-center text-xs text-gray-600">
              <p>This is a computer-generated report card.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
