import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Play, RotateCcw, Sparkles, ChevronRight, 
  Volume2, CheckCircle2, Square, Info, EyeOff, 
  ChevronDown, ChevronUp, Check, AlertTriangle, X 
} from 'lucide-react';

export type RecordingState = 'ready' | 'recording' | 'analyzing' | 'result';

interface Word {
  text: string;
  status: 'exact' | 'close' | 'wrong';
  ipa?: string;
}

interface RecordingAreaProps {
  state: RecordingState;
  onRecord: () => void;
  onStop: () => void;
  onRetry: () => void;
  onNext: () => void;
  accuracy: number;
  attemptCount: number;
  referenceText: string;
  words: Word[];
  userSpeech: string;
  feedback: string;
  aiFeedbackDetail: string;
  recordedAudioUrl?: string;
  className?: string;
}

export default function RecordingArea({
  state,
  onRecord,
  onStop,
  onRetry,
  onNext,
  accuracy,
  attemptCount,
  referenceText,
  words,
  userSpeech,
  feedback,
  aiFeedbackDetail,
  recordedAudioUrl,
  className = ""
}: RecordingAreaProps) {
  const [showIPA, setShowIPA] = useState(false);
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  const getStatusIcon = (status: Word['status']) => {
    switch (status) {
      case 'exact': return <Check size={10} className="text-emerald-600 dark:text-emerald-400" />;
      case 'close': return <AlertTriangle size={10} className="text-amber-600 dark:text-amber-400" />;
      case 'wrong': return <X size={10} className="text-rose-600 dark:text-rose-400" />;
    }
  };

  const getStatusClasses = (status: Word['status']) => {
    switch (status) {
      case 'exact': return 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20';
      case 'close': return 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20';
      case 'wrong': return 'bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20';
    }
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 90) return '🔥';
    if (score >= 70) return '🎯';
    if (score >= 50) return '💪';
    return '🌱';
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col ${className}`}>
      <div className="flex-1 p-4 overflow-y-auto no-scrollbar min-h-[180px] lg:min-h-[auto]">
        <AnimatePresence mode="wait">
          {state === 'ready' && (
            <motion.div 
              key="ready"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center gap-3 py-4"
            >
              <button
                onClick={onRecord}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 hover:scale-105 transition-all active:scale-95 group"
              >
                <Mic size={24} />
              </button>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Nhấn để bắt đầu nói</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">Click to start recording</p>
              </div>
            </motion.div>
          )}

          {state === 'recording' && (
            <motion.div 
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center gap-4 py-4 w-full"
            >
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-sm font-bold animate-pulse">
                <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                Recording...
              </div>
              
              <div className="w-full max-w-sm h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center gap-1.5 px-4">
                {[...Array(20)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [8, Math.random() * 20 + 8, 8] }}
                    transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                    className="w-1 bg-blue-400 dark:bg-blue-500 rounded-full" 
                  />
                ))}
              </div>

              <button
                onClick={onStop}
                className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-none hover:bg-rose-600 transition-all active:scale-95"
              >
                <Square size={16} fill="currentColor" />
              </button>
            </motion.div>
          )}

          {state === 'analyzing' && (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center gap-3 py-8"
            >
              <div className="w-10 h-10 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin" />
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Đang phân tích giọng nói...</p>
            </motion.div>
          )}

          {state === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full space-y-3"
            >
              {/* 1. Score Row */}
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getScoreEmoji(accuracy)}</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Accuracy</span>
                    <span className="text-xl font-black text-gray-900 dark:text-white">{accuracy}%</span>
                  </div>
                  <div className="h-8 w-px bg-gray-100 dark:bg-gray-800 mx-1" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-none">Attempt</span>
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">#{attemptCount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {recordedAudioUrl ? (
                     <audio 
                       src={recordedAudioUrl} 
                       controls 
                       className="h-7 w-28 lg:w-32 dark:invert focus:outline-none rounded-lg"
                     />
                   ) : (
                     <button className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-100 transition-colors">
                      <Play size={16} fill="currentColor" />
                    </button>
                   )}
                  <button 
                    onClick={() => setShowIPA(!showIPA)}
                    className={`px-2 py-1 rounded text-[10px] font-bold transition-colors ${
                      showIPA ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    IPA
                  </button>
                </div>
              </div>

              {/* 2. Reference Text & User Quote */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {words.map((word, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                       <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-sm font-bold border transition-all ${getStatusClasses(word.status)}`}>
                        {word.text}
                        {getStatusIcon(word.status)}
                      </span>
                      {showIPA && word.ipa && (
                        <span className="text-[10px] font-medium text-gray-400 mt-0.5 font-mono">
                          {word.ipa}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs italic text-gray-500 dark:text-gray-400 font-medium pl-2 border-l-2 border-gray-100 dark:border-gray-800">
                  "{userSpeech}"
                </p>
              </div>

              {/* 3. Feedback Row */}
              <div className="flex items-center gap-2 py-1">
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">Feedback:</span>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">{feedback}</span>
              </div>

              {/* 4. AI Feedback Expandable */}
              <div>
                <button 
                  onClick={() => setShowAIFeedback(!showAIFeedback)}
                  className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:opacity-80 transition-opacity"
                >
                  <Sparkles size={12} />
                  {showAIFeedback ? "Ẩn phân tích AI" : "Xem phân tích AI chi tiết"}
                  {showAIFeedback ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                </button>
                <AnimatePresence>
                  {showAIFeedback && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 leading-relaxed bg-blue-50/50 dark:bg-blue-900/10 p-2.5 rounded-xl border border-blue-100/50 dark:border-blue-900/30">
                        {aiFeedbackDetail}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. Sticky Actions Footer */}
      <div className="p-3 bg-gray-50/80 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 sticky bottom-0">
        <button
          onClick={onRetry}
          className="flex-1 py-1.5 px-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
        >
          <RotateCcw size={14} />
          Thử lại
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-1.5 px-4 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-md shadow-blue-100 dark:shadow-none"
        >
          Tiếp tục
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
