
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown, Award, BookOpen, Calendar, User, Download, Eye } from 'lucide-react';
import { subjects } from '@/data/marks';
import { usePrint } from '@/hooks/usePrint';
import { toast } from 'sonner';

export const Grades = () => {
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const handlePrint = usePrint();

  // Calculate overall statistics
  const totalMarks = subjects.reduce((sum, subject) => sum + subject.score, 0);
  const averageScore = Math.round(totalMarks / subjects.length);
  const totalSubjects = subjects.length;
  const passedSubjects = subjects.filter(subject => subject.score >= 60).length;

  // Get grade distribution
  const gradeDistribution = subjects.reduce((acc, subject) => {
    const grade = subject.grade;
    acc[grade] = (acc[grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getGradeColor = (grade: string) => {
    const gradeColors = {
      'A': 'bg-emerald-500',
      'A-': 'bg-green-500',
      'B+': 'bg-blue-500',
      'B': 'bg-indigo-500',
      'B-': 'bg-purple-500',
      'C+': 'bg-yellow-500',
      'C': 'bg-orange-500',
      'D': 'bg-red-500',
      'F': 'bg-gray-500'
    };
    return gradeColors[grade as keyof typeof gradeColors] || 'bg-gray-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 75) return 'text-green-600';
    if (score >= 65) return 'text-blue-600';
    if (score >= 55) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredSubjects = selectedSubject === 'all' 
    ? subjects 
    : subjects.filter(subject => subject.name.toLowerCase().includes(selectedSubject.toLowerCase()));

  const handleExportReport = () => {
    // Create CSV content
    const csvHeader = 'Subject,Score,Grade,Remarks\n';
    const csvData = subjects.map(subject => 
      `"${subject.name}",${subject.score},"${subject.grade}","${subject.remarks}"`
    ).join('\n');
    
    const csvContent = csvHeader + csvData;
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `grades_report_${selectedTerm.replace(' ', '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Grades report exported successfully!');
  };

  const handleViewTranscript = () => {
    // Open transcript in new window for printing
    const transcriptWindow = window.open('', '_blank');
    if (transcriptWindow) {
      const transcriptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Academic Transcript</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .student-info { margin-bottom: 20px; }
            .grades-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .grades-table th, .grades-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .grades-table th { background-color: #f2f2f2; }
            .summary { margin-top: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Academic Transcript</h1>
            <h2>Rising Star Connect School</h2>
          </div>
          <div class="student-info">
            <p><strong>Student:</strong> Current Student</p>
            <p><strong>Term:</strong> ${selectedTerm}</p>
            <p><strong>Academic Year:</strong> 2024</p>
          </div>
          <table class="grades-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              ${subjects.map(subject => `
                <tr>
                  <td>${subject.name}</td>
                  <td>${subject.score}%</td>
                  <td>${subject.grade}</td>
                  <td>${subject.remarks}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="summary">
            <p><strong>Overall Average:</strong> ${averageScore}%</p>
            <p><strong>Subjects Passed:</strong> ${passedSubjects}/${totalSubjects}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `;
      
      transcriptWindow.document.write(transcriptHTML);
      transcriptWindow.document.close();
    }
    
    toast.success('Transcript opened in new window');
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">Track your academic performance across all subjects</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm" onClick={handleViewTranscript}>
            <Eye className="h-4 w-4 mr-2" />
            View Transcript
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedTerm} onValueChange={setSelectedTerm}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select Term" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Term</SelectItem>
            <SelectItem value="term1">Term 1, 2024</SelectItem>
            <SelectItem value="term2">Term 2, 2024</SelectItem>
            <SelectItem value="term3">Term 3, 2024</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSubject} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="mathematics">Mathematics</SelectItem>
            <SelectItem value="science">Science</SelectItem>
            <SelectItem value="social">Social Studies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Average</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{averageScore}%</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-emerald-500" />
              +5% from last term
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects Passed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{passedSubjects}/{totalSubjects}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((passedSubjects/totalSubjects) * 100)}% pass rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8th</div>
            <p className="text-xs text-muted-foreground">
              out of 45 students
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Grade</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">90%</div>
            <p className="text-xs text-muted-foreground">
              Physical Education
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different views */}
      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="subjects">Subject Grades</TabsTrigger>
          <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Grade Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid gap-4">
            {filteredSubjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">{subject.remarks}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className={`text-3xl font-bold ${getScoreColor(subject.score)}`}>
                          {subject.score}%
                        </div>
                        <div className="mt-1">
                          <Badge 
                            variant="secondary" 
                            className={`${getGradeColor(subject.grade)} text-white`}
                          >
                            Grade {subject.grade}
                          </Badge>
                        </div>
                      </div>

                      <div className="w-32">
                        <Progress 
                          value={subject.score} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground mt-1 text-center">
                          Performance
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Academic Progress</CardTitle>
              <CardDescription>Track your improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjects.slice(0, 4).map((subject, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {subject.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32">
                        <Progress value={subject.score} className="h-2" />
                      </div>
                      <span className="text-sm font-medium w-12">{subject.score}%</span>
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Your performance breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(gradeDistribution).map(([grade, count]) => (
                    <div key={grade} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${getGradeColor(grade)}`} />
                        <span className="font-medium">Grade {grade}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className={`h-full rounded-full ${getGradeColor(grade)}`}
                            style={{ width: `${(count / totalSubjects) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key insights about your grades</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                  <TrendingUp className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800 dark:text-emerald-200">Strong Performance</p>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      Excellent in Physical Education and Religious Education
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">Areas for Improvement</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Focus on Social Studies to reach grade A
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <Award className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-800 dark:text-purple-200">Achievement</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Overall grade improved by 5% this term
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
