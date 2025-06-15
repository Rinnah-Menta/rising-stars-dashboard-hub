
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';

export const useStudentPermissions = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();

  const isTeacher = user?.role === 'teacher';
  const isAdmin = user?.role === 'admin';
  
  const checkIsClassTeacher = (): boolean => {
    if (!isTeacher || !profileData?.isClassTeacher) return false;
    const value = profileData.isClassTeacher;
    return value === true || value === 'true';
  };
  
  const isClassTeacher = checkIsClassTeacher();
  const canManageStudents = isAdmin || isClassTeacher;

  const getTeacherClasses = () => {
    if (!profileData?.classesTaught) return [];
    try {
      return Array.isArray(profileData.classesTaught) 
        ? profileData.classesTaught 
        : JSON.parse(profileData.classesTaught || '[]');
    } catch {
      return [];
    }
  };

  const getPageDescription = () => {
    if (!isTeacher) {
      return 'Manage student information and track fees';
    }
    if (isClassTeacher) {
      const classes = getTeacherClasses();
      return `Manage students from your classes: ${classes.join(', ')} (requires admin approval)`;
    }
    if (isTeacher) {
      const classes = getTeacherClasses();
      return `View students from your classes: ${classes.join(', ')} (read-only)`;
    }
    return 'View student information';
  };

  return {
    isTeacher,
    isAdmin,
    isClassTeacher,
    canManageStudents,
    getTeacherClasses,
    getPageDescription
  };
};
