'use client';

import { useState } from 'react';
import { Button } from './Button';

interface PaginatedCarouselProps<T> {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  gridClassName?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  showPageCounter?: boolean;
  title?: string;
  onPageChange?: (page: number) => void;
}

export default function PaginatedCarousel<T>({
  items,
  itemsPerPage,
  renderItem,
  className = '',
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  showNavigation = true,
  showIndicators = true,
  showPageCounter = true,
  title,
  onPageChange
}: PaginatedCarouselProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setIsTransitioning(false);
        onPageChange?.(currentPage + 1);
      }, 150);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setIsTransitioning(false);
        onPageChange?.(currentPage - 1);
      }, 150);
    }
  };

  const goToPage = (page: number) => {
    if (page !== currentPage && page >= 0 && page < totalPages) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
        onPageChange?.(page);
      }, 150);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Navigation Header */}
      {(showNavigation || title || showPageCounter) && (
        <div className="flex items-center justify-between">
          {title && (
            <h2 className="text-xl font-semibold text-foreground">
              {title} ({items.length} total)
            </h2>
          )}
          
          {showNavigation && (
            <div className="flex items-center gap-2">
              {showPageCounter && (
                <span className="text-sm text-muted-foreground">
                  Página {currentPage + 1} de {totalPages}
                </span>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevPage}
                  disabled={currentPage === 0}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Items Grid */}
      <div className={`${gridClassName} transition-all duration-300 ease-in-out ${
        isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
      }`}>
        {currentItems.map((item, index) => renderItem(item, startIndex + index))}
      </div>

      {/* Page Indicators */}
      {showIndicators && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          {/* Previous Button */}
          <button
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                currentPage === index
                  ? 'bg-primary/80 text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
              currentPage === totalPages - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
