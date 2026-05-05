import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'article' | 'video' | 'podcast' | 'featured' | 'default' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', children, className }) => {
  const variants = {
    article: 'bg-blue-100 text-blue-700',
    video: 'bg-purple-100 text-purple-700',
    podcast: 'bg-orange-100 text-orange-700',
    featured: 'bg-[#1A9E3F15] text-[#1A9E3F]',
    default: 'bg-gray-100 text-gray-600',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
  };

  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
