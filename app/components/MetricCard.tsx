'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon?: string;
  className?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  icon,
  className = '' 
}: MetricCardProps) {
  return (
    <div className={`bg-card border border-border rounded-xl p-6 w-full min-w-[200px] shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        
        {trend && (
          <p className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
          }`}>
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
