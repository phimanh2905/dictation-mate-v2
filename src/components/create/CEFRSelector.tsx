import React from 'react';
import { CEFRLevel } from '../../types';

interface CEFRSelectorProps {
  selected: CEFRLevel | null;
  onChange: (level: CEFRLevel) => void;
}

const levels: { id: CEFRLevel; label: string; color: string; bg: string; border: string }[] = [
  { id: 'A1', label: 'Beginner', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  { id: 'A2', label: 'Elementary', color: 'text-lime-600', bg: 'bg-lime-50', border: 'border-lime-200' },
  { id: 'B1', label: 'Intermediate', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
  { id: 'B2', label: 'Upper-Int', color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
  { id: 'C1', label: 'Advanced', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  { id: 'C2', label: 'Proficiency', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-200' },
];

export default function CEFRSelector({ selected, onChange }: CEFRSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">Cấp độ CEFR</label>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {levels.map((level) => {
          const isActive = selected === level.id;
          return (
            <button
              key={level.id}
              onClick={() => onChange(level.id)}
              className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 ${
                isActive 
                  ? `${level.bg} ${level.border} shadow-sm scale-105 z-10` 
                  : 'bg-white border-gray-100 hover:border-gray-200 grayscale-[0.5] opacity-70 hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <span className={`text-lg font-bold ${isActive ? level.color : 'text-gray-400'}`}>
                {level.id}
              </span>
              <span className={`text-[9px] font-bold uppercase tracking-tighter ${isActive ? level.color : 'text-gray-400'}`}>
                {level.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
