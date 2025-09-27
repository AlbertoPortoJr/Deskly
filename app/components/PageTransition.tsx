'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LoadingSpinner } from './atoms/loading-spinner';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldShowContent, setShouldShowContent] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Evita o glitch no carregamento inicial
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setShouldShowContent(true);
      setIsReady(true);
      return;
    }

    // Inicia a transição imediatamente - esconde conteúdo primeiro
    setShouldShowContent(false);
    setIsReady(false);
    setIsTransitioning(true);
    setIsLoading(true);
    
    // Timer para finalizar o loading
    const timer = setTimeout(() => {
      // Atualiza o conteúdo primeiro
      setDisplayChildren(children);
      
      // Pequeno delay para garantir que o loading desapareça antes do conteúdo aparecer
      setTimeout(() => {
        setIsLoading(false);
        setIsTransitioning(false);
        setShouldShowContent(true);
        setIsReady(true);
      }, 50);
    }, 1000); // 1 segundo para transição mais rápida

    return () => clearTimeout(timer);
  }, [pathname, children, isInitialLoad]);

  return (
    <div className="relative min-h-[400px]">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-lg z-50 flex items-center justify-center transition-all duration-500">
          <div className="flex flex-col items-center gap-6 p-8 bg-card/80 backdrop-blur-sm rounded-xl border border-border/60 shadow-lg">
            <LoadingSpinner size="lg" className="text-primary" />
            <div className="text-center">
              <p className="text-base font-semibold text-foreground mb-1">Carregando página...</p>
              <p className="text-sm text-muted-foreground">Aguarde um momento</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Page Content */}
      {shouldShowContent && !isTransitioning && !isLoading && isReady && (
        <div>
          {displayChildren}
        </div>
      )}
    </div>
  );
}
