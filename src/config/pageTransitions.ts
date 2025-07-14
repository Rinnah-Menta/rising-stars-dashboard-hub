
// Optimized page transitions for smooth performance
export const pageTransitions = {
  // Ultra-smooth fade transition
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  
  // Subtle slide transitions
  slideRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 }
  },
  
  // Optimized scale transition
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 }
  },
  
  // Default smooth transition
  default: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  }
};

// Optimized transition settings for performance
export const transitionConfig = {
  duration: 0.15,
  ease: "easeOut",
  type: "tween" as const
};

// Route-specific transition mapping for consistent UX
export const routeTransitions: Record<string, keyof typeof pageTransitions> = {
  '/': 'fade',
  '/dashboard': 'fade',
  '/profile': 'slideUp',
  '/students': 'slideRight',
  '/staff': 'slideRight',
  '/classes': 'slideRight',
  '/reports': 'slideUp',
  '/analytics': 'scale',
  '/settings': 'slideUp',
  // Default for unmapped routes
  default: 'default'
};
