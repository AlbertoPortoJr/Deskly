import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'elevated' | 'outlined';
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  variant = 'default' 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-card border border-border shadow-md',
    elevated: 'bg-card border border-border shadow-lg',
    outlined: 'bg-transparent border border-border'
  };

  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} rounded-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}
