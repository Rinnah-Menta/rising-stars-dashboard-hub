import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode } from 'react';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

const AnimatedCard = ({ children, className = "", delay = 0, index = 0 }: AnimatedCardProps) => {
  const controls = useAnimation();
  const shouldReduceMotion = useReducedMotion();
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "50px"
  });

  const animationConfig = useOptimizedAnimation({
    duration: 0.3,
    ease: "easeOut"
  });

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 15,
      scale: shouldReduceMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  const transitionSettings = {
    duration: animationConfig.duration,
    ease: "easeOut" as const,
    delay: shouldReduceMotion ? 0 : (delay + index * 0.05)
  };

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={cardVariants}
      transition={transitionSettings}
      className={`${className} will-change-transform`}
      style={{
        // Optimize for GPU acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000,
        // Contain layout shifts
        contain: 'layout style paint'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;