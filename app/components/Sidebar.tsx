'use client';

import { useTheme } from '../hooks/useTheme';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCollapseChange?: (isCollapsed: boolean) => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function Sidebar({ isOpen, onClose, onCollapseChange, isCollapsed, toggleCollapse }: SidebarProps) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Notify parent of collapse state changes
  useEffect(() => {
    onCollapseChange?.(isCollapsed);
  }, [isCollapsed, onCollapseChange]);

  // Close user menu when pathname changes
  useEffect(() => {
    setShowUserMenu(false);
  }, [pathname]);

  const navigationItems = [
    {
      name: 'Painel',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      shortcut: '⌘1'
    },
    {
      name: 'Reservas',
      href: '/reservations',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      shortcut: '⌘2'
    }
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-4 left-4 h-[calc(100vh-2rem)] bg-card/95 backdrop-blur-sm border border-border/30 rounded-2xl shadow-2xl z-50 transform transition-all duration-500 ease-out ${
          isCollapsed ? 'w-16' : 'w-80'
        } ${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } lg:translate-x-0 lg:opacity-100 ${
          isCollapsed ? 'hover:w-20 cursor-pointer' : ''
        }`}
        onClick={(e) => {
          if (isCollapsed) {
            e.preventDefault();
            e.stopPropagation();
            toggleCollapse();
          }
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-between p-4'}`}>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 ease-out ${
                isCollapsed ? 'hover:scale-110 hover:shadow-lg animate-pulse' : ''
              }`}>
                <span className="text-primary-foreground font-bold text-sm">D</span>
              </div>
                  {!isCollapsed && (
                    <div className="transition-all duration-500 ease-out opacity-100 transform translate-x-0">
                      <h2 className="text-lg font-bold text-foreground">Deskly</h2>
                      <p className="text-xs text-muted-foreground">Plano da Equipe</p>
                    </div>
                  )}
            </div>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse();
                  }}
                  className="hidden lg:flex p-1.5 rounded-lg hover:bg-accent/50 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={onClose}
                  className="lg:hidden p-1.5 rounded-lg hover:bg-accent/50 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4 text-muted-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          {/* Collapsed Toggle Button */}
          {isCollapsed && (
            <div className="flex justify-center pb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCollapse();
                }}
                className="p-1.5 rounded-lg hover:bg-accent/50 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </div>
          )}

              {/* Search */}
              {!isCollapsed && (
                <div className="px-4 pb-4 transition-all duration-500 ease-out opacity-100 transform translate-y-0">
              <div className="relative group">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  className="w-full pl-10 pr-12 py-2.5 bg-muted/30 border border-border/20 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 placeholder:text-muted-foreground"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded text-[10px]">
                  ⌘1
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center ${
                      isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'
                    } rounded-lg text-sm transition-all duration-300 ease-out ${
                      isActive
                        ? 'text-primary'
                        : 'text-foreground hover:bg-accent/30'
                    } ${
                      isCollapsed ? 'hover:scale-105' : ''
                    }`}
                    title={isCollapsed ? item.name : undefined}
                    onClick={(e) => {
                      if (isCollapsed) {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleCollapse();
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-md transition-all duration-300 ease-out ${
                        isActive ? 'bg-primary/10 scale-110' : 'group-hover:bg-accent/20 group-hover:scale-105'
                      }`}>
                        <div className={`transition-all duration-300 ease-out ${
                          isActive ? 'text-primary' : 'text-foreground group-hover:text-primary/80'
                        }`}>
                          {item.icon}
                        </div>
                      </div>
                      {!isCollapsed && (
                        <span className="font-medium transition-all duration-500 ease-out opacity-100 transform translate-x-0">
                          {item.name}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <span className="text-xs text-muted-foreground bg-muted/40 px-1.5 py-0.5 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform scale-90 group-hover:scale-100">
                        {item.shortcut}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

              {/* Theme Toggle */}
              {!isCollapsed && (
                <div className="px-4 py-3 transition-all duration-500 ease-out opacity-100 transform translate-y-0">
              <div className="bg-muted/20 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">Tema</span>
                  <button
                    onClick={toggleTheme}
                    className="relative inline-flex h-6 w-10 items-center rounded-full bg-muted/50 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-primary/20 hover:scale-105"
                    role="switch"
                    aria-checked={theme === 'dark'}
                    aria-label="Alternar tema"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-background shadow-md transition-all duration-300 ${
                        theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-1">
                      <svg
                        className={`h-3 w-3 text-foreground transition-all duration-300 ${
                          theme === 'light' ? 'opacity-100 scale-100' : 'opacity-40 scale-75'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <svg
                        className={`h-3 w-3 text-foreground transition-all duration-300 ${
                          theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-40 scale-75'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    </div>
                  </button>
                </div>
                
                {/* Theme indicator */}
                <div className="text-[10px] text-muted-foreground">
                  {theme === 'dark' ? 'Escuro' : 'Claro'}
                </div>
              </div>
            </div>
          )}

          {/* User Profile */}
          <div className="px-4 pb-4">
            <div className="bg-muted/20 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-accent-foreground font-semibold text-xs">U</span>
                </div>
                    {!isCollapsed && (
                      <div className="flex-1 min-w-0 transition-all duration-500 ease-out opacity-100 transform translate-x-0">
                        <p className="text-xs font-semibold text-foreground truncate">Nome do Usuário</p>
                        <p className="text-[10px] text-muted-foreground truncate">usuario@exemplo.com</p>
                      </div>
                    )}
                {!isCollapsed && (
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-1.5 rounded-md hover:bg-accent/30 transition-all duration-200 group"
                  >
                    <svg className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${
                      showUserMenu ? 'rotate-180' : ''
                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            
              {/* User Menu Dropdown */}
              {showUserMenu && (
                <div className="mt-3 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 group">
                      <div className="p-1.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      </div>
                      <span className="font-medium">Configurações</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-foreground hover:bg-accent/50 rounded-lg transition-all duration-200 group">
                      <div className="p-1.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-medium">Ajuda</span>
                    </button>
                    <div className="border-t border-border/50 my-2"></div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-all duration-200 group">
                      <div className="p-1.5 rounded-lg bg-muted/50 group-hover:bg-destructive/10 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span className="font-medium">Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
