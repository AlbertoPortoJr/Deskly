'use client';

import { useState, useEffect } from 'react';

export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('sidebar-collapsed');
    const savedOpen = localStorage.getItem('sidebar-open');
    
    if (savedCollapsed !== null) {
      setIsCollapsed(savedCollapsed === 'true');
    }
    if (savedOpen !== null) {
      setIsOpen(savedOpen === 'true');
    }
    setIsInitialized(true);
  }, []);

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('sidebar-collapsed', newCollapsed.toString());
  };

  const setCollapsed = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    localStorage.setItem('sidebar-collapsed', collapsed.toString());
  };

  const toggleOpen = () => {
    if (isNavigating) return; // Prevent changes during navigation
    const newOpen = !isOpen;
    setIsOpen(newOpen);
    localStorage.setItem('sidebar-open', newOpen.toString());
  };

  const setOpen = (open: boolean) => {
    if (isNavigating) return; // Prevent changes during navigation
    setIsOpen(open);
    localStorage.setItem('sidebar-open', open.toString());
  };

  const setNavigating = (navigating: boolean) => {
    setIsNavigating(navigating);
  };

  return {
    isCollapsed,
    isOpen,
    isInitialized,
    isNavigating,
    toggleCollapse,
    setCollapsed,
    toggleOpen,
    setOpen,
    setNavigating,
  };
}
