'use client';

interface SpaceData {
  name: string;
  occupancy: number;
  reservations: number;
  satisfaction: number;
  color: string;
}

interface SpaceHeatmapProps {
  data: SpaceData[];
  className?: string;
}

export default function SpaceHeatmap({ data, className = '' }: SpaceHeatmapProps) {
  const getOccupancyColor = (occupancy: number) => {
    if (occupancy >= 80) return 'bg-red-500';
    if (occupancy >= 60) return 'bg-yellow-500';
    if (occupancy >= 40) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getOccupancyLabel = (occupancy: number) => {
    if (occupancy >= 80) return 'Alta';
    if (occupancy >= 60) return 'Média';
    if (occupancy >= 40) return 'Baixa';
    return 'Muito Baixa';
  };

  return (
    <div className={`w-full h-full flex flex-col overflow-hidden ${className}`}>
      {/* Legend */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-green-500 rounded"></div>
          <span>Baixa</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-yellow-500 rounded"></div>
          <span>Média</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-red-500 rounded"></div>
          <span>Alta</span>
        </div>
      </div>
      
      {/* Spaces Grid - 2x2 layout */}
      <div className="grid grid-cols-2 gap-2 flex-1 min-h-0">
        {data.map((space, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-2 space-y-1.5 overflow-hidden">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground text-xs truncate">{space.name}</h4>
              <div className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                getOccupancyColor(space.occupancy)
              } text-white flex-shrink-0`}>
                {getOccupancyLabel(space.occupancy)}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Ocupação</span>
                <span className="text-xs font-medium text-foreground">{space.occupancy}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${getOccupancyColor(space.occupancy)}`}
                  style={{ width: `${space.occupancy}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-1 text-center">
              <div>
                <div className="text-sm font-bold text-foreground">{space.reservations}</div>
                <div className="text-xs text-muted-foreground">Reservas</div>
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">{space.satisfaction}/5</div>
                <div className="text-xs text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
