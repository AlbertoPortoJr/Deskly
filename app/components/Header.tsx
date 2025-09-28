'use client';

import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="bg-card/80 backdrop-blur-sm border border-border/30 rounded-lg mt-4 px-4 py-4 lg:px-6 transition-all duration-500 ease-out">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 ease-out"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-foreground transition-all duration-500 ease-out">Painel Deskly</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 ease-out"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? (
              <svg
                className="w-5 h-5 text-muted-foreground hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-muted-foreground hover:text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
          
          <button className="p-2 rounded-lg hover:bg-accent/50 transition-all duration-300 ease-out relative">
            <svg
              className="w-5 h-5 text-muted-foreground hover:text-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
          </button>
        </div>
      </div>
    </header>
  );
}
