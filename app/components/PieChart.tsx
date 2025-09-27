'use client';

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  size?: number;
  className?: string;
}

export default function PieChart({ data, size = 160, className = '' }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  if (total === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center">
          <div className="text-2xl mb-1">📊</div>
          <p className="text-muted-foreground text-xs">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  let cumulativeAngle = 0;

  return (
    <div className={`flex flex-col items-center justify-center gap-4 w-full h-full ${className}`}>
      {/* Legend - Above the chart */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-[220px]">
        {data.map((item, index) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{item.label}</div>
                <div className="text-sm font-semibold text-foreground">{percentage}%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Donut Chart - Larger Size */}
      <div className="flex items-center justify-center">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="w-[140px] h-[140px]"
        >
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            
            const outerRadius = (size / 2) - 8;
            const innerRadius = (size / 2) - 20;
            const centerX = size / 2;
            const centerY = size / 2;
            
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + angle;
            
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;
            
            // Outer arc
            const x1 = centerX + outerRadius * Math.cos(startAngleRad);
            const y1 = centerY + outerRadius * Math.sin(startAngleRad);
            const x2 = centerX + outerRadius * Math.cos(endAngleRad);
            const y2 = centerY + outerRadius * Math.sin(endAngleRad);
            
            // Inner arc
            const x3 = centerX + innerRadius * Math.cos(endAngleRad);
            const y3 = centerY + innerRadius * Math.sin(endAngleRad);
            const x4 = centerX + innerRadius * Math.cos(startAngleRad);
            const y4 = centerY + innerRadius * Math.sin(startAngleRad);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${x1} ${y1}`,
              `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              `L ${x3} ${y3}`,
              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
              'Z'
            ].join(' ');
            
            cumulativeAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
