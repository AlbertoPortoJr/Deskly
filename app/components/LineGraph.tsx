'use client';

interface LineGraphData {
  label: string;
  value: number;
}

interface LineGraphProps {
  data: LineGraphData[];
  color?: string;
  className?: string;
}

export default function LineGraph({ data, color = '#3B82F6', className = '' }: LineGraphProps) {
  if (data.length === 0) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="text-center">
          <div className="text-lg mb-1">📈</div>
          <p className="text-muted-foreground text-xs">Nenhum dado</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.value));
  const minValue = Math.min(...data.map(item => item.value));
  const range = maxValue - minValue || 1;

  const width = 200;
  const height = 100;
  const padding = 12;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((item.value - minValue) / range) * (height - 2 * padding);
    return { x, y, label: item.label, value: item.value };
  });

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  // Create area path
  const areaPath = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      {/* Chart */}
      <div className="flex-1 flex items-center justify-center min-h-0">
        <svg 
          width={width} 
          height={height} 
          viewBox={`0 0 ${width} ${height}`} 
          className="w-full h-full"
        >
        {/* Area fill */}
        <path
          d={areaPath}
          fill={color}
          opacity="0.1"
        />
        
        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data Points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="2"
            fill={color}
            stroke="white"
            strokeWidth="1.5"
            className="hover:r-3 transition-all cursor-pointer"
          >
            <title>{`${point.label}: ${point.value}`}</title>
          </circle>
        ))}
        </svg>
      </div>

      {/* Legend and Context */}
      <div className="flex items-center justify-between mt-1 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
          <span className="text-xs font-medium text-foreground">Ocupação (%)</span>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Última semana</div>
          <div className="text-xs font-semibold text-foreground">
            {data[data.length - 1]?.value}%
          </div>
        </div>
      </div>
    </div>
  );
}
