
export const pageTransitions = [
  {
    name: 'fade',
    variants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }
  },
  {
    name: 'slideRight',
    variants: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    }
  },
  {
    name: 'slideLeft',
    variants: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    }
  },
  {
    name: 'slideBottom',
    variants: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 },
    }
  },
  {
    name: 'slideTop',
    variants: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 },
    }
  },
  {
    name: 'zoom',
    variants: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    }
  }
];
