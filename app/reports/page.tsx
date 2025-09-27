'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import ReportTabs from '../components/ReportTabs';
import MetricCard from '../components/MetricCard';
import FilterPanel from '../components/FilterPanel';
import FilterWrapper, { FilterCard } from '../components/FilterWrapper';
import ChartContainer from '../components/ChartContainer';
import ChartCard from '../components/ChartCard';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import TrendAnalysis from '../components/TrendAnalysis';
import SpaceHeatmap from '../components/SpaceHeatmap';
import AdvancedFilters from '../components/AdvancedFilters';
import ExportButton from '../components/ExportButton';
import AutoReport from '../components/AutoReport';
import AnimatedCard from '../components/AnimatedCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import SmartAlerts from '../components/SmartAlerts';
import AIPredictions from '../components/AIPredictions';
import BenchmarkComparison from '../components/BenchmarkComparison';
import AutoInsights from '../components/AutoInsights';
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

                        {/* Gráficos em Grid Padronizado */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <ChartCard
                            title="Ocupação por Espaço" 
                            subtitle="Distribuição atual"
                          >
                            <PieChart 
                              data={[
                                { label: 'Frodo', value: 12, color: '#3B82F6' },
                                { label: 'Legolas', value: 8, color: '#10B981' },
                                { label: 'Aragorn', value: 15, color: '#F59E0B' },
                                { label: 'Gimli', value: 6, color: '#EF4444' }
                              ]}
                              size={140}
                            />
                          </ChartCard>

                          <ChartCard 
                            title="Ocupação por Hora" 
                            subtitle="Últimas 24 horas"
                          >
                            <LineChart 
                              data={[
                                { label: '00h', value: 5 },
                                { label: '04h', value: 2 },
                                { label: '08h', value: 15 },
                                { label: '12h', value: 45 },
                                { label: '16h', value: 38 },
                                { label: '20h', value: 25 }
                              ]}
                              color="#10B981"
                            />
                          </ChartCard>
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

                        {/* Gráficos em Grid 2x2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <ChartCard 
                            title="Ocupação por Espaço" 
                            subtitle="Distribuição atual"
                          >
                            <PieChart 
                              data={[
                                { label: 'Frodo', value: 12, color: '#3B82F6' },
                                { label: 'Legolas', value: 8, color: '#10B981' },
                                { label: 'Aragorn', value: 15, color: '#F59E0B' },
                                { label: 'Gimli', value: 6, color: '#EF4444' }
                              ]}
                              size={140}
                            />
                          </ChartCard>

                          <ChartCard 
                            title="Ocupação por Hora" 
                            subtitle="Últimas 24 horas"
                          >
                            <LineChart 
                              data={[
                                { label: '00h', value: 5 },
                                { label: '04h', value: 2 },
                                { label: '08h', value: 15 },
                                { label: '12h', value: 45 },
                                { label: '16h', value: 38 },
                                { label: '20h', value: 25 }
                              ]}
                              color="#10B981"
                            />
                          </ChartCard>

                          <ChartCard 
                            title="Ocupação por Dia" 
                            subtitle="Média semanal"
                          >
                            <BarChart 
                              data={[
                                { label: 'Seg', value: 45, color: '#3B82F6' },
                                { label: 'Ter', value: 52, color: '#3B82F6' },
                                { label: 'Qua', value: 48, color: '#3B82F6' },
                                { label: 'Qui', value: 61, color: '#F59E0B' },
                                { label: 'Sex', value: 38, color: '#10B981' }
                              ]}
                            />
                          </ChartCard>

                          <ChartCard 
                            title="Análise por Espaço" 
                            subtitle="Ocupação e satisfação"
                          >
                            <SpaceHeatmap 
                              data={[
                                { name: 'Frodo', occupancy: 75, reservations: 12, satisfaction: 4.2, color: '#3B82F6' },
                                { name: 'Legolas', occupancy: 45, reservations: 8, satisfaction: 4.5, color: '#10B981' },
                                { name: 'Aragorn', occupancy: 85, reservations: 15, satisfaction: 4.1, color: '#F59E0B' },
                                { name: 'Gimli', occupancy: 30, reservations: 6, satisfaction: 4.8, color: '#EF4444' }
                              ]}
                            />
                          </ChartCard>
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

                        {/* Gráficos em Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <ChartCard 
                            title="Tendências de Reservas" 
                            subtitle="Comparativo mensal"
                          >
                            <TrendAnalysis 
                              title="Análise de Tendências"
                              data={[
                                { period: 'Esta Semana', current: 156, previous: 142, change: 14, changePercent: 9.9 },
                                { period: 'Mês Atual', current: 624, previous: 598, change: 26, changePercent: 4.3 },
                                { period: 'Últimos 3 Meses', current: 1847, previous: 1723, change: 124, changePercent: 7.2 }
                              ]}
                            />
                          </ChartCard>

                          <ChartCard 
                            title="Reservas por Horário" 
                            subtitle="Distribuição diária"
                          >
                            <BarChart 
                              data={[
                                { label: '08h', value: 12, color: '#3B82F6' },
                                { label: '10h', value: 18, color: '#3B82F6' },
                                { label: '12h', value: 25, color: '#F59E0B' },
                                { label: '14h', value: 22, color: '#F59E0B' },
                                { label: '16h', value: 15, color: '#3B82F6' },
                                { label: '18h', value: 8, color: '#10B981' }
                              ]}
                            />
                          </ChartCard>
                        </div>

                        {/* Reservas por Espaço */}
                        <ChartCard 
                          title="Reservas por Espaço" 
                          subtitle="Distribuição semanal"
                        >
                          <BarChart 
                            data={[
                              { label: 'Frodo', value: 45, color: '#3B82F6' },
                              { label: 'Legolas', value: 32, color: '#10B981' },
                              { label: 'Aragorn', value: 58, color: '#F59E0B' },
                              { label: 'Gimli', value: 21, color: '#EF4444' },
                              { label: 'Gandalf', value: 38, color: '#8B5CF6' }
                            ]}
                          />
                        </ChartCard>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ChartCard 
                title="Receita por Mês" 
                subtitle="Últimos 6 meses"
              >
                <BarChart 
                  data={[
                    { label: 'Ago', value: 38, color: '#3B82F6' },
                    { label: 'Set', value: 42, color: '#3B82F6' },
                    { label: 'Out', value: 39, color: '#3B82F6' },
                    { label: 'Nov', value: 45, color: '#F59E0B' },
                    { label: 'Dez', value: 48, color: '#F59E0B' },
                    { label: 'Jan', value: 45, color: '#10B981' }
                  ]}
                />
              </ChartCard>

              <ChartCard 
                title="Receita por Espaço" 
                subtitle="Este mês"
              >
                            <PieChart 
                              data={[
                                { label: 'Aragorn', value: 18, color: '#F59E0B' },
                                { label: 'Frodo', value: 15, color: '#3B82F6' },
                                { label: 'Gandalf', value: 12, color: '#8B5CF6' },
                                { label: 'Legolas', value: 8, color: '#10B981' },
                                { label: 'Gimli', value: 5, color: '#EF4444' }
                              ]}
                              size={140}
                            />
              </ChartCard>
            </div>

            {/* Empty State para dados não disponíveis */}
            <EmptyState
              illustration="reports"
              title="Dados Financeiros Parciais"
              description="Alguns dados financeiros ainda não estão disponíveis. Configure a integração completa com seu sistema de pagamentos para visualizar todas as métricas."
              action={{
                label: "Configurar Integração Completa",
                onClick: () => console.log("Configurando integração financeira completa...")
              }}
            />
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
                <AIPredictions 
                  onPredictionAction={(predictionId, action) => {
                    console.log(`Ação na previsão ${predictionId}:`, action);
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <BenchmarkComparison 
                  onBenchmarkAction={(metric, action) => {
                    console.log(`Ação no benchmark ${metric}:`, action);
                  }}
                />
              </div>

              <div className="space-y-4">
                <AutoInsights 
                  onInsightAction={(insightId, action) => {
                    console.log(`Ação no insight ${insightId}:`, action);
                  }}
                />
              </div>
            </div>

            {/* Estados de Erro - Compacto */}
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Estados de Erro</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 border border-red-500/20 rounded-lg bg-red-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-foreground">Erro de Conexão</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Não foi possível conectar ao servidor</p>
                </div>
                <div className="p-3 border border-yellow-500/20 rounded-lg bg-yellow-500/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <h4 className="text-sm font-semibold text-foreground">Acesso Negado</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">Permissão insuficiente para acessar dados</p>
                </div>
              </div>
            </div>
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
