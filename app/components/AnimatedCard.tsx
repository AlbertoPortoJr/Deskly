'use client';

import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  hover = true,
  delay = 0 
}: AnimatedCardProps) {
  return (
    <div 
      className={`bg-card border border-border rounded-lg shadow-md transition-all duration-300 ${
        hover ? 'hover:shadow-lg hover:scale-[1.02]' : ''
      } ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      {children}
    </div>
  );
}
