'use client';

import { useState } from 'react';
import { Button } from './Button';

interface Alert {
  id: string;
  type: 'occupancy' | 'revenue' | 'user' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: string;
}

interface SmartAlertsProps {
  onAlertAction?: (alertId: string, action: string) => void;
  className?: string;
}

export default function SmartAlerts({ onAlertAction, className = '' }: SmartAlertsProps) {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'occupancy',
      severity: 'high',
      title: 'Ocupação Crítica',
      message: 'Ocupação do espaço Aragorn atingiu 95% - considere liberar mais salas',
      timestamp: '2024-01-15 14:30',
      isRead: false,
      action: 'Ver detalhes'
    },
    {
      id: '2',
      type: 'revenue',
      severity: 'medium',
      title: 'Meta de Receita',
      message: 'Receita diária está 15% abaixo da meta - 3 horas restantes',
      timestamp: '2024-01-15 13:45',
      isRead: false,
      action: 'Analisar tendências'
    },
    {
      id: '3',
      type: 'user',
      severity: 'low',
      title: 'Novo Usuário',
      message: '5 novos usuários se registraram hoje - maior crescimento da semana',
      timestamp: '2024-01-15 12:20',
      isRead: true,
      action: 'Ver perfil'
    },
    {
      id: '4',
      type: 'system',
      severity: 'critical',
      title: 'Sistema de Reservas',
      message: 'Falha no sistema de reservas detectada - usuários não conseguem agendar',
      timestamp: '2024-01-15 11:15',
      isRead: false,
      action: 'Resolver agora'
    }
  ]);

  const [showSettings, setShowSettings] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    occupancyThreshold: 90,
    revenueThreshold: 80,
    enableNotifications: true,
    emailAlerts: true,
    pushNotifications: true
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        );
      case 'system':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Alertas Inteligentes</h3>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} alertas não lidos` : 'Todos os alertas foram lidos'}
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
            onClick={() => setAlerts(alerts.map(alert => ({ ...alert, isRead: true })))}
          >
            Marcar todos como lidos
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4">Configurações de Alertas</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Limite de Ocupação (%)
              </label>
              <input
                type="number"
                value={alertSettings.occupancyThreshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings, 
                  occupancyThreshold: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Limite de Receita (%)
              </label>
              <input
                type="number"
                value={alertSettings.revenueThreshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings, 
                  revenueThreshold: parseInt(e.target.value)
                })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alertSettings.enableNotifications}
                onChange={(e) => setAlertSettings({
                  ...alertSettings, 
                  enableNotifications: e.target.checked
                })}
                className="rounded border-border"
              />
              <label className="text-sm text-foreground">Ativar notificações</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alertSettings.emailAlerts}
                onChange={(e) => setAlertSettings({
                  ...alertSettings, 
                  emailAlerts: e.target.checked
                })}
                className="rounded border-border"
              />
              <label className="text-sm text-foreground">Alertas por email</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={alertSettings.pushNotifications}
                onChange={(e) => setAlertSettings({
                  ...alertSettings, 
                  pushNotifications: e.target.checked
                })}
                className="rounded border-border"
              />
              <label className="text-sm text-foreground">Notificações push</label>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 border rounded-lg transition-all duration-200 ${
              alert.isRead 
                ? 'bg-muted/30 border-border' 
                : 'bg-card border-border shadow-sm'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getSeverityColor(alert.severity)}`}>
                {getTypeIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className={`text-sm font-semibold ${
                    alert.isRead ? 'text-muted-foreground' : 'text-foreground'
                  }`}>
                    {alert.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    getSeverityColor(alert.severity)
                  }`}>
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
                
                <p className={`text-sm mb-2 ${
                  alert.isRead ? 'text-muted-foreground' : 'text-foreground'
                }`}>
                  {alert.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {alert.timestamp}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {alert.action && (
                      <button
                        onClick={() => onAlertAction?.(alert.id, alert.action!)}
                        className="text-xs text-primary hover:text-primary/80 font-medium"
                      >
                        {alert.action}
                      </button>
                    )}
                    {!alert.isRead && (
                      <button
                        onClick={() => markAsRead(alert.id)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum alerta</h3>
          <p className="text-muted-foreground">Tudo funcionando perfeitamente!</p>
        </div>
      )}
    </div>
  );
}
