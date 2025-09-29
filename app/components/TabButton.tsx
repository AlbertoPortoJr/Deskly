'use client';

interface TabButtonProps {
  id: string;
  label: string;
  count: number;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton({ 
  // id, 
  label, 
  count, 
  icon, 
  isActive, 
  onClick 
}: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${
        isActive 
          ? 'bg-primary-foreground/20 text-primary-foreground' 
          : 'bg-muted-foreground/20 text-muted-foreground'
      }`}>
        {count}
      </span>
    </button>
  );
}
