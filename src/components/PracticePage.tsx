import React, { useState, useEffect } from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from "react-resizable-panels";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown, Timer as TimerIcon, Pause, Play } from 'lucide-react';
import { Page, PracticeMode } from '../types';
import { MOCK_VIDEOS } from '../constants';
import PracticeHeader from './practice/PracticeHeader';
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
  
  // Test Mode State
  const [isTestMode, setIsTestMode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [chunkStatus, setChunkStatus] = useState<('unanswered' | 'correct' | 'wrong')[]>(
    Array(12).fill('unanswered')
  );

  // Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTestMode && isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestMode, isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTestMode = () => {
    if (!isTestMode) {
      // Starting Test Mode
      setTimer(0);
      setIsTimerRunning(true);
      setChunkStatus(Array(12).fill('unanswered'));
      setCurrentChunk(0);
    } else {
      // Stopping Test Mode
      setIsTimerRunning(false);
    }
    setIsTestMode(!isTestMode);
  };

  const video = MOCK_VIDEOS[0];
  const currentRatio = userRatios[mode];

  // Mobile check (simplified)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  const handleResize = (sizes: number[]) => {
    saveRatio(mode, sizes[0]);
  };

  const renderTimerBar = () => (
    <motion.div 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="sticky top-0 z-20 bg-amber-50 border-b border-amber-200 px-4 py-2 shadow-sm"
    >
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
            <TimerIcon className="w-4 h-4 text-amber-600" />
            <span className="font-mono text-lg font-bold text-amber-700">
              {formatTime(timer)}
            </span>
          </div>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Test Mode Active</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-2 hover:bg-amber-100 rounded-lg transition-colors"
          >
            {isTimerRunning ? <Pause className="w-5 h-5 text-amber-600" /> : <Play className="w-5 h-5 text-amber-600" />}
          </button>
        </div>
      </div>
    </motion.div>
  );

  const renderMiniMap = () => (
    <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0' : 'sticky bottom-0'} z-30 bg-white border-t shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-4 py-3`}>
      <div className="max-w-3xl mx-auto flex items-center gap-4">
        <div className="hidden sm:flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Progress</span>
          <span className="text-xs font-bold text-slate-600">{chunkStatus.filter(s => s !== 'unanswered').length}/12</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {chunkStatus.map((status, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentChunk(idx)}
              className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl text-xs font-black transition-all flex items-center justify-center border-2 ${
                idx === currentChunk
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-110 z-10'
                  : status === 'correct'
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : status === 'wrong'
                  ? 'bg-rose-50 text-rose-600 border-rose-200'
                  : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 flex flex-col bg-slate-50 z-[100] overflow-hidden">
        <PracticeHeader 
          video={video} 
          onBack={() => onNavigate('home')} 
          mode={mode}
          onModeChange={setMode}
          isTestMode={isTestMode}
          onToggleTestMode={toggleTestMode}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <AnimatePresence>
            {isTestMode && renderTimerBar()}
          </AnimatePresence>

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
          <div className="flex-1 overflow-hidden pb-16">
            <PracticePane mode={mode} video={video} />
          </div>

          {isTestMode && renderMiniMap()}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 z-[100] overflow-hidden">
      <PracticeHeader 
        video={video} 
        onBack={() => onNavigate('home')} 
        mode={mode}
        onModeChange={setMode}
        isTestMode={isTestMode}
        onToggleTestMode={toggleTestMode}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence>
          {isTestMode && renderTimerBar()}
        </AnimatePresence>

        <PanelGroup 
          direction="horizontal" 
          className="flex-1 overflow-hidden"
          onLayout={handleResize}
        >
          {/* LEFT PANE: Video Only */}
          <Panel 
            defaultSize={currentRatio}
            minSize={20}
            maxSize={80}
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
            minSize={20}
            className="bg-slate-50 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-hidden">
              <PracticePane mode={mode} video={video} />
            </div>
            {isTestMode && renderMiniMap()}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
