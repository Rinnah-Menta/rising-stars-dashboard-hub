import React from 'react';
import { Loader2, Users, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ColorfulSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  className?: string;
  type?: 'students' | 'grades' | 'attendance' | 'default';
}

export const ColorfulSpinner: React.FC<ColorfulSpinnerProps> = ({ 
  size = 'md', 
  message = 'Loading...', 
  className,
  type = 'default'
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  };

  const getTypeConfig = () => {
    switch (type) {
      case 'students':
        return { 
          color: 'text-blue-500', 
          bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50', 
          icon: Users,
          gradient: 'from-blue-400 via-blue-500 to-cyan-500',
          ringColor: 'border-blue-400'
        };
      case 'grades':
        return { 
          color: 'text-green-500', 
          bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50', 
          icon: GraduationCap,
          gradient: 'from-green-400 via-green-500 to-emerald-500',
          ringColor: 'border-green-400'
        };
      case 'attendance':
        return { 
          color: 'text-purple-500', 
          bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50', 
          icon: BookOpen,
          gradient: 'from-purple-400 via-purple-500 to-pink-500',
          ringColor: 'border-purple-400'
        };
      default:
        return { 
          color: 'text-orange-500', 
          bgColor: 'bg-gradient-to-br from-orange-50 to-yellow-50', 
          icon: Loader2,
          gradient: 'from-orange-400 via-orange-500 to-yellow-500',
          ringColor: 'border-orange-400'
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col items-center justify-center p-8 space-y-6 rounded-xl', config.bgColor, className)}>
      <div className="relative">
        {/* Outer pulsing ring */}
        <div className={cn(
          'absolute -inset-4 rounded-full border-2 animate-ping opacity-20',
          config.ringColor,
          sizeClasses[size]
        )} />
        
        {/* Middle spinning ring */}
        <div className={cn(
          'absolute -inset-2 rounded-full border-3 border-t-transparent animate-spin',
          config.ringColor,
          sizeClasses[size]
        )} />
        
        {/* Inner icon with pulsing effect */}
        <div className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-r animate-pulse shadow-lg',
          config.gradient,
          sizeClasses[size]
        )}>
          {type === 'default' ? (
            <Loader2 className={cn('animate-spin text-white drop-shadow-sm', iconSizeClasses[size])} />
          ) : (
            <Icon className={cn('text-white drop-shadow-sm animate-bounce', iconSizeClasses[size])} />
          )}
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <p className={cn('font-semibold text-lg', config.color)}>{message}</p>
        <div className="flex space-x-2 justify-center">
          <div className={cn('h-3 w-3 rounded-full animate-bounce shadow-sm', config.color.replace('text-', 'bg-'))} style={{ animationDelay: '0ms' }} />
          <div className={cn('h-3 w-3 rounded-full animate-bounce shadow-sm', config.color.replace('text-', 'bg-'))} style={{ animationDelay: '200ms' }} />
          <div className={cn('h-3 w-3 rounded-full animate-bounce shadow-sm', config.color.replace('text-', 'bg-'))} style={{ animationDelay: '400ms' }} />
          <div className={cn('h-3 w-3 rounded-full animate-bounce shadow-sm', config.color.replace('text-', 'bg-'))} style={{ animationDelay: '600ms' }} />
        </div>
      </div>
    </div>
  );
};