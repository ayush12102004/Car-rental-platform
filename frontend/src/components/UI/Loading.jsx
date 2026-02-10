import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';

const Loading = ({ size = 'md', className = '', fullScreen = false }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className={cn('animate-spin text-primary', sizes[size])} />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-4', className)}>
      <Loader2 className={cn('animate-spin text-primary', sizes[size])} />
    </div>
  );
};

// Skeleton Loading Component
export const Skeleton = ({ className = '', variant = 'text' }) => {
  const variants = {
    text: 'h-4 w-full',
    title: 'h-8 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    card: 'h-48 w-full',
    image: 'aspect-video w-full',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 rounded',
        variants[variant],
        className
      )}
    />
  );
};

// Card Skeleton
export const CardSkeleton = () => (
  <div className="card p-0 overflow-hidden">
    <Skeleton variant="image" />
    <div className="p-4 space-y-3">
      <Skeleton variant="title" />
      <Skeleton />
      <Skeleton className="w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-24 h-10 rounded-lg" />
      </div>
    </div>
  </div>
);

export default Loading;
