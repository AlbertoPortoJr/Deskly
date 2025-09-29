'use client';

import { useState } from 'react';
import FilterWrapper, { FilterButton } from './FilterWrapper';

interface AdvancedFiltersProps {
  onFilterChange: (filters: {
    userType: string;
    dateRange: string;
    space: string;
    satisfaction: string;
    customDate?: { start: string; end: string };
  }) => void;
}

export default function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [selectedUserType, setSelectedUserType] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('today');
  const [selectedSpace, setSelectedSpace] = useState('all');
  const [selectedSatisfaction, setSelectedSatisfaction] = useState('all');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  
  // Estados para controlar a exibição de mais opções
  const [showMoreUserTypes, setShowMoreUserTypes] = useState(false);
  const [showMoreDateRanges, setShowMoreDateRanges] = useState(false);
  const [showMoreSpaces, setShowMoreSpaces] = useState(false);
  const [showMoreSatisfaction, setShowMoreSatisfaction] = useState(false);

  const userTypes = [
    { id: 'all', label: 'Todos os Usuários' },
    { id: 'active', label: 'Usuários Ativos' },
    { id: 'new', label: 'Novos Usuários' },
    { id: 'inactive', label: 'Usuários Inativos' },
    { id: 'frequent', label: 'Usuários Frequentes' }
  ];

  const dateRanges = [
    { id: 'today', label: 'Hoje' },
    { id: 'yesterday', label: 'Ontem' },
    { id: 'week', label: 'Últimos 7 dias' },
    { id: 'month', label: 'Últimos 30 dias' },
    { id: 'quarter', label: 'Últimos 3 meses' },
    { id: 'year', label: 'Último ano' },
    { id: 'custom', label: 'Personalizado' }
  ];

  const spaces = [
    { id: 'all', label: 'Todos os Espaços' },
    { id: 'frodo', label: 'Frodo' },
    { id: 'legolas', label: 'Legolas' },
    { id: 'aragorn', label: 'Aragorn' },
    { id: 'gimli', label: 'Gimli' },
    { id: 'gandalf', label: 'Gandalf' }
  ];

  const satisfactionLevels = [
    { id: 'all', label: 'Todas as Avaliações' },
    { id: 'excellent', label: 'Excelente (5 estrelas)' },
    { id: 'good', label: 'Bom (4+ estrelas)' },
    { id: 'average', label: 'Regular (3+ estrelas)' },
    { id: 'poor', label: 'Ruim (< 3 estrelas)' }
  ];

  // const handleFilterChange = () => {
  //   onFilterChange({
  //     userType: selectedUserType,
  //     dateRange: selectedDateRange,
  //     space: selectedSpace,
  //     satisfaction: selectedSatisfaction,
  //     customDate: showCustomDate ? { start: customStartDate, end: customEndDate } : undefined
  //   });
  // };

  const handleUserTypeChange = (type: string) => {
    setSelectedUserType(type);
    onFilterChange({
      userType: type,
      dateRange: selectedDateRange,
      space: selectedSpace,
      satisfaction: selectedSatisfaction
    });
  };

  const handleDateRangeChange = (range: string) => {
    setSelectedDateRange(range);
    if (range === 'custom') {
      setShowCustomDate(true);
    } else {
      setShowCustomDate(false);
      onFilterChange({
        userType: selectedUserType,
        dateRange: range,
        space: selectedSpace,
        satisfaction: selectedSatisfaction
      });
    }
  };

  const handleSpaceChange = (space: string) => {
    setSelectedSpace(space);
    onFilterChange({
      userType: selectedUserType,
      dateRange: selectedDateRange,
      space: space,
      satisfaction: selectedSatisfaction
    });
  };

  const handleSatisfactionChange = (satisfaction: string) => {
    setSelectedSatisfaction(satisfaction);
    onFilterChange({
      userType: selectedUserType,
      dateRange: selectedDateRange,
      space: selectedSpace,
      satisfaction: satisfaction
    });
  };

  const handleCustomDateSubmit = () => {
    if (customStartDate && customEndDate) {
      onFilterChange({
        userType: selectedUserType,
        dateRange: 'custom',
        space: selectedSpace,
        satisfaction: selectedSatisfaction,
        customDate: {
          start: customStartDate,
          end: customEndDate
        }
      });
    }
  };

  // Componente auxiliar para renderizar filtros com "mostrar mais"
  const renderFilterSection = (
    title: string,
    items: Array<{ id: string; label: string }>,
    selectedValue: string,
    onChange: (value: string) => void,
    showMore: boolean,
    setShowMore: (value: boolean) => void
  ) => {
    const initialVisibleCount = 3; // Número de itens para mostrar inicialmente
    const itemsToShow = showMore ? items : items.slice(0, initialVisibleCount);
    const hasMoreItems = items.length > initialVisibleCount;

    // Dividir itens em linhas de no máximo 3
    const chunkedItems: Array<Array<{ id: string; label: string }>> = [];
    for (let i = 0; i < itemsToShow.length; i += 3) {
      chunkedItems.push(itemsToShow.slice(i, i + 3));
    }

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">{title}</h4>
        <div className="space-y-2">
          {chunkedItems.map((rowItems, rowIndex) => (
            <FilterWrapper key={rowIndex}>
              {rowItems.map((item) => (
                <FilterButton
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className={`whitespace-nowrap flex-shrink-0 ${selectedValue === item.id ? '!bg-primary !text-primary-foreground' : ''}`}
                >
                  {item.label}
                </FilterButton>
              ))}
            </FilterWrapper>
          ))}
        </div>
        
        {/* Botão de controle */}
        {hasMoreItems && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {showMore ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Mostrar menos
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Mostrar mais ({items.length - initialVisibleCount} opções)
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filtro por Tipo de Usuário */}
      {renderFilterSection(
        'Tipo de Usuário',
        userTypes,
        selectedUserType,
        handleUserTypeChange,
        showMoreUserTypes,
        setShowMoreUserTypes
      )}

      {/* Filtro por Período */}
      {renderFilterSection(
        'Período',
        dateRanges,
        selectedDateRange,
        handleDateRangeChange,
        showMoreDateRanges,
        setShowMoreDateRanges
      )}

      {/* Filtro por Espaço */}
      {renderFilterSection(
        'Espaço',
        spaces,
        selectedSpace,
        handleSpaceChange,
        showMoreSpaces,
        setShowMoreSpaces
      )}

      {/* Filtro por Satisfação */}
      {renderFilterSection(
        'Nível de Satisfação',
        satisfactionLevels,
        selectedSatisfaction,
        handleSatisfactionChange,
        showMoreSatisfaction,
        setShowMoreSatisfaction
      )}

      {/* Custom Date Picker */}
      {showCustomDate && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Período Personalizado</h4>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Data Inicial
              </label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Data Final
              </label>
              <input
                type="date"
                value={customEndDate}
                onChange={(e) => setCustomEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              />
            </div>
            <button
              onClick={handleCustomDateSubmit}
              className="w-full sm:w-auto px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}

      {/* Botão de Limpar Filtros */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setSelectedUserType('all');
            setSelectedDateRange('today');
            setSelectedSpace('all');
            setSelectedSatisfaction('all');
            setShowCustomDate(false);
            onFilterChange({
              userType: 'all',
              dateRange: 'today',
              space: 'all',
              satisfaction: 'all'
            });
          }}
          className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Limpar Todos os Filtros
        </button>
      </div>
    </div>
  );
}
