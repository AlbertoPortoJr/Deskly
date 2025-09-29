'use client';

import { useEffect, ReactNode } from 'react';

interface ScreenReaderSupportProps {
  children: ReactNode;
  className?: string;
}

export default function ScreenReaderSupport({ children, className = '' }: ScreenReaderSupportProps) {
  useEffect(() => {
    // Create live region for announcements
    const createLiveRegion = () => {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'live-region';
      document.body.appendChild(liveRegion);
    };

    // Create skip links
    const createSkipLinks = () => {
      const skipLinks = document.createElement('div');
      skipLinks.className = 'sr-only focus:not-sr-only';
      skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
        <a href="#navigation" class="skip-link">Pular para a navegação</a>
        <a href="#filters" class="skip-link">Pular para os filtros</a>
      `;
      document.body.insertBefore(skipLinks, document.body.firstChild);
    };

    // Add screen reader styles
    const addScreenReaderStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        
        .sr-only.focus:not-sr-only {
          position: static;
          width: auto;
          height: auto;
          padding: 0.5rem;
          margin: 0;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }
        
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: var(--primary);
          color: var(--primary-foreground);
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 1000;
        }
        
        .skip-link:focus {
          top: 6px;
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          * {
            border-color: currentColor !important;
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    };

    createLiveRegion();
    createSkipLinks();
    addScreenReaderStyles();

    // Cleanup
    return () => {
      const liveRegion = document.getElementById('live-region');
      if (liveRegion) {
        liveRegion.remove();
      }
    };
  }, []);

  // Function to announce to screen readers
  const announce = (message: string) => {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = message;
    }
  };

  // Expose announce function globally for use in other components
  useEffect(() => {
    (window as Window & { announceToScreenReader?: (message: string) => void }).announceToScreenReader = announce;
  }, []);

  return (
    <div className={`screen-reader-support ${className}`}>
      {children}
    </div>
  );
}
