'use client';

// import { ReactNode } from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  type?: 'network' | 'permission' | 'data' | 'server' | 'generic';
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  retry?: () => void;
  className?: string;
}

export default function ErrorState({ 
  type = 'generic',
  title,
  message,
  action,
  retry,
  className = '' 
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
            </svg>
          ),
          title: title || 'Erro de Conexão',
          message: message || 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.',
          color: 'text-red-600 bg-red-100'
        };
      case 'permission':
        return {
          icon: (
            <svg className="w-12 h-12 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          title: title || 'Acesso Negado',
          message: message || 'Você não tem permissão para acessar este recurso. Entre em contato com o administrador.',
          color: 'text-yellow-600 bg-yellow-100'
        };
      case 'data':
        return {
          icon: (
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          title: title || 'Dados Não Encontrados',
          message: message || 'Os dados solicitados não estão disponíveis no momento. Tente novamente mais tarde.',
          color: 'text-blue-600 bg-blue-100'
        };
      case 'server':
        return {
          icon: (
            <svg className="w-12 h-12 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          ),
          title: title || 'Erro do Servidor',
          message: message || 'O servidor está temporariamente indisponível. Nossa equipe foi notificada e está trabalhando para resolver o problema.',
          color: 'text-orange-600 bg-orange-100'
        };
      case 'generic':
      default:
        return {
          icon: (
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          ),
          title: title || 'Algo deu errado',
          message: message || 'Ocorreu um erro inesperado. Tente novamente ou entre em contato com o suporte.',
          color: 'text-red-600 bg-red-100'
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
        {config.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {config.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {config.message}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {retry && (
          <Button onClick={retry} variant="outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Tentar novamente
          </Button>
        )}
        
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
        
        <Button 
          variant="outline" 
          onClick={() => window.location.href = '/reports'}
        >
          Voltar aos relatórios
        </Button>
      </div>
      
      <div className="mt-6 p-4 bg-muted/30 rounded-lg max-w-md mx-auto">
        <p className="text-sm text-muted-foreground">
          <strong>Dica:</strong> Se o problema persistir, entre em contato com o suporte técnico.
        </p>
      </div>
    </div>
  );
}
