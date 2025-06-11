
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'pupil' | 'teacher' | 'non-teaching' | 'parent' | 'admin';
  name: string;
  avatar?: string;
  class?: string;
  subject?: string;
  department?: string;
  children?: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
