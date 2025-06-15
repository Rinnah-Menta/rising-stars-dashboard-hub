
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'pupil' | 'teacher' | 'non-teaching' | 'parent' | 'admin';
  name: string; // Retained for initial login, will be parsed
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  address: string;
  title: string;
  gender: string;
  subject?: string;
  department?: string;
  qualification?: string;
  experience?: string;
  joinDate?: string;
  bio: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatar?: string;
  class?: string;
  children?: string[];
  // Account status fields
  accountStatus: 'active' | 'suspended' | 'archived' | 'deleted';
  statusReason?: string;
  statusDate?: string;
  suspensionEndDate?: string;
  statusUpdatedBy?: string;
  nextSteps?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
