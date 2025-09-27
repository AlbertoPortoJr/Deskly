'use client';

import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-4 flex flex-col ${className}`}>
      <div className="mb-3">
        <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="w-full h-[280px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
