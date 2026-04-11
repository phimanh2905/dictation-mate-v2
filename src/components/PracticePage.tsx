import React, { useState } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Page, PracticeMode } from '../types';
import { MOCK_VIDEOS } from '../constants';
import PracticeHeader from './practice/PracticeHeader';
import ModeTabs from './practice/ModeTabs';
import VideoPane from './practice/VideoPane';
import PracticePane from './practice/PracticePane';
import { usePracticeLayout } from '../hooks/usePracticeLayout';

interface PracticePageProps {
  onNavigate: (page: Page) => void;
}

export default function PracticePage({ onNavigate }: PracticePageProps) {
  const [mode, setMode] = useState<PracticeMode>('dictation');
  const { userRatios, saveRatio } = usePracticeLayout();
  const [isVideoExpanded, setIsVideoExpanded] = useState(true);
  
  const video = MOCK_VIDEOS[0];
  const currentRatio = userRatios[mode];

  // Mobile check (simplified)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleResize = (sizes: number[]) => {
    saveRatio(mode, sizes[0]);
  };

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex flex-col bg-slate-50 z-[100] overflow-hidden">
        <PracticeHeader video={video} onBack={() => onNavigate('home')} />
        
        <div className="bg-white border-b border-slate-200 px-4 py-2 shrink-0">
          <ModeTabs 
            active={mode} 
            onChange={setMode} 
          />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Collapsible Video */}
          <AnimatePresence initial={false}>
            {isVideoExpanded && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                className="bg-black shrink-0 overflow-hidden"
              >
                <div className="aspect-video">
                  <VideoPane video={video} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Video Button */}
          <button
            onClick={() => setIsVideoExpanded(!isVideoExpanded)}
            className="py-2 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:text-white transition-colors shrink-0"
          >
            {isVideoExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {isVideoExpanded ? 'Thu gọn video' : 'Mở rộng video'}
          </button>

          {/* Practice Area */}
          <div className="flex-1 overflow-hidden">
            <PracticePane mode={mode} video={video} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 z-[100] overflow-hidden">
      <PracticeHeader video={video} onBack={() => onNavigate('home')} />
      
      <div className="bg-white border-b border-slate-200 px-4 py-2 shrink-0">
        <ModeTabs 
          active={mode} 
          onChange={setMode} 
        />
      </div>

      <PanelGroup 
        direction="horizontal" 
        className="flex-1 overflow-hidden"
        onLayout={handleResize}
      >
        {/* LEFT PANE: Video Only */}
        <Panel 
          defaultSize={currentRatio}
          minSize={25}
          maxSize={60}
          className="flex flex-col bg-black relative"
        >
          <VideoPane video={video} />
        </Panel>

        {/* DRAGGABLE SEPARATOR */}
        <PanelResizeHandle className="w-3 bg-slate-100 hover:bg-blue-100 active:bg-blue-200 transition-all cursor-col-resize relative group flex items-center justify-center">
          <div className="w-1 h-12 bg-slate-300 group-hover:bg-blue-500 rounded-full transition-colors" />
          
          <div className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 uppercase tracking-wider shadow-xl">
            Kéo để điều chỉnh
          </div>
        </PanelResizeHandle>

        {/* RIGHT PANE: Practice Area */}
        <Panel 
          defaultSize={100 - currentRatio}
          minSize={40}
          className="bg-slate-50 overflow-hidden"
        >
          <PracticePane mode={mode} video={video} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
