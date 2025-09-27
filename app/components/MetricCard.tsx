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
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        
        {trend && (
          <p className={`text-sm ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
