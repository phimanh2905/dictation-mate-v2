import React from 'react';
import { PracticeMode } from '../../types';
import { Type, Mic, MessageSquare, PenTool } from 'lucide-react';

interface ModeTabsProps {
  active: PracticeMode;
  onChange: (mode: PracticeMode) => void;
  className?: string;
}

const modes: { id: PracticeMode; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'dictation', label: 'Dictation', icon: Type, color: 'blue' },
  { id: 'shadowing', label: 'Shadowing', icon: Mic, color: 'violet' },
  { id: 'speaking', label: 'Speaking', icon: MessageSquare, color: 'emerald' },
  { id: 'writing', label: 'Writing', icon: PenTool, color: 'amber' },
];

export default function ModeTabs({ active, onChange, className = '' }: ModeTabsProps) {
  return (
    <div className={`flex p-1 bg-slate-100 rounded-xl w-fit mx-auto ${className}`}>
      {modes.map((mode) => {
        const isActive = active === mode.id;
        const Icon = mode.icon;
        
        const colorClasses: Record<string, string> = {
          blue: 'text-blue-600',
          violet: 'text-violet-600',
          emerald: 'text-emerald-600',
          amber: 'text-amber-600',
        };

        const dotClasses: Record<string, string> = {
          blue: 'bg-blue-500',
          violet: 'bg-violet-500',
          emerald: 'bg-emerald-500',
          amber: 'bg-amber-500',
        };

        return (
          <button
            key={mode.id}
            onClick={() => onChange(mode.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all relative ${
              isActive 
                ? `bg-white ${colorClasses[mode.color]} shadow-sm` 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            {isActive && (
              <span className={`w-2 h-2 ${dotClasses[mode.color]} rounded-full`} />
            )}
            {!isActive && <Icon size={16} />}
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
