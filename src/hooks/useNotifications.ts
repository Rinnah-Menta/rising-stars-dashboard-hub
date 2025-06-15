
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigation } from '@/contexts/NavigationContext';

export interface Notification {
  id: string;
  type: 'report_upload' | 'profile_update' | 'grade_update' | 'budget_submission' | 'assignment_creation';
  message: string;
  user: string;
  timestamp: string;
  read: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEYS = {
  NOTIFICATIONS: 'admin_notifications',
  HAS_VIEWED_CONTROL_PANEL: 'admin_has_viewed_control_panel'
};

export const useNotifications = () => {
  const { user } = useAuth();
  const { currentPage } = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasViewedControlPanel, setHasViewedControlPanel] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    if (user?.role === 'admin') {
      loadPersistedState();
    }
  }, [user]);

  // Clear control panel badge when user visits notifications page
  useEffect(() => {
    if (currentPage === 'notifications' && user?.role === 'admin') {
      setHasViewedControlPanel(true);
      localStorage.setItem(STORAGE_KEYS.HAS_VIEWED_CONTROL_PANEL, 'true');
    }
  }, [currentPage, user]);

  // Persist notifications whenever they change
  useEffect(() => {
    if (user?.role === 'admin' && notifications.length > 0) {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
      const newUnreadCount = notifications.filter(n => !n.read && n.status === 'pending').length;
      setUnreadCount(newUnreadCount);
    }
  }, [notifications, user]);

  const loadPersistedState = () => {
    // Load notifications from localStorage or create default ones
    const savedNotifications = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    const savedHasViewedControlPanel = localStorage.getItem(STORAGE_KEYS.HAS_VIEWED_CONTROL_PANEL) === 'true';
    
    if (savedNotifications) {
      const parsedNotifications = JSON.parse(savedNotifications);
      setNotifications(parsedNotifications);
      setUnreadCount(parsedNotifications.filter(n => !n.read && n.status === 'pending').length);
    } else {
      // Create initial notifications only if none exist
      loadNotifications();
    }
    
    setHasViewedControlPanel(savedHasViewedControlPanel);
  };

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
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications));
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
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const getPendingCount = () => {
    return notifications.filter(n => n.status === 'pending').length;
  };

  const getControlPanelBadgeCount = () => {
    // Show badge count only if user hasn't viewed control panel or notifications page
    if (hasViewedControlPanel || currentPage === 'notifications') {
      return 0;
    }
    return getPendingCount();
  };

  const clearControlPanelBadge = () => {
    setHasViewedControlPanel(true);
    localStorage.setItem(STORAGE_KEYS.HAS_VIEWED_CONTROL_PANEL, 'true');
  };

  return {
    notifications,
    unreadCount,
    pendingCount: getPendingCount(),
    controlPanelBadgeCount: getControlPanelBadgeCount(),
    markAsRead,
    markAllAsRead,
    clearControlPanelBadge,
    refreshNotifications: loadNotifications
  };
};
