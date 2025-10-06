import React from 'react';
import { cn } from '@/lib/utils';

interface UpfolioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
}

export const UpfolioLogo: React.FC<UpfolioLogoProps> = ({ className, size = 'md', collapsed = false }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('relative', sizes[size])}>
        <div className="absolute inset-0 rounded-full bg-gradient-kinvo animate-pulse-glow">
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin" 
                 style={{ 
                   borderWidth: size === 'sm' ? '1.5px' : size === 'md' ? '2px' : '3px',
                   width: size === 'sm' ? '1rem' : size === 'md' ? '1.5rem' : '2rem',
                   height: size === 'sm' ? '1rem' : size === 'md' ? '1.5rem' : '2rem'
                 }} />
          </div>
        </div>
      </div>
      {!collapsed && (
        <span className="text-xl font-bold gradient-text">Upfolio</span>
      )}
    </div>
  );
};
