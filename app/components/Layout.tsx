'use client';

import { useState, useEffect } from 'react';
import { useSidebarState } from '../hooks/useSidebarState';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isCollapsed, isOpen, isInitialized, isNavigating, setOpen, setNavigating, toggleCollapse } = useSidebarState();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // const toggleSidebar = () => {
  //   if (!isNavigating) {
  //     toggleOpen();
  //   }
  // };

  const closeSidebar = () => {
    if (!isNavigating) {
      setOpen(false);
    }
  };

  const handleCollapseChange = () => {
    // This is handled by the hook now
  };

  // Set navigation state to prevent sidebar changes during navigation
  useEffect(() => {
    setNavigating(true);
    const timer = setTimeout(() => {
      setNavigating(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, setNavigating]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render until sidebar state is initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen sidebar-collapsed">
        <div 
          className="lg:mr-4 ml-[100px] transition-all duration-500 ease-out"
        >
          <main className="py-4">
            <div>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }


  return (
    <div className={`min-h-screen bg-background ${isCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      <Sidebar 
        isOpen={isOpen} 
        onClose={closeSidebar} 
        onCollapseChange={handleCollapseChange}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      <div 
        className={`lg:mr-4 transition-all duration-500 ease-out ${
          isMobile ? 'ml-0' : (isCollapsed ? 'ml-[100px]' : 'ml-[355px]')
        }`}
      >
        <main className="py-4">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}