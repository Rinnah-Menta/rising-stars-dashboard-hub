import { useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface AnimationConfig {
  duration: number;
  ease: string;
  reducedMotion?: boolean;
}

// Hook to optimize animations based on user preferences and performance
export const useOptimizedAnimation = (baseConfig: AnimationConfig) => {
  const shouldReduceMotion = useReducedMotion();
  
  return useMemo(() => {
    if (shouldReduceMotion) {
      return {
        duration: 0.01, // Nearly instant for reduced motion
        ease: "linear"
      };
    }
    
    return {
      duration: baseConfig.duration,
      ease: baseConfig.ease
    };
  }, [shouldReduceMotion, baseConfig.duration, baseConfig.ease]);
};

// Performance monitoring for animations
export const useAnimationPerformance = () => {
  const performance = useMemo(() => {
    // Check if device has limited performance capabilities
    const isLowPerformance = 
      // @ts-ignore - checking for performance API
      navigator?.hardwareConcurrency <= 2 ||
      // @ts-ignore - checking for device memory
      navigator?.deviceMemory <= 2;

    return {
      isLowPerformance,
      // Reduce animation complexity on low-performance devices
      shouldSimplify: isLowPerformance
    };
  }, []);

  return performance;
};