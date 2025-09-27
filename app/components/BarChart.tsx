'use client';

interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarChartData[];
  className?: string;
}

export default function BarChart({ data, className = '' }: BarChartProps) {
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center">
          <div className="text-2xl mb-1">📊</div>
          <p className="text-muted-foreground text-xs">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  const width = 320;
  const height = 180;
  const padding = 30;
  const barWidth = (width - 2 * padding) / data.length;
  const chartHeight = height - 2 * padding;

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`} 
        className="w-[320px] h-[180px]"
      >
        {/* Grid Lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + (ratio * chartHeight);
          return (
            <line
              key={index}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke="var(--muted)"
              strokeWidth="1"
              opacity="0.3"
            />
          );
        })}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = ((item.value - minValue) / range) * chartHeight;
          const x = padding + (index * barWidth) + (barWidth * 0.1);
          const y = height - padding - barHeight;
          const actualBarWidth = barWidth * 0.8;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={actualBarWidth}
                height={barHeight}
                fill={item.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
                rx="2"
              />
              <text
                x={x + actualBarWidth / 2}
                y={height - 5}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {item.label}
              </text>
              <text
                x={x + actualBarWidth / 2}
                y={y - 5}
                textAnchor="middle"
                className="text-xs font-medium fill-foreground"
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}