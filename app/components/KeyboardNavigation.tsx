'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface KeyboardNavigationProps {
  children: ReactNode;
  className?: string;
}

export default function KeyboardNavigation({ children, className = '' }: KeyboardNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'Tab':
          // Ensure focus is visible
          if (e.shiftKey) {
            // Shift + Tab - focus previous element
            const focusableElements = container.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const focusedElement = document.activeElement;
            const focusedIndex = Array.from(focusableElements).indexOf(focusedElement as Element);
            
            if (focusedIndex > 0) {
              e.preventDefault();
              (focusableElements[focusedIndex - 1] as HTMLElement).focus();
            }
          } else {
            // Tab - focus next element
            const focusableElements = container.querySelectorAll(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const focusedElement = document.activeElement;
            const focusedIndex = Array.from(focusableElements).indexOf(focusedElement as Element);
            
            if (focusedIndex < focusableElements.length - 1) {
              e.preventDefault();
              (focusableElements[focusedIndex + 1] as HTMLElement).focus();
            }
          }
          break;

        case 'Enter':
        case ' ':
          // Activate focused element
          const focusedElement = document.activeElement as HTMLElement;
          if (focusedElement && focusedElement.click) {
            e.preventDefault();
            focusedElement.click();
          }
          break;

        case 'Escape':
          // Close modals or return to previous state
          const modal = container.querySelector('[role="dialog"]');
          if (modal) {
            const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="fechar"]');
            if (closeButton) {
              (closeButton as HTMLElement).click();
            }
          }
          break;

        case 'ArrowUp':
        case 'ArrowDown':
          // Navigate through lists or menus
          const listItems = container.querySelectorAll('[role="listitem"], [role="menuitem"]');
          if (listItems.length > 0) {
            e.preventDefault();
            const currentIndex = Array.from(listItems).indexOf(document.activeElement as Element);
            let nextIndex;
            
            if (e.key === 'ArrowUp') {
              nextIndex = currentIndex > 0 ? currentIndex - 1 : listItems.length - 1;
            } else {
              nextIndex = currentIndex < listItems.length - 1 ? currentIndex + 1 : 0;
            }
            
            (listItems[nextIndex] as HTMLElement).focus();
          }
          break;

        case 'Home':
          // Go to first focusable element
          const firstElement = container.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (firstElement) {
            e.preventDefault();
            firstElement.focus();
          }
          break;

        case 'End':
          // Go to last focusable element
          const focusableElements = container.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          if (lastElement) {
            e.preventDefault();
            lastElement.focus();
          }
          break;
      }
    };

    // Add focus indicators
    const addFocusStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        .keyboard-navigation *:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
        
        .keyboard-navigation *:focus:not(:focus-visible) {
          outline: none;
        }
        
        .keyboard-navigation *:focus-visible {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }
      `;
      document.head.appendChild(style);
    };

    addFocusStyles();
    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`keyboard-navigation ${className}`}
      role="application"
      aria-label="Navegação por teclado ativada"
    >
      {children}
    </div>
  );
}
