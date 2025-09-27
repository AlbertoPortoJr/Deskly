'use client';

import { useState } from 'react';
import { Button } from './Button';

interface BenchmarkData {
  metric: string;
  yourValue: number;
  industryAverage: number;
  topPerformers: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  performance: 'above' | 'below' | 'average';
}

interface BenchmarkComparisonProps {
  onBenchmarkAction?: (metric: string, action: string) => void;
  className?: string;
}

export default function BenchmarkComparison({ onBenchmarkAction, className = '' }: BenchmarkComparisonProps) {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([
    {
      metric: 'Taxa de Ocupação',
      yourValue: 68,
      industryAverage: 72,
      topPerformers: 85,
      unit: '%',
      trend: 'up',
      performance: 'below'
    },
    {
      metric: 'Receita por M²',
      yourValue: 45,
      industryAverage: 52,
      topPerformers: 68,
      unit: 'R$/m²',
      trend: 'up',
      performance: 'below'
    },
    {
      metric: 'Satisfação do Cliente',
      yourValue: 4.2,
      industryAverage: 4.0,
      topPerformers: 4.8,
      unit: '/5',
      trend: 'stable',
      performance: 'above'
    },
    {
      metric: 'Taxa de Retenção',
      yourValue: 78,
      industryAverage: 75,
      topPerformers: 88,
      unit: '%',
      trend: 'up',
      performance: 'above'
    },
    {
      metric: 'Custo por Usuário',
      yourValue: 12.5,
      industryAverage: 15.2,
      topPerformers: 8.5,
      unit: 'R$/usuário',
      trend: 'down',
      performance: 'above'
    },
    {
      metric: 'Tempo de Resposta',
      yourValue: 2.3,
      industryAverage: 3.1,
      topPerformers: 1.8,
      unit: 'horas',
      trend: 'stable',
      performance: 'above'
    }
  ]);

  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'above': return 'text-green-600 bg-green-100 border-green-200';
      case 'below': return 'text-red-600 bg-red-100 border-red-200';
      case 'average': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
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

  const getPerformanceLabel = (performance: string) => {
    switch (performance) {
      case 'above': return 'Acima da média';
      case 'below': return 'Abaixo da média';
      case 'average': return 'Na média';
      default: return 'N/A';
    }
  };

  const calculateGap = (your: number, target: number) => {
    return ((target - your) / your * 100).toFixed(1);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Comparativo com Mercado</h3>
          <p className="text-sm text-muted-foreground">
            Benchmark com outros coworkings da região
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Ocultar' : 'Ver'} Detalhes
          </Button>
          <Button 
            variant="outline"
            onClick={() => console.log('Atualizando benchmark...')}
          >
            Atualizar
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Métricas Acima da Média</h4>
              <p className="text-2xl font-bold text-green-600">
                {benchmarkData.filter(item => item.performance === 'above').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Oportunidades</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {benchmarkData.filter(item => item.performance === 'below').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Posição Geral</h4>
              <p className="text-2xl font-bold text-blue-600">#12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Comparison */}
      {showDetails && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Análise Detalhada</h4>
          <div className="space-y-4">
            {benchmarkData.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedMetric === item.metric 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMetric(selectedMetric === item.metric ? null : item.metric)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h5 className="text-sm font-semibold text-foreground">{item.metric}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(item.performance)}`}>
                      {getPerformanceLabel(item.performance)}
                    </span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(item.trend)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">
                      {item.yourValue}{item.unit}
                    </div>
                    <div className="text-xs text-muted-foreground">Seu valor</div>
                  </div>
                </div>

                {selectedMetric === item.metric && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {item.yourValue}{item.unit}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Seu Coworking</div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${(item.yourValue / Math.max(item.industryAverage, item.topPerformers)) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-muted-foreground mb-1">
                          {item.industryAverage}{item.unit}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Média do Mercado</div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-yellow-500 h-2 rounded-full" 
                            style={{ width: `${(item.industryAverage / Math.max(item.industryAverage, item.topPerformers)) * 100}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">
                          {item.topPerformers}{item.unit}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">Top Performers</div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: '100%' }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Gap para média: {calculateGap(item.yourValue, item.industryAverage)}%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Gap para top: {calculateGap(item.yourValue, item.topPerformers)}%
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onBenchmarkAction?.(item.metric, 'improve')}
                      >
                        Melhorar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onBenchmarkAction?.(item.metric, 'analyze')}
                      >
                        Analisar
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Recomendações de Melhoria</h4>
        <div className="space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-red-800">Taxa de Ocupação</h5>
                <p className="text-sm text-red-700">
                  Implementar estratégias de marketing para aumentar ocupação em 4% para atingir a média do mercado
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-yellow-800">Receita por M²</h5>
                <p className="text-sm text-yellow-700">
                  Otimizar layout e preços para aumentar receita por m² em 7 pontos
                </p>
              </div>
            </div>
          </div>

          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-green-800">Satisfação do Cliente</h5>
                <p className="text-sm text-green-700">
                  Continue mantendo a alta satisfação - você está acima da média do mercado!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
