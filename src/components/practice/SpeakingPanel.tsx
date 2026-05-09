import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, Volume2 
} from 'lucide-react';
import RecordingArea from './RecordingArea';

type SpeakingState = 'ready' | 'recording' | 'analyzing' | 'result';

export default function SpeakingPanel() {
  const [state, setState] = useState<SpeakingState>('ready');
  const [activeQuestion, setActiveQuestion] = useState(1);
  const totalQuestions = 901;
  const questions = Array.from({ length: 10 }, (_, i) => i + 1); // Mock first 10 questions

  const words = [
    { text: 'the', score: 95, status: 'exact' as const, ipa: 'ðə' },
    { text: 'key', score: 100, status: 'exact' as const, ipa: 'kiː' },
    { text: 'is', score: 90, status: 'exact' as const, ipa: 'ɪz' },
    { text: 'to', score: 88, status: 'exact' as const, ipa: 'tə' },
    { text: 'research', score: 75, status: 'close' as const, ipa: 'rɪˈsɜːrtʃ' },
    { text: 'market', score: 92, status: 'exact' as const, ipa: 'ˈmɑːrkɪt' },
    { text: 'rates', score: 45, status: 'wrong' as const, ipa: 'reɪts' },
    { text: 'beforehand', score: 80, status: 'exact' as const, ipa: 'bɪˈfɔːrhænd' },
  ];

  const handleRecord = () => setState('recording');
  const handleStop = () => {
    setState('analyzing');
    setTimeout(() => setState('result'), 1500);
  };
  const handleRetry = () => setState('ready');
  const handleNextQuestion = () => {
    setActiveQuestion(prev => Math.min(totalQuestions, prev + 1));
    setState('ready');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-4 overflow-y-auto no-scrollbar bg-gray-50 dark:bg-gray-950"
    >
      <div className="max-w-3xl mx-auto w-full space-y-4 pb-20 lg:pb-4">
        {/* 1. Header Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Phát âm</h2>
            <span className="text-gray-500 text-xs">(Câu hỏi {activeQuestion}/{totalQuestions})</span>
          </div>
        </div>

        {/* 2. Question Navigation Bar */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <ChevronLeft size={18} />
          </button>
          
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
            {questions.map((q) => (
              <button
                key={q}
                onClick={() => setActiveQuestion(q)}
                className={`shrink-0 px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                  activeQuestion === q
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100 dark:shadow-none'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                Câu: {q}
              </button>
            ))}
            <div className="shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-xl opacity-50" />
          </div>

          <button className="p-1.5 bg-gray-200 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 3. Target Sentence Area */}
        <div className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-4 text-center">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target Sentence</h3>
            <p className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed font-mono">
              "the key is to research market rates beforehand"
            </p>
          </div>
          
          <div className="flex justify-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
              <Volume2 size={16} />
              Nghe audio chunk
            </button>
          </div>
        </div>

        {/* 4. Recorder & Results Section (Redesigned) */}
        <RecordingArea 
          state={state}
          onRecord={handleRecord}
          onStop={handleStop}
          onRetry={handleRetry}
          onNext={handleNextQuestion}
          accuracy={85}
          attemptCount={1}
          referenceText="the key is to research market rates beforehand"
          words={words}
          userSpeech="the key is to research market rats beforehand"
          feedback=" rates nghe giống rats. Luyện âm /eɪ/ trong 'rates'."
          aiFeedbackDetail="Bạn đã phát âm chính xác hầu hết các từ. Tuy nhiên, nguyên âm trong từ 'rates' bị phát thiếu âm cuối i, khiến nó nghe giống 'rats'. Hãy mở rộng khuôn miệng theo chiều ngang khi phát âm âm /eɪ/."
          recordedAudioUrl="https://www.soundjay.com/buttons/beep-01a.mp3"
        />

      </div>
    </motion.div>
  );
}
