// Route configuration for the application
export const routePaths = {
  // Public routes
  login: '/login',
  about: '/about',
  whyUs: '/why-us', 
  contact: '/contact',
  terms: '/terms',
  privacy: '/privacy',
  disclaimer: '/disclaimer',
  
  // Protected routes
  home: '/',
  dashboard: '/dashboard',
  profile: '/profile',
  calendar: '/calendar',
  reports: '/reports',
  students: '/students',
  staff: '/staff',
  classes: '/classes',
  finances: '/finances',
  analytics: '/analytics',
  settings: '/settings',
  timetable: '/timetable',
  assignments: '/assignments',
  results: '/results',
  notifications: '/notifications',
  attendance: '/attendance',
  facilities: '/facilities',
  communication: '/communication',
  library: '/library',
  help: '/help'
} as const;

export type RoutePath = typeof routePaths[keyof typeof routePaths];