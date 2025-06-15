
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export const useAdminReports = () => {
  const { user } = useAuth();
  const [allReports, setAllReports] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalReports: 0,
    pendingApprovals: 0,
    systemAlerts: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadAdminData();
    }
  }, [user]);

  const loadAdminData = async () => {
    setIsLoading(true);
    try {
      // Aggregate all reports from different user types
      const reportCards = JSON.parse(localStorage.getItem('admin_report_cards') || '[]');
      const classReports = JSON.parse(localStorage.getItem('teacher_class_reports') || '[]');
      const departmentalReports = JSON.parse(localStorage.getItem('departmental_reports') || '[]');

      // Combine all reports with user context
      const combinedReports = [
        ...reportCards.map(report => ({ ...report, source: 'Admin', userType: 'admin' })),
        ...classReports.map(report => ({ ...report, source: 'Class Teacher', userType: 'teacher' })),
        ...departmentalReports.map(report => ({ ...report, source: 'Department Head', userType: 'staff' }))
      ];

      setAllReports(combinedReports);

      // Load user activities (simulated for now, would come from actual activity logs)
      const activities = [
        {
          id: 1,
          user: 'Sarah Namubiru',
          action: 'Uploaded Class Report',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          type: 'report_upload',
          status: 'completed'
        },
        {
          id: 2,
          user: 'John Musoke',
          action: 'Updated Student Grades',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          type: 'grade_update',
          status: 'completed'
        },
        {
          id: 3,
          user: 'Grace Nakato',
          action: 'Submitted Department Budget',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          type: 'budget_submission',
          status: 'pending_approval'
        },
        {
          id: 4,
          user: 'David Kasozi',
          action: 'Created New Assignment',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
          type: 'assignment_creation',
          status: 'completed'
        }
      ];

      setUserActivities(activities);

      // Calculate system statistics
      setSystemStats({
        totalUsers: 95,
        activeUsers: 78,
        totalReports: combinedReports.length,
        pendingApprovals: activities.filter(a => a.status === 'pending_approval').length,
        systemAlerts: 3
      });

    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveActivity = (activityId: number) => {
    setUserActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'approved' }
          : activity
      )
    );
  };

  const rejectActivity = (activityId: number) => {
    setUserActivities(prev => 
      prev.map(activity => 
        activity.id === activityId 
          ? { ...activity, status: 'rejected' }
          : activity
      )
    );
  };

  return {
    allReports,
    userActivities,
    systemStats,
    isLoading,
    approveActivity,
    rejectActivity,
    refreshData: loadAdminData
  };
};
