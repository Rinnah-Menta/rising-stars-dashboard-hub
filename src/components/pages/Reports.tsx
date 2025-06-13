import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, TrendingUp, Users, BookOpen, Clock, GraduationCap, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { MarksheetGenerator } from '@/components/reports/MarksheetGenerator';

// Map of icon names to components
const iconMap = {
  TrendingUp,
  Clock,
  BookOpen,
  GraduationCap,
  FileText
};

// Default reports data
const defaultReports = [
  {
    id: 1,
    title: 'Academic Performance Report',
    description: 'Detailed analysis of student academic performance for Term 2',
    date: '2024-06-10',
    type: 'Academic',
    status: 'Ready',
    iconName: 'TrendingUp'
  },
  {
    id: 2,
    title: 'Attendance Report',
    description: 'Student attendance summary for the current term',
    date: '2024-06-08',
    type: 'Attendance',
    status: 'Ready',
    iconName: 'Clock'
  },
  {
    id: 3,
    title: 'Class Performance Analysis',
    description: 'Comparative analysis of class performance across subjects',
    date: '2024-06-03',
    type: 'Academic',
    status: 'Processing',
    iconName: 'BookOpen'
  },
  {
    id: 4,
    title: 'Student Marksheets',
    description: 'Individual student performance marksheets for all terms',
    date: '2024-06-12',
    type: 'Marksheet',
    status: 'Ready',
    iconName: 'GraduationCap'
  }
];

const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showMarksheet, setShowMarksheet] = useState(false);

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

  // Helper function to migrate old report format to new format
  const migrateReport = (report) => {
    if (!report.iconName && report.icon) {
      // If we have an old format report with an icon object
      const iconName = Object.keys(iconMap).find(name => 
        iconMap[name] === report.icon || 
        (typeof report.icon === 'object' && report.icon.type === iconMap[name])
      ) || 'FileText';
      
      return {
        ...report,
        iconName,
        icon: undefined // Remove the old icon property
      };
    }
    return report;
  };

  useEffect(() => {
    try {
    const savedReports = localStorage.getItem('teacher_reports');
    if (savedReports) {
        const parsedReports = JSON.parse(savedReports);
        // Migrate any old format reports
        const migratedReports = parsedReports.map(migrateReport);
        setReports(migratedReports);
        // Save migrated reports back to localStorage
        localStorage.setItem('teacher_reports', JSON.stringify(migratedReports));
    } else {
        setReports(defaultReports);
        localStorage.setItem('teacher_reports', JSON.stringify(defaultReports));
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      // If there's any error, reset to default reports
      setReports(defaultReports);
      localStorage.setItem('teacher_reports', JSON.stringify(defaultReports));
    }
  }, []);

  const generateReport = (type) => {
    const newReport = {
      id: Date.now(),
      title: `${type} Report`,
      description: `Generated ${type.toLowerCase()} report for current academic period`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      status: 'Processing',
      iconName: 'FileText'
    };

    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem('teacher_reports', JSON.stringify(updatedReports));

    // Simulate processing time
    setTimeout(() => {
      const processedReports = updatedReports.map(report => 
        report.id === newReport.id ? { ...report, status: 'Ready' } : report
      );
      setReports(processedReports);
      localStorage.setItem('teacher_reports', JSON.stringify(processedReports));
      toast({
        title: "Report Generated",
        description: `${type} report has been generated successfully.`,
      });
    }, 3000);

    toast({
      title: "Report Generation Started",
      description: `Generating ${type.toLowerCase()} report...`,
    });
  };

  const downloadReport = (report) => {
    toast({
      title: "Download Started",
      description: `Downloading ${report.title}...`,
    });
  };

  const generateMarksheet = () => {
    if (!selectedClass || !selectedTerm || !selectedStudent) {
      toast({
        title: "Missing Information",
        description: "Please select class, term, and student to generate marksheet.",
        variant: "destructive"
      });
      return;
    }
    
    setShowMarksheet(true);
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
      case 'Academic': return 'bg-blue-50 text-blue-600';
      case 'Attendance': return 'bg-purple-50 text-purple-600';
      case 'Financial': return 'bg-green-50 text-green-600';
      case 'Marksheet': return 'bg-orange-50 text-orange-600';
      default: return 'bg-gray-50 text-gray-600';
    }
  };

  // Helper function to safely get icon component
  const getIconComponent = (iconName) => {
    return iconMap[iconName] || FileText; // Fallback to FileText if icon not found
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2 flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <GraduationCap className="h-4 w-4 mr-2" />
                Generate Marksheet
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Generate Student Marksheet</DialogTitle>
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

                <Button onClick={generateMarksheet} className="w-full">
                  <Printer className="h-4 w-4 mr-2" />
                  Generate Marksheet
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={() => generateReport('Academic')}>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs text-muted-foreground">Ready Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">2</div>
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

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {showMarksheet && (
        <MarksheetGenerator
          student={students.find(s => s.id.toString() === selectedStudent)}
          term={selectedTerm}
          class={selectedClass}
          onClose={() => setShowMarksheet(false)}
        />
      )}
    </div>
  );
};

export default Reports;
