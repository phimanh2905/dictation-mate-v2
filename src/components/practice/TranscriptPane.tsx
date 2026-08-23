import React from 'react';
import { Play, Clock, Volume2 } from 'lucide-react';
import { TranscriptLine } from '../../types';

interface TranscriptPaneProps {
  transcript: TranscriptLine[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function TranscriptPane({ transcript, activeIndex, onSelect }: TranscriptPaneProps) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Transcript</h3>
        <div className="flex items-center gap-2 px-2 py-1 bg-blue-50 rounded-md">
          <Clock size={12} className="text-blue-500" />
          <span className="text-[10px] font-bold text-blue-600 uppercase">Auto-scroll ON</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {transcript.map((line, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              onClick={() => onSelect(idx)}
              className={`p-4 rounded-2xl transition-all cursor-pointer border-2 ${
                isActive
                  ? 'bg-blue-50 border-blue-500 shadow-sm'
                  : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <div className={`flex items-start gap-4 transition-opacity ${!isActive ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex flex-col items-center mt-1 shrink-0">
                  <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-black border ${
                    isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}>
                    {line.timestamp}
                  </div>
                  {isActive && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <p className={`text-sm leading-relaxed flex items-center gap-2 ${isActive ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                      {isActive && (
                        <div className="flex items-center gap-0.5 h-3">
                          <div className="w-0.5 bg-blue-500 rounded-full animate-bounce h-full" style={{ animationDelay: '0ms' }} />
                          <div className="w-0.5 bg-blue-500 rounded-full animate-bounce h-2/3" style={{ animationDelay: '100ms' }} />
                          <div className="w-0.5 bg-blue-500 rounded-full animate-bounce h-1/2" style={{ animationDelay: '200ms' }} />
                        </div>
                      )}
                      {line.text}
                    </p>
                    {isActive && <Volume2 size={16} className="text-blue-500 mt-0.5 shrink-0" />}
                  </div>
                  
                  {isActive && (
                    <div className="space-y-2 pt-1">
                      <p className="text-[11px] font-mono font-bold text-blue-600/60 uppercase tracking-tighter">{line.ipa}</p>
                      <p className="text-xs text-slate-500 font-medium italic">{line.translation}</p>
                      <button className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95">
                        <Play size={10} fill="currentColor" />
                        Listen to chunk
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
