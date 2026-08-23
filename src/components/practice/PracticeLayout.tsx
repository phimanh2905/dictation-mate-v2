import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, ChevronRight, Volume2, Sparkles, Settings, ArrowLeft, Keyboard, ChevronDown, EyeOff } from 'lucide-react';
import { Video, RecordingState, AssessmentWord, TranscriptLine } from '../../types';
import VideoPane from './VideoPane';
import TranscriptPane from './TranscriptPane';
import RecordingArea from './RecordingArea';
import SentenceStepper from './SentenceStepper';
import ModeTabs from './ModeTabs';
import { MOCK_TRANSCRIPT, MOCK_ASSESSMENT_WORDS } from '../../mockData';

interface PracticeLayoutProps {
  video: Video;
  onBack: () => void;
}

export default function PracticeLayout({ video, onBack }: PracticeLayoutProps) {
  const [activeMode, setActiveMode] = useState<'shadowing' | 'dictation' | 'summary'>('shadowing');
  const [activeIndex, setActiveIndex] = useState(1); // Sentence 2 as requested
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  
  const currentSentence = MOCK_TRANSCRIPT[activeIndex];

  const handleRecord = () => {
    setRecordingState('recording');
    // Simulate recording for 4 seconds
    setTimeout(() => {
      setRecordingState('evaluating');
      setTimeout(() => {
        setRecordingState('result');
      }, 1500);
    }, 4000);
  };

  const handleStop = () => {
    setRecordingState('evaluating');
    setTimeout(() => {
      setRecordingState('result');
    }, 1500);
  };

  const handleRetry = () => {
    setRecordingState('idle');
  };

  const handleNext = () => {
    if (activeIndex < MOCK_TRANSCRIPT.length - 1) {
      setActiveIndex(prev => prev + 1);
      setRecordingState('idle');
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
      setRecordingState('idle');
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="h-12 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-6 w-1/3">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-all active:scale-95"
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-xs font-black text-slate-900 leading-tight">A1 English Listening Practice - Money</h1>
            <div className="flex items-center gap-1.5">
               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Shadowing Mode</span>
               <div className="w-1 h-1 bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center scale-90">
          <ModeTabs active={activeMode} onChange={(m) => setActiveMode(m as any)} />
        </div>

        <div className="flex items-center justify-end gap-2 w-1/3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-blue-600 rounded-full shadow-lg shadow-blue-100">
            <span className="text-[10px] font-black text-white">63%</span>
            <span className="text-[8px] font-bold text-blue-100 uppercase tracking-widest border-l border-blue-400/50 pl-2">Accuracy</span>
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-all">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* 2. LEFT COLUMN (42% Width) */}
        <section className="w-[42%] flex flex-col border-r border-slate-200 bg-white">
          <div className="max-h-[220px] aspect-video bg-black relative shrink-0 group overflow-hidden">
             <VideoPane video={video} />
          </div>
          
          <TranscriptPane 
            transcript={MOCK_TRANSCRIPT} 
            activeIndex={activeIndex} 
            onSelect={setActiveIndex} 
          />
        </section>

        {/* 3. RIGHT COLUMN (58% Width) */}
        <section className="w-[58%] flex flex-col bg-slate-50 relative overflow-hidden">
          {/* Section 1: Header Toolbar & Number Stepper (~68px) */}
          <div className="bg-white border-b border-slate-100 px-6 py-2 shrink-0 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shadowing</span>
                <span className="text-xs font-bold text-slate-900">(Sentence {activeIndex + 1}/60)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 hover:bg-slate-100 transition-all">⇄ LOOP (5)</button>
                <button className="px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black text-slate-500 hover:bg-slate-100 transition-all flex items-center gap-1">SPEED 1X <ChevronDown size={8} /></button>
                <button className="p-1.5 bg-slate-50 border border-slate-100 rounded-lg text-slate-500 hover:bg-slate-100 transition-all"><Volume2 size={12} /></button>
              </div>
            </div>
            <div className="flex justify-center">
              <SentenceStepper 
                current={activeIndex} 
                total={MOCK_TRANSCRIPT.length} 
                onNext={handleNext} 
                onPrev={handlePrev} 
              />
            </div>
          </div>

          {/* Section 2: Compact Target Sentence Card (~110px) */}
          <div className="px-6 py-4 shrink-0">
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative group min-h-[110px] flex items-center">
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button className="p-1.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                  <Volume2 size={14} fill="currentColor" />
                </button>
                <button className="p-1.5 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                  <EyeOff size={14} />
                </button>
                <button className="px-1.5 py-1 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg text-[10px] font-black transition-colors">
                  Aa
                </button>
              </div>
              <div className="pr-20">
                <h2 className="text-xl font-bold text-slate-900 leading-tight">
                  {currentSentence.text}
                </h2>
              </div>
            </div>
          </div>

          {/* Section 3: Dynamic Workspace Area (Fixed min-height: 230px) */}
          <div className="flex-1 px-10 flex flex-col min-h-[230px] overflow-hidden">
             <RecordingArea 
               state={recordingState}
               onRecord={handleRecord}
               onStop={handleStop}
               onRetry={handleRetry}
               onNext={handleNext}
               accuracy={63}
               attemptCount={1}
               referenceText={currentSentence.text}
               words={MOCK_ASSESSMENT_WORDS}
               userSpeech="Welcome to this lesson on salary negotiation."
               feedback="Good effort!"
               aiFeedbackDetail="Tip: Pay attention to the ending sound /ʃ/ in 'English' and the stress on 'listening'."
             />
          </div>
        </section>
      </main>
    </div>
  );
}
