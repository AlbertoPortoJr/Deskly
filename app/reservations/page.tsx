'use client';

import Layout from '../components/Layout';
import Card from '../components/Card';
import { Button } from '../components/Button';
import FilterWrapper, { FilterButton, FilterIconButton, FilterCard, FilterSeparator, FilterToggle } from '../components/FilterWrapper';

export default function Reservations() {
  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Reservas</h1>
              <p className="text-muted-foreground">
                Disponibilidade de salas.
              </p>
            </div>
            <Button variant='outline' size="lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Reservar Sala
            </Button>
          </div>
        </Card>
        
        <div className="flex gap-4 items-center">
          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-2 bg-primary-foreground/20 rounded-full"></div>
            <div>
              <p className="text-sm opacity-90">Salas Disponíveis</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </div>
          
          <div className="bg-secondary text-secondary-foreground rounded-lg px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-2 bg-secondary-foreground/20 rounded-full"></div>
            <div>
              <p className="text-sm opacity-90">Reservadas Hoje</p>
              <p className="text-xl font-bold">8</p>
            </div>
          </div>

          {/* Filter Component */}
          <FilterWrapper>
            <FilterButton>Hoje</FilterButton>
            
            <FilterIconButton
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              }
            />
            
            <FilterIconButton
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              }
            />
            
            <FilterCard>
              <span className="text-sm">Qua, 25/09/2025</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </FilterCard>
            
            <FilterCard>
              <span className="text-sm">09:00</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FilterCard>
            
            <FilterSeparator />
            
            <FilterCard>
              <span className="text-sm">10:00</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FilterCard>
            
            <FilterToggle label="Apenas Vagos" checked={true} onChange={() => {}} />
            
            <FilterButton className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
              </svg>
              Mais Filtros
            </FilterButton>
          </FilterWrapper>
        </div>

        {/* Integrated Calendar with Room Cards Header */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Cronograma</h2>
            <div className="flex items-center gap-2">
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1200px]">
              {/* Time slots and rooms grid with integrated room cards */}
              <div className="border border-border rounded-lg overflow-hidden">
                {/* Header row with room cards */}
                <div className="grid grid-cols-5 gap-0">
                  {/* Time column header */}
                  <div className="bg-muted/50 border-r border-border p-4">            
                  </div>
                  
                  {/* Room Card 1 - Espaço de Eventos */}
                  <div className="bg-card border-r border-border p-3">
                    <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Bloco Frodo</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        8 Salas
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        40
                      </div>
                    </div>
                  </div>

                  {/* Room Card 2 - O Solário */}
                  <div className="bg-card border-r border-border p-3">
                    <div className="h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Bloco Legolas</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        6 Salas
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        30
                      </div>
                    </div>
                  </div>

                  {/* Room Card 3 - O Loft */}
                  <div className="bg-card border-r border-border p-3">
                    <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Bloco Aragorn</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        4 Salas
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        20
                      </div>
                    </div>
                  </div>

                  {/* Room Card 4 - Os Jardins */}
                  <div className="bg-card p-3">
                    <div className="h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mb-2">
                      <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1 text-sm">Bloco Gimli</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        2 Salas
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        100
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time slots grid */}
                <div className="grid grid-cols-5 gap-0">
                  {/* Time column header */}
                  <div className="bg-muted/50 border-r border-border">
                    <div className="h-12 border-b border-border flex items-center justify-center text-sm font-medium text-foreground">
                      Horário
                    </div>
                  </div>
                  
                  {/* Room headers - now empty since cards are above */}
                  <div className="bg-muted/50 border-r border-border">
                    <div className="h-12 border-b border-border"></div>
                  </div>
                  <div className="bg-muted/50 border-r border-border">
                    <div className="h-12 border-b border-border"></div>
                  </div>
                  <div className="bg-muted/50 border-r border-border">
                    <div className="h-12 border-b border-border"></div>
                  </div>
                  <div className="bg-muted/50">
                    <div className="h-12 border-b border-border"></div>
                  </div>

                {/* 09:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    09:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">09:00 - 10:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">09:00 - 10:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">09:00 - 10:00</span>
                    </div>
                  </div>
                </div>

                {/* 10:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    10:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border"></div>
                </div>

                {/* 11:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    11:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>

                {/* 12:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    12:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* Unavailable */}
                    <div className="absolute inset-1 bg-muted/50 border border-border rounded flex items-center justify-center" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, hsl(var(--muted-foreground) / 0.1) 2px, hsl(var(--muted-foreground) / 0.1) 4px)'
                    }}>
                      <span className="text-xs font-semibold text-muted-foreground">Indisponível</span>
                    </div>
                  </div>
                </div>

                {/* 13:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    13:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>

                {/* 14:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    14:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">13:00 - 14:00</span>
                    </div>
                  </div>
                </div>

                {/* 15:00 */}
                <div className="border-r border-border bg-muted/30">
                  <div className="h-16 border-b border-border flex items-center justify-center text-sm text-foreground">
                    15:00
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">14:00 - 15:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">14:00 - 15:00</span>
                    </div>
                  </div>
                </div>
                <div className="border-r border-border relative">
                  <div className="h-16 border-b border-border"></div>
                </div>
                <div className="relative">
                  <div className="h-16 border-b border-border">
                    {/* One-off booking */}
                    <div className="absolute inset-1 bg-green-100 border-l-4 border-green-500 rounded flex flex-col justify-center px-2">
                      <span className="text-xs font-semibold text-green-800">Única</span>
                      <span className="text-xs text-green-700">14:00 - 15:00</span>
                    </div>
                  </div>
                </div>
                 </div>
               </div>
             </div>
           </div>
        </Card>
    </div>
     </Layout>
  );
}
