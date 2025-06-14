
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';

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

export const useReports = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const [reportCards, setReportCards] = useState([]);
  const [classReports, setClassReports] = useState([]);
  const [departmentalReports, setDepartmentalReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isBooleanTrue = (value: boolean | string | undefined): boolean => {
    return value === true || value === 'true';
  };

  const isAdmin = user?.role === 'admin';
  const isClassTeacher = user?.role === 'teacher' && isBooleanTrue(profileData?.isClassTeacher);
  const isDepartmentHead = (user?.role === 'teacher' || user?.role === 'non-teaching') && 
                           isBooleanTrue(profileData?.isDepartmentHead);

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      try {
        // Load report cards (admin only)
        if (isAdmin) {
          const savedReportCards = localStorage.getItem('admin_report_cards');
          if (savedReportCards) {
            setReportCards(JSON.parse(savedReportCards));
          } else {
            setReportCards(defaultReportCards);
            localStorage.setItem('admin_report_cards', JSON.stringify(defaultReportCards));
          }
        }

        // Load class reports (teachers who are class teachers)
        if (isClassTeacher) {
          const savedClassReports = localStorage.getItem('teacher_class_reports');
          if (savedClassReports) {
            setClassReports(JSON.parse(savedClassReports));
          } else {
            setClassReports(defaultClassReports);
            localStorage.setItem('teacher_class_reports', JSON.stringify(defaultClassReports));
          }
        }

        // Load departmental reports (department heads)
        if (isDepartmentHead) {
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
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [user, profileData, isAdmin, isClassTeacher, isDepartmentHead]);

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

  const getAvailableTabs = () => {
    const tabs = [];
    if (isAdmin) tabs.push({ value: 'report-cards', label: 'Report Cards' });
    if (isClassTeacher) tabs.push({ value: 'class-reports', label: 'Class Reports' });
    if (isDepartmentHead) tabs.push({ value: 'departmental-reports', label: 'Departmental Reports' });
    return tabs;
  };

  return {
    reportCards,
    setReportCards,
    classReports,
    setClassReports,
    departmentalReports,
    setDepartmentalReports,
    isAdmin,
    isClassTeacher,
    isDepartmentHead,
    getTotalReports,
    getReadyReports,
    getProcessingReports,
    getAvailableTabs,
    profileData,
    isLoading
  };
};
