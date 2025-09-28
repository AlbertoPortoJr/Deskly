'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { BarChart } from '../components/ui/bar-chart';
import { LineChart } from '../components/ui/line-chart';
import { AreaChart } from '../components/ui/area-chart';
import { PieChart } from '../components/ui/pie-chart';

import ReportTabs from '../components/ReportTabs';
import MetricCard from '../components/MetricCard';
import GraphCard from '../components/GraphCard';
import FilterPanel from '../components/FilterPanel';
import FilterWrapper, { FilterCard } from '../components/FilterWrapper';
import AdvancedFilters from '../components/AdvancedFilters';
import ExportButton from '../components/ExportButton';
import AutoReport from '../components/AutoReport';
import AnimatedCard from '../components/AnimatedCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SmartAlerts from '../components/SmartAlerts';
import BenchmarkComparison from '../components/BenchmarkComparison';
import EmptyState from '../components/EmptyState';
import ErrorBoundary from '../components/ErrorBoundary';
import ErrorState from '../components/ErrorState';
import AccessibilityWrapper from '../components/AccessibilityWrapper';
import KeyboardNavigation from '../components/KeyboardNavigation';
import ScreenReaderSupport from '../components/ScreenReaderSupport';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    dateRange: 'today',
    space: 'all',
    customDate: undefined as { start: string; end: string } | undefined
  });
  const [showAdvancedUserFilters, setShowAdvancedUserFilters] = useState(false);

  const reportTabs = [
    { id: 'overview', label: 'Visão Geral', count: 24, icon: '📊' },
    { id: 'occupancy', label: 'Ocupação', count: 18, icon: '🏢' },
    { id: 'reservations', label: 'Reservas', count: 32, icon: '📅' },
    { id: 'users', label: 'Usuários', count: 156, icon: '👥' },
    { id: 'financial', label: 'Financeiro', count: 8, icon: '💰' },
    { id: 'export', label: 'Exportar', count: 0, icon: '📤' },
    { id: 'advanced', label: 'Avançado', count: 12, icon: '🚀' }
  ];

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // Aqui você pode implementar a lógica de filtragem dos dados
    console.log('Filtros aplicados:', newFilters);
  };

  const renderTabContent = () => {
    switch (activeTab) {
                  case 'overview':
        return (
          <div className="space-y-6">
            {/* Métricas Principais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Ocupação Atual"
                value="68%"
                subtitle="12 ativas"
                trend={{ value: "+5% vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Reservas Hoje"
                value="24"
                subtitle="12 ativas"
                trend={{ value: "3 novas", isPositive: true }}
              />
              <MetricCard
                title="Espaços Disponíveis"
                value="8"
                subtitle="De 12 total"
                trend={{ value: "+1 vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Taxa de Ocupação"
                value="75%"
                subtitle="Média diária"
                trend={{ value: "+3% vs ontem", isPositive: true }}
              />
            </div>

            {/* Gráficos de Exemplo */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraphCard 
                title="Ocupação em Tempo Real" 
                subtitle="Distribuição atual por espaços"
              >
                <BarChart
                  data={[
                    { name: 'Aragorn', value: 95 },
                    { name: 'Gimli', value: 78 },
                    { name: 'Legolas', value: 62 },
                    { name: 'Frodo', value: 45 },
                    { name: 'Sam', value: 38 },
                    { name: 'Gandalf', value: 29 }
                  ]}
                  height={256}
                  color="#3b82f6"
                />
              </GraphCard>

              <GraphCard 
                title="Tendências de Uso" 
                subtitle="Análise temporal dos últimos 30 dias"
              >
                <LineChart
                  data={[
                    { name: 'Jan 1', value: 45 },
                    { name: 'Jan 8', value: 52 },
                    { name: 'Jan 15', value: 38 },
                    { name: 'Jan 22', value: 61 },
                    { name: 'Jan 29', value: 48 },
                    { name: 'Feb 5', value: 55 },
                    { name: 'Feb 12', value: 42 },
                    { name: 'Feb 19', value: 58 },
                    { name: 'Feb 26', value: 67 },
                    { name: 'Mar 5', value: 53 }
                  ]}
                  height={256}
                  color="#10b981"
                />
              </GraphCard>
            </div>


            {/* Alertas e Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Alertas Recentes</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Ocupação alta em Aragorn</p>
                      <p className="text-xs text-muted-foreground">95% - há 2 horas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Meta de receita atingida</p>
                      <p className="text-xs text-muted-foreground">R$ 3.2k - há 1 hora</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Insights Automáticos</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Crescimento detectado</p>
                    <p className="text-xs text-muted-foreground">Ocupação aumentou 15% esta semana</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <p className="text-sm font-medium text-foreground">Nova oportunidade</p>
                    <p className="text-xs text-muted-foreground">Horários 10h-12h podem gerar +R$ 800/mês</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'occupancy':
        return (
          <div className="space-y-6">
            {/* Métricas de Ocupação */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Taxa Média"
                value="68%"
                subtitle="Últimas 24h"
                trend={{ value: "+5% vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Pico de Movimento"
                value="12h-14h"
                subtitle="Horário mais movimentado"
                trend={{ value: "45 pessoas", isPositive: true }}
              />
              <MetricCard
                title="Espaço Mais Usado"
                value="Aragorn"
                subtitle="15 reservas hoje"
                trend={{ value: "Popular", isPositive: true }}
              />
              <MetricCard
                title="Ocupação Máxima"
                value="95%"
                subtitle="Aragorn hoje"
                trend={{ value: "Crítico", isPositive: false }}
              />
            </div>

            {/* Gráficos de Ocupação */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraphCard
                title="Ocupação por Hora"
                subtitle="Últimas 24 horas"
              >
                <AreaChart
                  data={[
                    { name: '00:00', value: 5 },
                    { name: '04:00', value: 3 },
                    { name: '08:00', value: 25 },
                    { name: '12:00', value: 65 },
                    { name: '16:00', value: 82 },
                    { name: '20:00', value: 35 }
                  ]}
                  height={256}
                  color="#f59e0b"
                />
              </GraphCard>

              <GraphCard
                title="Ocupação por Dia da Semana"
                subtitle="Análise semanal"
              >
                <BarChart
                  data={[
                    { name: 'Seg', value: 68 },
                    { name: 'Ter', value: 75 },
                    { name: 'Qua', value: 82 },
                    { name: 'Qui', value: 78 },
                    { name: 'Sex', value: 85 },
                    { name: 'Sáb', value: 45 },
                    { name: 'Dom', value: 25 }
                  ]}
                  height={256}
                  color="#ef4444"
                />
              </GraphCard>
            </div>

          </div>
        );
      case 'reservations':
        return (
          <div className="space-y-6">
            {/* Métricas de Reservas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Reservas Hoje"
                value="24"
                subtitle="12 ativas"
                trend={{ value: "+3 vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Taxa de Ocupação"
                value="68%"
                subtitle="Média diária"
                trend={{ value: "+5% vs semana", isPositive: true }}
              />
              <MetricCard
                title="Cancelamentos"
                value="3"
                subtitle="Taxa: 12.5%"
                trend={{ value: "-2 vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Reagendamentos"
                value="7"
                subtitle="Taxa: 29%"
                trend={{ value: "+1 vs ontem", isPositive: false }}
              />
            </div>

            {/* Gráficos de Reservas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraphCard
                title="Reservas por Período"
                subtitle="Últimos 30 dias"
              >
                <LineChart
                  data={[
                    { name: 'Sem 1', value: 45 },
                    { name: 'Sem 2', value: 52 },
                    { name: 'Sem 3', value: 38 },
                    { name: 'Sem 4', value: 61 },
                    { name: 'Sem 5', value: 48 }
                  ]}
                  height={256}
                  color="#8b5cf6"
                />
              </GraphCard>

              <GraphCard
                title="Taxa de Cancelamento"
                subtitle="Análise de tendências"
              >
                <AreaChart
                  data={[
                    { name: 'Jan', value: 15 },
                    { name: 'Fev', value: 12 },
                    { name: 'Mar', value: 18 },
                    { name: 'Abr', value: 8 },
                    { name: 'Mai', value: 14 },
                    { name: 'Jun', value: 10 }
                  ]}
                  height={256}
                  color="#ef4444"
                />
              </GraphCard>
            </div>

          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            {/* Métricas de Usuários */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Usuários Ativos"
                value="5"
                subtitle="Online agora"
                trend={{ value: "+2 vs ontem", isPositive: true }}
              />
              <MetricCard
                title="Novos Usuários"
                value="0"
                subtitle="Esta semana"
                trend={{ value: "+3 vs semana anterior", isPositive: true }}
              />
              <MetricCard
                title="Satisfação Média"
                value="4.4/5"
                subtitle="De 5.0"
                trend={{ value: "+0.2 vs mês anterior", isPositive: true }}
              />
              <MetricCard
                title="Total de Visitas"
                value="168"
                subtitle="Este mês"
                trend={{ value: "+12% vs mês anterior", isPositive: true }}
              />
            </div>

            {/* Gráficos de Usuários */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraphCard
                title="Usuários Mais Ativos"
                subtitle="Top 10 frequentadores"
              >
                <PieChart
                  data={[
                    { name: 'João Silva', value: 45 },
                    { name: 'Maria Santos', value: 38 },
                    { name: 'Pedro Costa', value: 32 },
                    { name: 'Ana Oliveira', value: 28 },
                    { name: 'Carlos Lima', value: 25 },
                    { name: 'Outros', value: 67 }
                  ]}
                  height={256}
                  colors={[
                    "#3b82f6",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#6b7280"
                  ]}
                />
              </GraphCard>

              <GraphCard
                title="Padrões de Comportamento"
                subtitle="Horários preferenciais"
              >
                <BarChart
                  data={[
                    { name: '08h-10h', value: 25 },
                    { name: '10h-12h', value: 45 },
                    { name: '12h-14h', value: 68 },
                    { name: '14h-16h', value: 52 },
                    { name: '16h-18h', value: 38 },
                    { name: '18h-20h', value: 28 }
                  ]}
                  height={256}
                  color="#3b82f6"
                />
              </GraphCard>
            </div>

            {/* Filtros Avançados */}
            {showAdvancedUserFilters && (
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Filtros Avançados</h3>
                <AdvancedFilters 
                  onFilterChange={(filters) => {
                    console.log('Filtros de usuários aplicados:', filters);
                  }}
                />
              </div>
            )}

          </div>
        );
                  case 'financial':
        return (
          <div className="space-y-6">
            {/* Métricas Financeiras */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Receita Mensal"
                value="R$ 45.2k"
                subtitle="Meta: R$ 50k"
                trend={{ value: "+8% vs mês anterior", isPositive: true }}
              />
              <MetricCard
                title="Custo por Usuário"
                value="R$ 15.2"
                subtitle="Média mensal"
                trend={{ value: "-3% vs mês anterior", isPositive: true }}
              />
              <MetricCard
                title="Margem de Lucro"
                value="32%"
                subtitle="Este mês"
                trend={{ value: "+2% vs mês anterior", isPositive: true }}
              />
              <MetricCard
                title="ROI Mensal"
                value="68%"
                subtitle="Últimos 30 dias"
                trend={{ value: "+3% vs mês anterior", isPositive: true }}
              />
            </div>

            {/* Gráficos Financeiros */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GraphCard
                title="Receita vs Meta"
                subtitle="Comparativo mensal"
              >
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">Receita</h5>
                    <BarChart
                      data={[
                        { name: 'Jan', value: 35 },
                        { name: 'Fev', value: 42 },
                        { name: 'Mar', value: 38 },
                        { name: 'Abr', value: 55 },
                        { name: 'Mai', value: 48 },
                        { name: 'Jun', value: 62 }
                      ]}
                      height={120}
                      color="#10b981"
                    />
                  </div>
                  <div>
                    <h5 className="text-sm font-medium mb-2">Meta</h5>
                    <BarChart
                      data={[
                        { name: 'Jan', value: 40 },
                        { name: 'Fev', value: 45 },
                        { name: 'Mar', value: 50 },
                        { name: 'Abr', value: 50 },
                        { name: 'Mai', value: 55 },
                        { name: 'Jun', value: 60 }
                      ]}
                      height={120}
                      color="#6b7280"
                    />
                  </div>
                </div>
              </GraphCard>

              <GraphCard
                title="Margem de Lucro"
                subtitle="Análise de rentabilidade"
              >
                <AreaChart
                  data={[
                    { name: 'Jan', value: 28 },
                    { name: 'Fev', value: 32 },
                    { name: 'Mar', value: 35 },
                    { name: 'Abr', value: 38 },
                    { name: 'Mai', value: 42 },
                    { name: 'Jun', value: 45 }
                  ]}
                  height={256}
                  color="#10b981"
                />
              </GraphCard>
            </div>

          </div>
        );
      case 'export':
        return (
          <div className="space-y-6">
            {/* Exportação Manual */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Exportar Relatórios</h3>
                    <p className="text-sm text-muted-foreground">Gere relatórios personalizados</p>
                  </div>
                  <ExportButton 
                    onExport={(format) => {
                      console.log(`Exportando relatório em ${format}`);
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">PDF Executivo</h4>
                        <p className="text-xs text-muted-foreground">Resumo para gestão</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-foreground">Excel Detalhado</h4>
                        <p className="text-xs text-muted-foreground">Dados brutos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Relatórios Automáticos</h3>
                <AutoReport 
                  onSchedule={(config) => {
                    console.log('Relatório agendado:', config);
                  }}
                />
              </div>
            </div>

            {/* Dashboard Personalizado */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Dashboard Personalizado</h3>
              <p className="text-sm text-muted-foreground mb-4">Configure widgets personalizados</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { name: 'Ocupação em Tempo Real', enabled: true },
                  { name: 'Reservas do Dia', enabled: true },
                  { name: 'Usuários Online', enabled: true },
                  { name: 'Receita Diária', enabled: false },
                  { name: 'Gráfico de Tendências', enabled: true },
                  { name: 'Heatmap de Espaços', enabled: false }
                ].map((widget, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border border-border rounded-lg">
                    <input
                      type="checkbox"
                      checked={widget.enabled}
                      onChange={() => {}}
                      className="rounded border-border"
                    />
                    <span className="text-sm text-foreground">{widget.name}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-sm">
                  Salvar
                </button>
                <button className="px-3 py-2 border border-border text-foreground rounded-md hover:bg-muted transition-colors text-sm">
                  Resetar
                </button>
              </div>
            </div>
          </div>
        );
      case 'advanced':
        return (
          <div className="space-y-6">
            {/* Grid de Funcionalidades Avançadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <SmartAlerts 
                  onAlertAction={(alertId, action) => {
                    console.log(`Ação no alerta ${alertId}:`, action);
                  }}
                />
              </div>

              <div className="space-y-4">
                <BenchmarkComparison 
                  onBenchmarkAction={(metric, action) => {
                    console.log(`Ação no benchmark ${metric}:`, action);
                  }}
                />
              </div>
            </div>

            {/* Estados de Erro - Compacto */}
            
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <AccessibilityWrapper>
        <ScreenReaderSupport>
          <KeyboardNavigation>
            <ErrorBoundary>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg shadow-md p-6">
                  <h1 className="text-3xl font-bold text-foreground mb-2">Relatórios de Uso</h1>
                  <p className="text-muted-foreground">
                    Estatísticas para nerds
                  </p>
                </div>

                {/* Tabs Navigation */}
                <ReportTabs 
                  tabs={reportTabs}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />

                {/* Filters */}
                <div className="flex gap-2 sm:gap-4 items-center overflow-x-auto pb-2">
                  <FilterPanel onFilterChange={handleFilterChange} />
                  
                  {/* Botão Mais Filtros - só aparece na aba de usuários */}
                  {activeTab === 'users' && (
                    <FilterWrapper>
                      <FilterCard onClick={() => setShowAdvancedUserFilters(!showAdvancedUserFilters)}>
                        <span className="text-sm">Filtros</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </FilterCard>
                    </FilterWrapper>
                  )}
                </div>

                {/* Tab Content */}
                {renderTabContent()}
              </div>
            </ErrorBoundary>
          </KeyboardNavigation>
        </ScreenReaderSupport>
      </AccessibilityWrapper>
    </Layout>
  );
}
