
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export interface Notification {
  id: string;
  type: 'report_upload' | 'profile_update' | 'grade_update' | 'budget_submission' | 'assignment_creation';
  message: string;
  user: string;
  timestamp: string;
  read: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = () => {
    // Simulate notifications from various user activities
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'report_upload',
        message: 'New class report uploaded',
        user: 'Sarah Namubiru',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        status: 'pending'
      },
      {
        id: '2',
        type: 'profile_update',
        message: 'Profile information updated',
        user: 'John Musoke',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        read: false,
        status: 'pending'
      },
      {
        id: '3',
        type: 'budget_submission',
        message: 'Department budget submitted',
        user: 'Grace Nakato',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
        status: 'pending'
      },
      {
        id: '4',
        type: 'grade_update',
        message: 'Student grades updated',
        user: 'David Kasozi',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        read: true,
        status: 'approved'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read && n.status === 'pending').length);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    setUnreadCount(0);
  };

  const getPendingCount = () => {
    return notifications.filter(n => n.status === 'pending').length;
  };

  return {
    notifications,
    unreadCount,
    pendingCount: getPendingCount(),
    markAsRead,
    markAllAsRead,
    refreshNotifications: loadNotifications
  };
};
