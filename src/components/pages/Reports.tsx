
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, TrendingUp, Users, BookOpen, Clock, GraduationCap, Printer, BarChart3, FileBarChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ReportCardGenerator } from '@/components/reports/ReportCardGenerator';

// Map of icon names to components
const iconMap = {
  TrendingUp,
  Clock,
  BookOpen,
  GraduationCap,
  FileText,
  BarChart3,
  FileBarChart,
  Users
};

// Default report cards data (student performance reports)
const defaultReportCards = [
  {
    id: 1,
    title: 'Progressive Report Card - Term 2',
    description: 'Mid-term academic performance report for individual students',
    date: '2024-06-10',
    type: 'Progressive',
    status: 'Ready',
    iconName: 'GraduationCap',
    category: 'report-card'
  },
  {
    id: 2,
    title: 'End of Term Report Cards',
    description: 'Final term academic performance reports with comprehensive grades',
    date: '2024-06-12',
    type: 'Final Term',
    status: 'Ready',
    iconName: 'TrendingUp',
    category: 'report-card'
  },
  {
    id: 3,
    title: 'Parent-Teacher Conference Reports',
    description: 'Individual student performance summaries for parent meetings',
    date: '2024-06-08',
    type: 'Conference',
    status: 'Processing',
    iconName: 'Users',
    category: 'report-card'
  }
];

// Default class reports data (administrative summaries)
const defaultClassReports = [
  {
    id: 4,
    title: 'P.5 Class Performance Analysis',
    description: 'Overall class performance summary and statistics for Term 2',
    date: '2024-06-10',
    type: 'Class Performance',
    status: 'Ready',
    iconName: 'BarChart3',
    category: 'class-report'
  },
  {
    id: 5,
    title: 'Attendance Summary Report',
    description: 'School-wide attendance patterns and statistics',
    date: '2024-06-08',
    type: 'Attendance',
    status: 'Ready',
    iconName: 'Clock',
    category: 'class-report'
  },
  {
    id: 6,
    title: 'Subject Performance Report',
    description: 'Mathematics department performance across all classes',
    date: '2024-06-05',
    type: 'Subject Analysis',
    status: 'Ready',
    iconName: 'BookOpen',
    category: 'class-report'
  },
  {
    id: 7,
    title: 'Monthly School Report',
    description: 'Comprehensive monthly summary of school activities and performance',
    date: '2024-06-03',
    type: 'Monthly Summary',
    status: 'Processing',
    iconName: 'FileBarChart',
    category: 'class-report'
  }
];

const Reports = () => {
  const { user } = useAuth();
  const [reportCards, setReportCards] = useState([]);
  const [classReports, setClassReports] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showReportCard, setShowReportCard] = useState(false);

  const classes = [
    'P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7'
  ];

  const terms = [
    'Term 1 - 2024', 'Term 2 - 2024', 'Term 3 - 2024'
  ];

  const students = [
    { id: 1, name: 'Nakato Sarah', class: 'P.5' },
    { id: 2, name: 'Musoke John', class: 'P.5' },
    { id: 3, name: 'Namubiru Grace', class: 'P.5' },
    { id: 4, name: 'Kasozi David', class: 'P.5' },
    { id: 5, name: 'Nalubega Mary', class: 'P.5' },
  ];

  useEffect(() => {
    try {
      // Load report cards
      const savedReportCards = localStorage.getItem('teacher_report_cards');
      if (savedReportCards) {
        setReportCards(JSON.parse(savedReportCards));
      } else {
        setReportCards(defaultReportCards);
        localStorage.setItem('teacher_report_cards', JSON.stringify(defaultReportCards));
      }

      // Load class reports
      const savedClassReports = localStorage.getItem('teacher_class_reports');
      if (savedClassReports) {
        setClassReports(JSON.parse(savedClassReports));
      } else {
        setClassReports(defaultClassReports);
        localStorage.setItem('teacher_class_reports', JSON.stringify(defaultClassReports));
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      setReportCards(defaultReportCards);
      setClassReports(defaultClassReports);
      localStorage.setItem('teacher_report_cards', JSON.stringify(defaultReportCards));
      localStorage.setItem('teacher_class_reports', JSON.stringify(defaultClassReports));
    }
  }, []);

  const generateReportCard = (type) => {
    const newReportCard = {
      id: Date.now(),
      title: `${type} Report Card`,
      description: `Generated ${type.toLowerCase()} report card for selected students`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      status: 'Processing',
      iconName: 'GraduationCap',
      category: 'report-card'
    };

    const updatedReportCards = [...reportCards, newReportCard];
    setReportCards(updatedReportCards);
    localStorage.setItem('teacher_report_cards', JSON.stringify(updatedReportCards));

    setTimeout(() => {
      const processedReportCards = updatedReportCards.map(report => 
        report.id === newReportCard.id ? { ...report, status: 'Ready' } : report
      );
      setReportCards(processedReportCards);
      localStorage.setItem('teacher_report_cards', JSON.stringify(processedReportCards));
      toast({
        title: "Report Card Generated",
        description: `${type} report card has been generated successfully.`,
      });
    }, 3000);

    toast({
      title: "Report Card Generation Started",
      description: `Generating ${type.toLowerCase()} report card...`,
    });
  };

  const generateClassReport = (type) => {
    const newClassReport = {
      id: Date.now(),
      title: `${type} Class Report`,
      description: `Generated ${type.toLowerCase()} summary report`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      status: 'Processing',
      iconName: 'FileBarChart',
      category: 'class-report'
    };

    const updatedClassReports = [...classReports, newClassReport];
    setClassReports(updatedClassReports);
    localStorage.setItem('teacher_class_reports', JSON.stringify(updatedClassReports));

    setTimeout(() => {
      const processedClassReports = updatedClassReports.map(report => 
        report.id === newClassReport.id ? { ...report, status: 'Ready' } : report
      );
      setClassReports(processedClassReports);
      localStorage.setItem('teacher_class_reports', JSON.stringify(processedClassReports));
      toast({
        title: "Class Report Generated",
        description: `${type} class report has been generated successfully.`,
      });
    }, 3000);

    toast({
      title: "Class Report Generation Started",
      description: `Generating ${type.toLowerCase()} class report...`,
    });
  };

  const downloadReport = (report) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.title}...`,
    });
  };

  const generateReportCard = () => {
    if (!selectedClass || !selectedTerm || !selectedStudent) {
      toast({
        title: "Missing Information",
        description: "Please select class, term, and student to generate report card.",
        variant: "destructive"
      });
      return;
    }
    
    setShowReportCard(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-yellow-600 bg-yellow-50';
      case 'Error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Progressive': case 'Final Term': case 'Conference': return 'bg-blue-50 text-blue-600';
      case 'Class Performance': case 'Subject Analysis': return 'bg-purple-50 text-purple-600';
      case 'Attendance': return 'bg-orange-50 text-orange-600';
      case 'Monthly Summary': return 'bg-green-50 text-green-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  const getIconComponent = (iconName) => {
    return iconMap[iconName] || FileText;
  };

  const renderReportsList = (reports, type) => (
    <div className="space-y-4">
      {reports.map((report) => {
        const IconComponent = getIconComponent(report.iconName);
        return (
          <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <IconComponent className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-muted-foreground">Generated: {new Date(report.date).toLocaleDateString()}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                {report.status}
              </span>
              {report.status === 'Ready' && (
                <Button variant="outline" size="sm" onClick={() => downloadReport(report)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const totalReports = reportCards.length + classReports.length;
  const readyReports = [...reportCards, ...classReports].filter(r => r.status === 'Ready').length;
  const processingReports = [...reportCards, ...classReports].filter(r => r.status === 'Processing').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage student report cards and class reports</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <GraduationCap className="h-4 w-4 mr-2" />
                Generate Report Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Generate Student Report Card</DialogTitle>
                <DialogDescription>
                  Select a student to generate their academic performance report card.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Select Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Select Term</label>
                  <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose term" />
                    </SelectTrigger>
                    <SelectContent>
                      {terms.map((term) => (
                        <SelectItem key={term} value={term}>{term}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Select Student</label>
                  <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose student" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.map((student) => (
                        <SelectItem key={student.id} value={student.id.toString()}>
                          {student.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={generateReportCard} className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Generate Report Card
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => generateClassReport('Performance')}>
            <FileBarChart className="h-4 w-4 mr-2" />
            Generate Class Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{readyReports}</div>
            <p className="text-xs text-muted-foreground">Ready Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{processingReports}</div>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">89</div>
            <p className="text-xs text-muted-foreground">Downloads This Month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="report-cards" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="report-cards" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Report Cards
          </TabsTrigger>
          <TabsTrigger value="class-reports" className="flex items-center gap-2">
            <FileBarChart className="h-4 w-4" />
            Class Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="report-cards">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Student Report Cards
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Individual student academic performance reports and progress tracking
              </p>
            </CardHeader>
            <CardContent>
              {renderReportsList(reportCards, 'report-card')}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="class-reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="h-5 w-5" />
                Class Reports
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Administrative summaries, class performance analysis, and school-wide reports
              </p>
            </CardHeader>
            <CardContent>
              {renderReportsList(classReports, 'class-report')}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showReportCard && (
        <ReportCardGenerator
          student={students.find(s => s.id.toString() === selectedStudent)}
          term={selectedTerm}
          class={selectedClass}
          onClose={() => setShowReportCard(false)}
        />
      )}
    </div>
  );
};

export default Reports;
