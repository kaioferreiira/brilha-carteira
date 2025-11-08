import React from 'react';
import { cn } from '@/lib/utils';
import closeFriendsLogo from '@/assets/close-friends-logo.png';

interface UpfolioLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  collapsed?: boolean;
}

export const UpfolioLogo: React.FC<UpfolioLogoProps> = ({ className, size = 'md', collapsed = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img 
        src={closeFriendsLogo} 
        alt="Close Friends Pro" 
        className={cn('object-contain', iconSizes[size])}
      />
      {!collapsed && (
        <span className={cn('font-bold text-primary', textSizes[size])}>Close Friends Pro</span>
      )}
    </div>
  );
};
