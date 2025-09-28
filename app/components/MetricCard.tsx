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
    <div className={`bg-white border border-gray-200 rounded-xl p-6 w-full min-w-[200px] shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      
      <div className="space-y-2">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        
        {subtitle && (
          <p className="text-sm text-gray-500">{subtitle}</p>
        )}
        
        {trend && (
          <p className={`text-sm font-medium ${
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          }`}>
            {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
