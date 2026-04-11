import React from 'react';
import { ArrowLeft, Settings, Bookmark, MoreHorizontal } from 'lucide-react';
import { Video, PracticeMode } from '../../types';
import ModeTabs from './ModeTabs';

interface PracticeHeaderProps {
  video: Video;
  onBack: () => void;
  mode: PracticeMode;
  onModeChange: (mode: PracticeMode) => void;
}

export default function PracticeHeader({ video, onBack, mode, onModeChange }: PracticeHeaderProps) {
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
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Practice Mode</p>
        </div>
      </div>

      <div className="flex-1 flex justify-center">
        <ModeTabs active={mode} onChange={onModeChange} />
      </div>

      <div className="flex items-center justify-end gap-2 w-1/4">
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
          <Bookmark size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={18} />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={18} />
        </button>
      </div>
    </header>
  );
}
