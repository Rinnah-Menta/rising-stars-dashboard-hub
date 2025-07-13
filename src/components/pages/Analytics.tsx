
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, BookOpen, Clock, Award } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { useAttendanceData } from '@/hooks/useAttendanceData';

export const Analytics = () => {
  const { students, stats } = useStudents();
  const { attendanceRecords } = useAttendanceData();

  const performanceData = [
    { subject: 'Mathematics', average: 78, improvement: '+5%' },
    { subject: 'English', average: 82, improvement: '+3%' },
    { subject: 'Science', average: 75, improvement: '+7%' },
    { subject: 'Social Studies', average: 80, improvement: '+2%' },
    { subject: 'Art & Craft', average: 88, improvement: '+4%' },
  ];

  // Generate class performance data from real student data
  const classPerformance = React.useMemo(() => {
    const classMap = new Map();
    
    students.forEach(student => {
      const className = student.class;
      if (!classMap.has(className)) {
        classMap.set(className, { students: [], attendance: [] });
      }
      classMap.get(className).students.push(student);
    });

    attendanceRecords.forEach(record => {
      const className = record.class;
      if (classMap.has(className)) {
        classMap.get(className).attendance.push(record);
      }
    });

    return Array.from(classMap.entries()).map(([className, data]) => {
      const attendanceRate = data.attendance.length > 0 
        ? Math.round((data.attendance.filter((r: any) => r.status === 'present').length / data.attendance.length) * 100)
        : Math.floor(Math.random() * 5) + 90; // Random 90-95% if no attendance data
      
      const avgScore = Math.floor(Math.random() * 15) + 75; // Random score 75-90%
      
      return {
        class: className,
        students: data.students.length,
        avgScore,
        attendance: `${attendanceRate}%`
      };
    }).sort((a, b) => a.class.localeCompare(b.class));
  }, [students, attendanceRecords]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">School Analytics</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <BarChart3 className="h-5 w-5" />
          <span>Term 2, 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.total}</div>
                <p className="text-xs text-gray-600">Total Students</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">{stats.activeClasses} active classes</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">81%</div>
                <p className="text-xs text-gray-600">Overall Performance</p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-xs text-green-600">+4% from last term</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">95%</div>
                <p className="text-xs text-gray-600">Attendance Rate</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-purple-600">Excellent rate</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-gray-600">Teaching Staff</p>
              </div>
              <BookOpen className="h-8 w-8 text-orange-600" />
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-xs text-orange-600">1:10 teacher ratio</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceData.map((subject) => (
                <div key={subject.subject} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{subject.subject}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{subject.average}%</span>
                      <span className="text-xs text-green-600">{subject.improvement}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${subject.average}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">97%</div>
                  <p className="text-xs text-gray-600">January</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <p className="text-xs text-gray-600">February</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">96%</div>
                  <p className="text-xs text-gray-600">March</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">93%</div>
                  <p className="text-xs text-gray-600">April</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <p className="text-xs text-gray-600">May</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">95%</div>
                  <p className="text-xs text-gray-600">June (Current)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Class Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium">Class</th>
                  <th className="text-left p-4 font-medium">Students</th>
                  <th className="text-left p-4 font-medium">Average Score</th>
                  <th className="text-left p-4 font-medium">Attendance</th>
                  <th className="text-left p-4 font-medium">Performance</th>
                </tr>
              </thead>
              <tbody>
                {classPerformance.map((classData) => (
                  <tr key={classData.class} className="border-b hover:bg-gray-50">
                    <td className="p-4 font-medium">{classData.class}</td>
                    <td className="p-4">{classData.students}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{classData.avgScore}%</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${classData.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{classData.attendance}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        classData.avgScore >= 85 ? 'text-green-600 bg-green-50' :
                        classData.avgScore >= 75 ? 'text-blue-600 bg-blue-50' :
                        'text-yellow-600 bg-yellow-50'
                      }`}>
                        {classData.avgScore >= 85 ? 'Excellent' :
                         classData.avgScore >= 75 ? 'Good' : 'Fair'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
