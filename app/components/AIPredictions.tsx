'use client';

import { useState } from 'react';
import { Button } from './Button';

interface Prediction {
  id: string;
  type: 'occupancy' | 'revenue' | 'user_behavior' | 'maintenance';
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: 'low' | 'medium' | 'high';
  recommendation: string;
  data: {
    current: number;
    predicted: number;
    trend: 'up' | 'down' | 'stable';
  };
}

interface AIPredictionsProps {
  onPredictionAction?: (predictionId: string, action: string) => void;
  className?: string;
}

export default function AIPredictions({ onPredictionAction, className = '' }: AIPredictionsProps) {
  const [predictions] = useState<Prediction[]>([
    {
      id: '1',
      type: 'occupancy',
      title: 'Pico de Ocupação Previsto',
      description: 'Baseado nos padrões históricos, esperamos um aumento de 25% na ocupação na próxima quarta-feira entre 14h-16h',
      confidence: 87,
      timeframe: 'Próximos 3 dias',
      impact: 'high',
      recommendation: 'Considere liberar salas adicionais ou implementar sistema de fila',
      data: {
        current: 68,
        predicted: 85,
        trend: 'up'
      }
    },
    {
      id: '2',
      type: 'revenue',
      title: 'Oportunidade de Receita',
      description: 'Análise sugere que horários de menor movimento podem ser otimizados com promoções específicas',
      confidence: 73,
      timeframe: 'Próximas 2 semanas',
      impact: 'medium',
      recommendation: 'Implementar desconto de 15% para reservas entre 10h-12h',
      data: {
        current: 2400,
        predicted: 2800,
        trend: 'up'
      }
    },
    {
      id: '3',
      type: 'user_behavior',
      title: 'Mudança no Padrão de Uso',
      description: 'Usuários estão preferindo horários matinais. Recomendamos ajustar disponibilidade',
      confidence: 91,
      timeframe: 'Próximo mês',
      impact: 'medium',
      recommendation: 'Aumentar disponibilidade de salas entre 8h-10h',
      data: {
        current: 45,
        predicted: 62,
        trend: 'up'
      }
    },
    {
      id: '4',
      type: 'maintenance',
      title: 'Manutenção Preventiva Sugerida',
      description: 'Sistema de ar condicionado da sala Aragorn pode precisar de manutenção baseado no uso intensivo',
      confidence: 78,
      timeframe: 'Próximas 2 semanas',
      impact: 'low',
      recommendation: 'Agendar manutenção preventiva para evitar falhas',
      data: {
        current: 85,
        predicted: 95,
        trend: 'up'
      }
    }
  ]);

  const [showInsights, setShowInsights] = useState(false);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'occupancy':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'revenue':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        );
      case 'user_behavior':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'maintenance':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return (
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
        );
      case 'down':
        return (
          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-9.2 9.2M7 7v10h10" />
          </svg>
        );
      case 'stable':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Previsões com IA</h3>
          <p className="text-sm text-muted-foreground">
            Análises preditivas baseadas em dados históricos e padrões
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowInsights(!showInsights)}
          >
            {showInsights ? 'Ocultar' : 'Ver'} Insights
          </Button>
          <Button 
            variant="outline"
            onClick={() => console.log('Atualizando previsões...')}
          >
            Atualizar
          </Button>
        </div>
      </div>

      {/* AI Insights Panel */}
      {showInsights && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Insights da IA</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-blue-800">Padrão Detectado</span>
              </div>
              <p className="text-sm text-blue-700">
                Usuários preferem reservas de 2h+ nas quartas-feiras
              </p>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-green-800">Oportunidade</span>
              </div>
              <p className="text-sm text-green-700">
                Horários de baixa podem gerar +R$ 400/dia com promoções
              </p>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold text-yellow-800">Atenção</span>
              </div>
              <p className="text-sm text-yellow-700">
                Sistema pode precisar de manutenção em 2 semanas
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Predictions List */}
      <div className="space-y-4">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-full ${getImpactColor(prediction.impact)}`}>
                {getTypeIcon(prediction.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {prediction.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(prediction.impact)}`}>
                    {prediction.impact.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    {prediction.confidence}% confiança
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {prediction.description}
                </p>

                {/* Data Visualization */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Atual</div>
                    <div className="text-lg font-semibold text-foreground">
                      {prediction.type === 'revenue' ? `R$ ${prediction.data.current}` : `${prediction.data.current}%`}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Previsto</div>
                    <div className="text-lg font-semibold text-foreground">
                      {prediction.type === 'revenue' ? `R$ ${prediction.data.predicted}` : `${prediction.data.predicted}%`}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">Tendência</div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(prediction.data.trend)}
                      <span className="text-lg font-semibold text-foreground capitalize">
                        {prediction.data.trend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-foreground mb-1">Recomendação</h5>
                      <p className="text-sm text-muted-foreground">
                        {prediction.recommendation}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">
                    {prediction.timeframe}
                  </span>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onPredictionAction?.(prediction.id, 'implement')}
                    >
                      Implementar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onPredictionAction?.(prediction.id, 'dismiss')}
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
      {predictions.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhuma previsão disponível</h3>
          <p className="text-muted-foreground">A IA está analisando os dados para gerar insights...</p>
        </div>
      )}
    </div>
  );
}
