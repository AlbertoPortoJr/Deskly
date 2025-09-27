'use client';

import { useState } from 'react';
import { Button } from './Button';

interface Insight {
  id: string;
  type: 'growth' | 'efficiency' | 'opportunity' | 'warning' | 'achievement';
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  confidence: number;
  timestamp: string;
  metrics: {
    before: number;
    after: number;
    change: number;
    unit: string;
  };
  action?: string;
}

interface AutoInsightsProps {
  onInsightAction?: (insightId: string, action: string) => void;
  className?: string;
}

export default function AutoInsights({ onInsightAction, className = '' }: AutoInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([
    {
      id: '1',
      type: 'growth',
      title: 'Crescimento Excepcional Detectado',
      description: 'Sua ocupação aumentou 15% esta semana comparado à semana anterior. Este é o maior crescimento dos últimos 3 meses.',
      impact: 'high',
      confidence: 94,
      timestamp: '2024-01-15 16:30',
      metrics: {
        before: 58,
        after: 68,
        change: 15,
        unit: '%'
      },
      action: 'Analisar fatores de crescimento'
    },
    {
      id: '2',
      type: 'efficiency',
      title: 'Otimização de Horários Identificada',
      description: 'Horários das 10h-12h têm 40% menos ocupação. Implementar promoções pode gerar +R$ 800/mês.',
      impact: 'medium',
      confidence: 87,
      timestamp: '2024-01-15 14:20',
      metrics: {
        before: 35,
        after: 55,
        change: 40,
        unit: '%'
      },
      action: 'Criar estratégia de promoção'
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Nova Oportunidade de Receita',
      description: 'Usuários estão solicitando serviços adicionais. Cafeteria e impressão podem gerar +R$ 1.2k/mês.',
      impact: 'high',
      confidence: 82,
      timestamp: '2024-01-15 12:45',
      metrics: {
        before: 0,
        after: 1200,
        change: 100,
        unit: 'R$/mês'
      },
      action: 'Avaliar viabilidade'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Padrão de Cancelamentos',
      description: 'Cancelamentos aumentaram 8% nas últimas 2 semanas. Principal causa: conflitos de horário.',
      impact: 'medium',
      confidence: 89,
      timestamp: '2024-01-15 11:30',
      metrics: {
        before: 12,
        after: 20,
        change: 8,
        unit: '%'
      },
      action: 'Investigar causas'
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Meta de Satisfação Atingida',
      description: 'Satisfação dos usuários atingiu 4.2/5 - meta mensal alcançada com 5 dias de antecedência!',
      impact: 'high',
      confidence: 95,
      timestamp: '2024-01-15 09:15',
      metrics: {
        before: 3.8,
        after: 4.2,
        change: 10.5,
        unit: '/5'
      },
      action: 'Compartilhar conquista'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'growth' | 'efficiency' | 'opportunity' | 'warning' | 'achievement'>('all');
  const [showSettings, setShowSettings] = useState(false);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'growth': return 'text-green-600 bg-green-100 border-green-200';
      case 'efficiency': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'opportunity': return 'text-purple-600 bg-purple-100 border-purple-200';
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'achievement': return 'text-pink-600 bg-pink-100 border-pink-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'growth':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'efficiency':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'opportunity':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredInsights = filter === 'all' 
    ? insights 
    : insights.filter(insight => insight.type === filter);

  const dismissInsight = (insightId: string) => {
    setInsights(insights.filter(insight => insight.id !== insightId));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Insights Automáticos</h3>
          <p className="text-sm text-muted-foreground">
            Análises inteligentes baseadas em seus dados
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowSettings(!showSettings)}
          >
            Configurar
          </Button>
          <Button 
            variant="outline"
            onClick={() => console.log('Atualizando insights...')}
          >
            Atualizar
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {[
          { id: 'all', label: 'Todos', count: insights.length },
          { id: 'growth', label: 'Crescimento', count: insights.filter(i => i.type === 'growth').length },
          { id: 'efficiency', label: 'Eficiência', count: insights.filter(i => i.type === 'efficiency').length },
          { id: 'opportunity', label: 'Oportunidade', count: insights.filter(i => i.type === 'opportunity').length },
          { id: 'warning', label: 'Atenção', count: insights.filter(i => i.type === 'warning').length },
          { id: 'achievement', label: 'Conquistas', count: insights.filter(i => i.type === 'achievement').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Configurações de Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Frequência de Análise
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="realtime">Tempo Real</option>
                <option value="hourly">A cada hora</option>
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Sensibilidade
              </label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground">
                <option value="high">Alta (mais insights)</option>
                <option value="medium">Média</option>
                <option value="low">Baixa (apenas importantes)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Insights List */}
      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <div
            key={insight.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${getTypeColor(insight.type)}`}>
                {getTypeIcon(insight.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {insight.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(insight.impact)}`}>
                    {insight.impact.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {insight.confidence}% confiança
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {insight.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Antes</div>
                    <div className="text-lg font-semibold text-foreground">
                      {insight.metrics.before}{insight.metrics.unit}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Depois</div>
                    <div className="text-lg font-semibold text-foreground">
                      {insight.metrics.after}{insight.metrics.unit}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-1">Mudança</div>
                    <div className={`text-lg font-semibold ${
                      insight.metrics.change > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {insight.metrics.change > 0 ? '+' : ''}{insight.metrics.change}{insight.metrics.unit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {insight.timestamp}
                  </span>
                  
                  <div className="flex gap-2">
                    {insight.action && (
                      <Button 
                        size="sm" 
                        onClick={() => onInsightAction?.(insight.id, 'action')}
                      >
                        {insight.action}
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => dismissInsight(insight.id)}
                    >
                      Dispensar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInsights.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum insight encontrado</h3>
          <p className="text-muted-foreground">
            {filter === 'all' 
              ? 'A IA está analisando seus dados para gerar insights...'
              : `Nenhum insight do tipo "${filter}" encontrado.`
            }
          </p>
        </div>
      )}
    </div>
  );
}
