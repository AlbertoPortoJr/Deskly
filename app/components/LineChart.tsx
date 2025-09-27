'use client';

interface LineChartData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineChartData[];
  color?: string;
  className?: string;
}

export default function LineChart({ data, color = '#3B82F6', className = '' }: LineChartProps) {
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center">
          <div className="text-2xl mb-1">📈</div>
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

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((item.value - minValue) / range) * (height - 2 * padding);
    return { x, y, label: item.label, value: item.value };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

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
          const y = height - padding - ratio * (height - 2 * padding);
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
        
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = minValue + range * ratio;
          const y = height - padding - ratio * (height - 2 * padding);
          return (
            <text
              key={index}
              x={padding - 8}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-muted-foreground"
            >
              {Math.round(value)}
            </text>
          );
        })}
        
        {/* X-axis labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={height - 5}
            textAnchor="middle"
            className="text-xs fill-muted-foreground"
          >
            {point.label}
          </text>
        ))}
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-sm"
        />
        
        {/* Data Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2.5"
            fill={color}
            stroke="white"
            strokeWidth="1.5"
            className="hover:r-3.5 transition-all cursor-pointer"
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
}
