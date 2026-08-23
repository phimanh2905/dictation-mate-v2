import React from 'react';
import { ChevronLeft, ChevronRight, Check, AlertCircle } from 'lucide-react';

interface SentenceStepperProps {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function SentenceStepper({ current, total, onNext, onPrev }: SentenceStepperProps) {
  // Mock statuses for demonstration
  const getStatus = (index: number) => {
    if (index === 0) return { type: 'passed', score: 90 };
    if (index === 2) return { type: 'passed', score: 85 };
    if (index === 3) return { type: 'needs-practice', score: 55 };
    return { type: 'unvisited' };
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onPrev}
        disabled={current === 0}
        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
      >
        <ChevronLeft size={18} />
      </button>
      
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[400px] py-1 px-0.5">
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          const status = getStatus(i);
          
          let colorClass = 'bg-slate-100 text-slate-400 border-slate-200';
          let icon = null;

          if (isActive) {
            colorClass = 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 scale-105 z-10';
          } else if (status.type === 'passed') {
            colorClass = 'bg-emerald-50 text-emerald-600 border-emerald-100';
            icon = <Check size={8} strokeWidth={4} />;
          } else if (status.type === 'needs-practice') {
            colorClass = 'bg-amber-50 text-amber-600 border-amber-100';
            icon = <AlertCircle size={8} strokeWidth={4} />;
          }

          return (
            <button
              key={i}
              onClick={() => {}} // Handle navigation
              className={`min-w-[28px] h-7 px-1.5 rounded-lg border text-[10px] font-black transition-all flex items-center justify-center gap-0.5 ${colorClass}`}
            >
              {i + 1}
              {icon}
            </button>
          );
        })}
      </div>

      <button 
        onClick={onNext}
        disabled={current === total - 1}
        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 disabled:opacity-20 transition-all"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
