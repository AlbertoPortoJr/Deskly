'use client';

import { useState } from 'react';
import FilterWrapper, { FilterButton, FilterCard } from './FilterWrapper';

interface FilterPanelProps {
  onFilterChange: (filters: {
    dateRange: string;
    space: string;
    customDate?: { start: string; end: string };
  }) => void;
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedSpace, setSelectedSpace] = useState('all');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const handleDateRangeChange = (range: string) => {
    setSelectedDateRange(range);
    if (range === 'custom') {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      onFilterChange({
        dateRange: range,
        space: selectedSpace
      });
    }
  };

  const handleSpaceChange = (space: string) => {
    setSelectedSpace(space);
    onFilterChange({
      dateRange: selectedDateRange,
      space: space
    });
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      onFilterChange({
        dateRange: 'custom',
        space: selectedSpace,
        customDate: {
          start: customStartDate,
          end: customEndDate
        }
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Filtros Principais */}
      <div className="flex gap-2 sm:gap-4 items-center overflow-x-auto pb-2">
        <FilterWrapper>
          <FilterButton 
            onClick={() => handleDateRangeChange('today')}
            className={`whitespace-nowrap flex-shrink-0 ${selectedDateRange === 'today' ? '!bg-primary !text-primary-foreground' : ''}`}
          >
            Hoje
          </FilterButton>
          <FilterButton 
            onClick={() => handleDateRangeChange('yesterday')}
            className={`whitespace-nowrap flex-shrink-0 ${selectedDateRange === 'yesterday' ? '!bg-primary !text-primary-foreground' : ''}`}
          >
            Ontem
          </FilterButton>
          <FilterButton 
            onClick={() => handleDateRangeChange('week')}
            className={`whitespace-nowrap flex-shrink-0 ${selectedDateRange === 'week' ? '!bg-primary !text-primary-foreground' : ''}`}
          >
            <span className="hidden sm:inline">Últimos 7 dias</span>
            <span className="sm:hidden">7 dias</span>
          </FilterButton>
          
        </FilterWrapper>
      </div>

    </div>
  );
}
