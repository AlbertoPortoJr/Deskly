import { ReactNode } from 'react';

interface EventCardProps {
  image: string;
  category: string;
  status: 'active' | 'inactive';
  date: string;
  time: string;
  title: string;
  location: string;
  price: string;
  onClick?: () => void;
}

export default function EventCard({
  image,
  category,
  status,
  date,
  time,
  title,
  location,
  price,
  onClick
}: EventCardProps) {
  return (
    <div 
      className="bg-card border border-border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Category Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-muted/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full">
            {category}
          </span>
        </div>
        
        {/* Status Tag */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-muted/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full">
            <div className={`w-2 h-2 rounded-full ${
              status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'
            }`}></div>
            <span className="capitalize">{status === 'active' ? 'Ativo' : 'Inativo'}</span>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Date and Time */}
        <div className="text-sm text-muted-foreground">
          {date} - {time}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground line-clamp-2">
          {title}
        </h3>
        
        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{location}</span>
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-foreground">{price}</span>
          <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
}
