'use client';

import { ReactNode } from 'react';

interface FilterWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function FilterWrapper({ children, className = '' }: FilterWrapperProps) {
  return (
    <div className={`flex items-center gap-3 ml-auto ${className}`}>
      {children}
    </div>
  );
}

// Sub-components
export function FilterButton({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}

export function FilterIconButton({ icon, onClick, className = '' }: { icon: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 ${className}`}
    >
      {icon}
    </button>
  );
}

export function FilterCard({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <div 
      onClick={onClick}
      className={`bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg px-3 py-2 flex items-center gap-2 transition-colors duration-200 cursor-pointer ${className}`}
    >
      {children}
    </div>
  );
}

export function FilterSeparator() {
  return (
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function FilterToggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input type="checkbox" id="vacant-toggle" className="sr-only" checked={checked} onChange={onChange} />
        <label htmlFor="vacant-toggle" className="flex items-center cursor-pointer">
          <div className={`w-11 h-6 rounded-full p-1 transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}>
            <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </div>
        </label>
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}
