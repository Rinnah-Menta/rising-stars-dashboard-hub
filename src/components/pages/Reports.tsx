import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportCardSection } from '@/components/reports/ReportCardSection';
import { ClassReportsSection } from '@/components/reports/ClassReportsSection';
import { DepartmentalReportsSection } from '@/components/reports/DepartmentalReportsSection';

// Default data for different report types
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
  }
];

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
    description: 'Class attendance patterns and statistics',
    date: '2024-06-08',
    type: 'Attendance',
    status: 'Ready',
    iconName: 'Clock',
    category: 'class-report'
  }
];

const defaultDepartmentalReports = [
  {
    id: 6,
    title: 'Mathematics Department Staff Report',
    description: 'Staff performance and activities summary',
    date: '2024-06-05',
    type: 'Staff Performance',
    status: 'Ready',
    iconName: 'Users',
    category: 'departmental-report'
  },
  {
    id: 7,
    title: 'Monthly Budget Report',
    description: 'Department budget utilization and expenses',
    date: '2024-06-03',
    type: 'Budget',
    status: 'Processing',
    iconName: 'Building',
    category: 'departmental-report'
  }
];

const Reports = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const [reportCards, setReportCards] = useState([]);
  const [classReports, setClassReports] = useState([]);
  const [departmentalReports, setDepartmentalReports] = useState([]);

  useEffect(() => {
    try {
      // Load report cards (admin only)
      if (user?.role === 'admin') {
        const savedReportCards = localStorage.getItem('admin_report_cards');
        if (savedReportCards) {
          setReportCards(JSON.parse(savedReportCards));
        } else {
          setReportCards(defaultReportCards);
          localStorage.setItem('admin_report_cards', JSON.stringify(defaultReportCards));
        }
      }

      // Load class reports (teachers who are class teachers)
      if (user?.role === 'teacher' && (profileData?.isClassTeacher === true || profileData?.isClassTeacher === 'true')) {
        const savedClassReports = localStorage.getItem('teacher_class_reports');
        if (savedClassReports) {
          setClassReports(JSON.parse(savedClassReports));
        } else {
          setClassReports(defaultClassReports);
          localStorage.setItem('teacher_class_reports', JSON.stringify(defaultClassReports));
        }
      }

      // Load departmental reports (department heads)
      if ((user?.role === 'teacher' || user?.role === 'non-teaching') && 
          (profileData?.isDepartmentHead === true || profileData?.isDepartmentHead === 'true')) {
        const savedDepartmentalReports = localStorage.getItem('departmental_reports');
        if (savedDepartmentalReports) {
          setDepartmentalReports(JSON.parse(savedDepartmentalReports));
        } else {
          setDepartmentalReports(defaultDepartmentalReports);
          localStorage.setItem('departmental_reports', JSON.stringify(defaultDepartmentalReports));
        }
      }
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  }, [user, profileData]);

  const isAdmin = user?.role === 'admin';
  const isClassTeacher = user?.role === 'teacher' && (profileData?.isClassTeacher === true || profileData?.isClassTeacher === 'true');
  const isDepartmentHead = (user?.role === 'teacher' || user?.role === 'non-teaching') && 
                           (profileData?.isDepartmentHead === true || profileData?.isDepartmentHead === 'true');

  const getTotalReports = () => {
    let total = 0;
    if (isAdmin) total += reportCards.length;
    if (isClassTeacher) total += classReports.length;
    if (isDepartmentHead) total += departmentalReports.length;
    return total;
  };

  const getReadyReports = () => {
    let ready = 0;
    if (isAdmin) ready += reportCards.filter(r => r.status === 'Ready').length;
    if (isClassTeacher) ready += classReports.filter(r => r.status === 'Ready').length;
    if (isDepartmentHead) ready += departmentalReports.filter(r => r.status === 'Ready').length;
    return ready;
  };

  const getProcessingReports = () => {
    let processing = 0;
    if (isAdmin) processing += reportCards.filter(r => r.status === 'Processing').length;
    if (isClassTeacher) processing += classReports.filter(r => r.status === 'Processing').length;
    if (isDepartmentHead) processing += departmentalReports.filter(r => r.status === 'Processing').length;
    return processing;
  };

  const totalReports = getTotalReports();
  const readyReports = getReadyReports();
  const processingReports = getProcessingReports();

  const getAvailableTabs = () => {
    const tabs = [];
    if (isAdmin) tabs.push({ value: 'report-cards', label: 'Report Cards' });
    if (isClassTeacher) tabs.push({ value: 'class-reports', label: 'Class Reports' });
    if (isDepartmentHead) tabs.push({ value: 'departmental-reports', label: 'Departmental Reports' });
    return tabs;
  };

  const availableTabs = getAvailableTabs();

  if (availableTabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-muted-foreground">No Reports Available</h2>
          <p className="text-sm text-muted-foreground">You don't have permission to access reports.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage reports based on your role and responsibilities</p>
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

      <Tabs defaultValue={availableTabs[0]?.value} className="space-y-6">
        <TabsList className={`grid w-full grid-cols-${availableTabs.length}`}>
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {isAdmin && (
          <TabsContent value="report-cards" className="space-y-4">
            <ReportCardSection 
              reportCards={reportCards} 
              setReportCards={setReportCards} 
            />
          </TabsContent>
        )}

        {isClassTeacher && (
          <TabsContent value="class-reports" className="space-y-4">
            <ClassReportsSection 
              classReports={classReports} 
              setClassReports={setClassReports} 
            />
          </TabsContent>
        )}

        {isDepartmentHead && (
          <TabsContent value="departmental-reports" className="space-y-4">
            <DepartmentalReportsSection 
              departmentalReports={departmentalReports} 
              setDepartmentalReports={setDepartmentalReports}
              departmentName={profileData?.headOfDepartment || profileData?.department || 'Department'}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export { Reports };
