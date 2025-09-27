'use client';

interface TrendData {
  period: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
}

interface TrendAnalysisProps {
  title: string;
  data: TrendData[];
  className?: string;
}

export default function TrendAnalysis({ title, data, className = '' }: TrendAnalysisProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">{item.period}</span>
                <div className={`flex items-center gap-1 text-xs ${
                  item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  <svg 
                    className={`w-3 h-3 ${item.changePercent >= 0 ? 'rotate-0' : 'rotate-180'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                  </svg>
                  {Math.abs(item.changePercent).toFixed(1)}%
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-foreground">{item.current}</div>
                <div className="text-sm text-muted-foreground">
                  Anterior: {item.previous}
                </div>
                <div className={`text-xs ${
                  item.change >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.change >= 0 ? '+' : ''}{item.change} vs período anterior
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
