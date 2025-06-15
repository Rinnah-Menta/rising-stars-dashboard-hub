
import React, { useState, useEffect } from 'react';

interface AnimatedProgressProps {
  value: number;
  colorClass: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({ value, colorClass }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-20 sm:w-32 bg-gray-200 rounded-full h-2">
      <div 
        className={`${colorClass} h-2 rounded-full transition-all duration-700 ease-out`} 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
