import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, ReactNode } from 'react';

interface AnimatedInViewProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  animation?: 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoomIn' | 'zoomOut' | 'fadeIn' | 'flipIn' | 'bounceIn';
  delay?: number;
}

const animationVariants: Record<string, Variants> = {
  slideLeft: {
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, x: -20 }
  },
  slideRight: {
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, x: 20 }
  },
  slideUp: {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, y: 15 }
  },
  slideDown: {
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, y: -15 }
  },
  zoomIn: {
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.25,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, scale: 0.95 }
  },
  zoomOut: {
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.25,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, scale: 1.05 }
  },
  fadeIn: {
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0 }
  },
  flipIn: {
    visible: { 
      opacity: 1, 
      rotateY: 0, 
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, rotateY: -45 }
  },
  bounceIn: {
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.35,
        ease: "easeOut"
      } 
    },
    hidden: { opacity: 0, scale: 0.9, y: 10 }
  }
};

const defaultVariants: Variants = animationVariants.slideUp;

const AnimatedInView = ({ children, variants, className, animation = 'slideUp', delay = 0 }: AnimatedInViewProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const selectedVariants = variants || animationVariants[animation];

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, delay * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={selectedVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedInView; 