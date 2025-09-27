'use client';

import { ReactNode, useEffect, useState } from 'react';

interface AccessibilityWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function AccessibilityWrapper({ children, className = '' }: AccessibilityWrapperProps) {
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    // Check for user preferences
    const checkPreferences = () => {
      // High contrast
      if (window.matchMedia('(prefers-contrast: high)').matches) {
        setIsHighContrast(true);
      }

      // Reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsReducedMotion(true);
      }
    };

    checkPreferences();

    // Listen for changes
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    highContrastQuery.addEventListener('change', handleHighContrastChange);
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange);

    return () => {
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    // Apply accessibility styles
    const root = document.documentElement;
    
    if (isHighContrast) {
      root.style.setProperty('--accessibility-high-contrast', '1');
    } else {
      root.style.setProperty('--accessibility-high-contrast', '0');
    }

    if (isReducedMotion) {
      root.style.setProperty('--accessibility-reduced-motion', '1');
    } else {
      root.style.setProperty('--accessibility-reduced-motion', '0');
    }

    // Font size
    switch (fontSize) {
      case 'small':
        root.style.setProperty('--accessibility-font-scale', '0.875');
        break;
      case 'large':
        root.style.setProperty('--accessibility-font-scale', '1.125');
        break;
      case 'extra-large':
        root.style.setProperty('--accessibility-font-scale', '1.25');
        break;
      default:
        root.style.setProperty('--accessibility-font-scale', '1');
    }
  }, [isHighContrast, isReducedMotion, fontSize]);

  return (
    <div 
      className={`accessibility-wrapper ${className}`}
      data-high-contrast={isHighContrast}
      data-reduced-motion={isReducedMotion}
      data-font-size={fontSize}
    >
      {children}
    </div>
  );
}
