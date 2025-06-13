import { useEffect } from 'react';

export const usePrint = () => {
  const handlePrint = () => {
    window.print();
  };

  return handlePrint;
}; 