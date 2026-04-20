import React from 'react';
import { ArrowLeft, Settings, Bookmark, MoreHorizontal } from 'lucide-react';
import { Video, PracticeMode } from '../../types';
import ModeTabs from './ModeTabs';

interface PracticeHeaderProps {
  video: Video;
  onBack: () => void;
  mode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
  isTestMode: boolean;
  onToggleTestMode: () => void;
  onOpenSettings: () => void;
}

export default function PracticeHeader({ 
  video, 
  onBack, 
  mode, 
  onModeChange,
  isTestMode,
  onToggleTestMode,
  onOpenSettings
}: PracticeHeaderProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-10">
      <div className="flex items-center gap-4 w-1/4 min-w-0">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="min-w-0 hidden md:block">
          <h1 className="text-sm font-bold text-slate-800 truncate">{video.title}</h1>
          <div className="flex items-center gap-2">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              {isTestMode ? 'Test Mode' : 'Practice Mode'}
            </p>
            {isTestMode && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center gap-6">
        <ModeTabs active={mode} onChange={onModeChange} />
        
        {/* Mode Toggle */}
        <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => isTestMode && onToggleTestMode()}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              !isTestMode 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Practice
          </button>
          <button 
            onClick={() => !isTestMode && onToggleTestMode()}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${
              isTestMode 
                ? 'bg-amber-500 text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Test
          </button>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 w-1/4">
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
          <Bookmark size={18} />
        </button>
        <button 
          onClick={onOpenSettings}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Settings size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </header>
  );
}
