import React from 'react';
import { cn } from '@/lib/utils';

interface UpfolioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
}

export const UpfolioLogo: React.FC<UpfolioLogoProps> = ({ className, size = 'md', collapsed = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-lg',
    lg: 'w-12 h-12 text-xl'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white', iconSizes[size])}>
        U
      </div>
      {!collapsed && (
        <span className={cn('font-bold text-cyan-500', textSizes[size])}>Upfolio</span>
      )}
    </div>
  );
};
