
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, TrendingUp, Users, BookOpen, Clock, Plus, Eye, Edit2, Trash2, FileSpreadsheet } from 'lucide-react';
import { MarksheetGenerator } from '@/components/reports/MarksheetGenerator';

interface Report {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Academic' | 'Attendance' | 'Financial' | 'Marksheet';
  status: 'Ready' | 'Processing' | 'Error';
  icon: any;
  classId?: string;
  subject?: string;
  term?: string;
}

export const Reports = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [showMarksheetGenerator, setShowMarksheetGenerator] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [filterType, setFilterType] = useState<string>('all');

  // Load reports from localStorage
  useEffect(() => {
    const savedReports = localStorage.getItem('teacher_reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    } else {
      // Initialize with default reports
      const defaultReports: Report[] = [
        {
          id: '1',
          title: 'Academic Performance Report - Term 2',
          description: 'Detailed analysis of student academic performance for Term 2',
          date: '2024-06-10',
          type: 'Academic',
          status: 'Ready',
          icon: TrendingUp
        },
        {
          id: '2',
          title: 'Class Attendance Summary',
          description: 'Student attendance summary for Primary 5A',
          date: '2024-06-08',
          type: 'Attendance',
          status: 'Ready',
          icon: Clock
        },
        {
          id: '3',
          title: 'Mathematics Marksheet - Term 2',
          description: 'Mathematics results for Primary 5A students',
          date: '2024-06-05',
          type: 'Marksheet',
          status: 'Ready',
          icon: FileSpreadsheet,
          classId: 'P5A',
          subject: 'Mathematics',
          term: 'Term 2'
        },
        {
          id: '4',
          title: 'English Marksheet - Term 2',
          description: 'English Language results for Primary 5A students',
          date: '2024-06-03',
          type: 'Marksheet',
          status: 'Processing',
          icon: FileSpreadsheet,
          classId: 'P5A',
          subject: 'English',
          term: 'Term 2'
        }
      ];
      setReports(defaultReports);
      localStorage.setItem('teacher_reports', JSON.stringify(defaultReports));
    }
  }, []);

  // Save reports to localStorage
  const saveReports = (updatedReports: Report[]) => {
    setReports(updatedReports);
    localStorage.setItem('teacher_reports', JSON.stringify(updatedReports));
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

  const handleCreateMarksheet = () => {
    setSelectedReport(null);
    setShowMarksheetGenerator(true);
  };

  const handleViewReport = (report: Report) => {
    if (report.type === 'Marksheet') {
      setSelectedReport(report);
      setShowMarksheetGenerator(true);
    } else {
      // For other report types, simulate download
      console.log(`Downloading ${report.title}`);
    }
  };

  const handleDeleteReport = (reportId: string) => {
    const updatedReports = reports.filter(report => report.id !== reportId);
    saveReports(updatedReports);
  };

  const filteredReports = filterType === 'all' 
    ? reports 
    : reports.filter(report => report.type.toLowerCase() === filterType);

  const reportStats = {
    total: reports.length,
    ready: reports.filter(r => r.status === 'Ready').length,
    processing: reports.filter(r => r.status === 'Processing').length,
    marksheets: reports.filter(r => r.type === 'Marksheet').length
  };

  if (showMarksheetGenerator) {
    return (
      <MarksheetGenerator
        onBack={() => setShowMarksheetGenerator(false)}
        onSave={(marksheetData) => {
          const newReport: Report = {
            id: Date.now().toString(),
            title: `${marksheetData.subject} Marksheet - ${marksheetData.term}`,
            description: `${marksheetData.subject} results for ${marksheetData.className} students`,
            date: new Date().toISOString().split('T')[0],
            type: 'Marksheet',
            status: 'Ready',
            icon: FileSpreadsheet,
            classId: marksheetData.className,
            subject: marksheetData.subject,
            term: marksheetData.term
          };
          
          const updatedReports = [...reports, newReport];
          saveReports(updatedReports);
          setShowMarksheetGenerator(false);
        }}
        existingReport={selectedReport}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <div className="flex gap-2">
          <Button onClick={handleCreateMarksheet} variant="outline">
            <FileSpreadsheet className="h-4 w-4 mr-2" />
            Create Marksheet
          </Button>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{reportStats.total}</div>
            <p className="text-xs text-muted-foreground">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{reportStats.ready}</div>
            <p className="text-xs text-muted-foreground">Ready Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">{reportStats.processing}</div>
            <p className="text-xs text-muted-foreground">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{reportStats.marksheets}</div>
            <p className="text-xs text-muted-foreground">Marksheets</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Available Reports</CardTitle>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
                <SelectItem value="marksheet">Marksheets</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No reports found for the selected filter.
              </div>
            ) : (
              filteredReports.map((report) => {
                const IconComponent = report.icon;
                return (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            Generated: {new Date(report.date).toLocaleDateString()}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(report.type)}`}>
                            {report.type}
                          </span>
                          {report.classId && (
                            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                              {report.classId}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <div className="flex gap-2">
                        {report.status === 'Ready' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteReport(report.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
