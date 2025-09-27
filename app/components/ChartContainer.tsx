'use client';

import { ReactNode } from 'react';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function ChartContainer({ 
  title, 
  subtitle, 
  children, 
  className = '',
  loading = false 
}: ChartContainerProps) {
  if (loading) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-6 bg-muted rounded animate-pulse"></div>
            {subtitle && <div className="h-4 bg-muted rounded animate-pulse w-2/3"></div>}
          </div>
          <div className="h-64 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="min-h-[320px] flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
