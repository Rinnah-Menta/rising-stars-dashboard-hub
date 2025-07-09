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
    <div className="max-w-4xl mx-auto print:max-w-none">
      <div className="relative overflow-hidden bg-transparent">
        {/* Full Page Watermark - Large */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="School Logo Watermark"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 text-center py-4">
          <img 
            src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" 
            alt="School Logo"
            className="w-16 h-16 mx-auto mb-2"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <h1 className="text-xl font-bold text-gray-800">EduManage Pro School</h1>
          <p className="text-sm text-gray-600">Academic Excellence Report</p>
        </div>

        <div className="relative z-10 flex gap-4 p-4">
          {/* Student Photo - Left Side */}
          <div className="flex-shrink-0">
            <div className="w-32 h-40 bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden">
              <img 
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e5e7eb;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23d1d5db;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='150' height='150' fill='url(%23grad)'/%3E%3Ccircle cx='75' cy='60' r='25' fill='%236b7280'/%3E%3Cpath d='M45 110 Q45 90 75 90 Q105 90 105 110 L105 140 L45 140 Z' fill='%236b7280'/%3E%3Ctext x='75' y='130' text-anchor='middle' fill='%23374151' font-size='8' font-weight='bold'%3EStudent Photo%3C/text%3E%3C/svg%3E"
                alt="Student Photo Placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Report Card Content */}
          <div className="flex-1">
            {/* Student Info */}
            <div className="bg-transparent p-4 border border-gray-200 rounded-lg mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3 text-center">
                STUDENT REPORT CARD - {data.term}
              </h2>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">Name:</span>
                    <span className="text-gray-900">{data.studentName}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">ID:</span>
                    <span className="text-gray-900">{data.studentId}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">Class:</span>
                    <span className="text-gray-900">{data.class}-{data.section}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">Roll No:</span>
                    <span className="text-gray-900">{data.rollNumber}</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">Year:</span>
                    <span className="text-gray-900">2024-25</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-gray-700 w-24">Date:</span>
                    <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transparent Grades Table */}
            <div className="mb-4">
              <h3 className="text-base font-bold text-gray-800 mb-2">Subject-wise Performance</h3>
              
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full bg-transparent">
                  <thead>
                    <tr className="bg-transparent border-b border-gray-300">
                      <th className="px-3 py-2 text-left font-semibold text-gray-800 text-sm border-r border-gray-300">Subject</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">Marks</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">Max</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm border-r border-gray-300">%</th>
                      <th className="px-3 py-2 text-center font-semibold text-gray-800 text-sm">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent">
                    {data.subjects.map((subject, index) => (
                      <tr key={subject.name} className="border-b border-gray-200 bg-transparent">
                        <td className="px-3 py-2 font-medium text-gray-900 text-sm border-r border-gray-200">{subject.name}</td>
                        <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">{subject.marks}</td>
                        <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">{subject.maxMarks}</td>
                        <td className="px-3 py-2 text-center text-gray-700 text-sm border-r border-gray-200">
                          {Math.round((subject.marks / subject.maxMarks) * 100)}%
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`font-bold ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-transparent border-t-2 border-gray-400">
                      <td className="px-3 py-2 font-bold text-gray-900 text-sm border-r border-gray-300">TOTAL</td>
                      <td className="px-3 py-2 text-center font-bold text-gray-900 text-sm border-r border-gray-300">{data.totalMarks}</td>
                      <td className="px-3 py-2 text-center font-bold text-gray-900 text-sm border-r border-gray-300">{data.maxTotalMarks}</td>
                      <td className="px-3 py-2 text-center font-bold text-gray-900 text-sm border-r border-gray-300">{data.percentage}%</td>
                      <td className="px-3 py-2 text-center font-bold text-lg">{data.overallGrade}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Compact Performance Summary */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="text-center p-2 bg-transparent border border-gray-300 rounded">
                <div className="text-lg font-bold text-green-600">{data.percentage}%</div>
                <div className="text-gray-700 text-xs">Overall %</div>
              </div>
              
              <div className="text-center p-2 bg-transparent border border-gray-300 rounded">
                <div className={`text-lg font-bold ${getGradeColor(data.overallGrade)}`}>
                  {data.overallGrade}
                </div>
                <div className="text-gray-700 text-xs">Grade</div>
              </div>
            </div>

            {/* Compact Footer */}
            <div className="border-t border-gray-300 pt-2">
              <div className="flex justify-between text-xs">
                <div className="text-center">
                  <div className="w-20 border-b border-gray-400 mb-1"></div>
                  <div className="text-gray-700">Class Teacher</div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 border-b border-gray-400 mb-1"></div>
                  <div className="text-gray-700">Principal</div>
                </div>
                
                <div className="text-center">
                  <div className="w-20 border-b border-gray-400 mb-1"></div>
                  <div className="text-gray-700">Parent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
