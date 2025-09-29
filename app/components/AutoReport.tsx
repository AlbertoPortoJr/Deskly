'use client';

import { useState } from 'react';
import { Button } from './Button';

interface AutoReportProps {
  onSchedule: (config: {
    frequency: 'daily' | 'weekly' | 'monthly';
    email: string;
    format: 'pdf' | 'excel';
    includeCharts: boolean;
  }) => void;
  className?: string;
}

export default function AutoReport({ onSchedule, className = '' }: AutoReportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    email: '',
    format: 'pdf' as 'pdf' | 'excel',
    includeCharts: true
  });

  const handleSubmit = () => {
    if (config.email) {
      onSchedule(config);
      setIsOpen(false);
      setConfig({
        frequency: 'weekly',
        email: '',
        format: 'pdf',
        includeCharts: true
      });
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Relatórios Automáticos</h3>
          <p className="text-sm text-muted-foreground">Configure relatórios periódicos por email</p>
        </div>
        <Button onClick={() => setIsOpen(!isOpen)} variant="outline">
          {isOpen ? 'Cancelar' : 'Configurar'}
        </Button>
      </div>

      {isOpen && (
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Frequência
              </label>
              <select
                value={config.frequency}
                onChange={(e) => setConfig({ ...config, frequency: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Formato
              </label>
              <select
                value={config.format}
                onChange={(e) => setConfig({ ...config, format: e.target.value as 'pdf' | 'excel' })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                <option value="pdf">PDF Executivo</option>
                <option value="excel">Excel Detalhado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Email de Destino
            </label>
            <input
              type="email"
              value={config.email}
              onChange={(e) => setConfig({ ...config, email: e.target.value })}
              placeholder="exemplo@empresa.com"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="includeCharts"
              checked={config.includeCharts}
              onChange={(e) => setConfig({ ...config, includeCharts: e.target.checked })}
              className="rounded border-border"
            />
            <label htmlFor="includeCharts" className="text-sm text-foreground">
              Incluir gráficos e visualizações
            </label>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSubmit} disabled={!config.email}>
              Agendar Relatório
            </Button>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Relatórios Agendados */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="text-sm font-semibold text-foreground mb-3">Relatórios Agendados</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Relatório Semanal</p>
                <p className="text-xs text-muted-foreground">admin@empresa.com • PDF</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Ativo</span>
              <button className="text-xs text-muted-foreground hover:text-foreground">Editar</button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Relatório Mensal</p>
                <p className="text-xs text-muted-foreground">gestao@empresa.com • Excel</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Ativo</span>
              <button className="text-xs text-muted-foreground hover:text-foreground">Editar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
