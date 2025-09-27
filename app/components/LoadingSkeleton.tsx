'use client';

interface LoadingSkeletonProps {
  type?: 'card' | 'chart' | 'table' | 'metric';
  className?: string;
}

export default function LoadingSkeleton({ type = 'card', className = '' }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>
          <div className="h-32 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse"></div>
          <div className="h-4 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'metric') {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded animate-pulse w-1/3"></div>
          <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
          <div className="h-3 bg-muted rounded animate-pulse w-1/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-muted rounded animate-pulse ${className}`}></div>
  );
}
