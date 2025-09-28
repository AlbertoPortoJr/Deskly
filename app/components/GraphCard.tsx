'use client';

interface GraphCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function GraphCard({ title, subtitle, children, className = '' }: GraphCardProps) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 w-full ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>

      {/* Graph Container */}
      <div className="h-80 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
