import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  Play, 
  RotateCcw, 
  Mic, 
  Type, 
  PenTool, 
  MessageSquare, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  Bookmark,
  Share2,
  Volume2,
  FastForward
} from 'lucide-react';
import { Page } from '../types';
import { MOCK_VIDEOS } from '../constants';

interface PracticePageProps {
  onNavigate: (page: Page) => void;
}

type PracticeMode = 'dictation' | 'shadowing' | 'speaking' | 'writing';

export default function PracticePage({ onNavigate }: PracticePageProps) {
  const [mode, setMode] = useState<PracticeMode>('dictation');
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const video = MOCK_VIDEOS[0];

  const handleCheck = () => {
    const correct = answer.toLowerCase().trim() === 'market rates';
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const nextChunk = () => {
    setAnswer('');
    setShowFeedback(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Dashboard
        </button>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <Bookmark size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="bg-black rounded-3xl overflow-hidden aspect-video relative group shadow-2xl">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform shadow-2xl">
            <Play size={40} fill="currentColor" className="ml-2" />
          </button>
        </div>
        
        {/* Player Controls */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col gap-4">
            <div className="h-1.5 bg-white/20 rounded-full overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-blue-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between text-white text-sm font-medium">
              <div className="flex items-center gap-4">
                <Play size={20} fill="currentColor" />
                <RotateCcw size={20} />
                <span>3:24 / 8:45</span>
              </div>
              <div className="flex items-center gap-4">
                <Volume2 size={20} />
                <span className="px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[10px] font-bold">CC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm flex gap-1">
        {[
          { id: 'dictation', label: 'Dictation', icon: Type },
          { id: 'shadowing', label: 'Shadowing', icon: Mic },
          { id: 'speaking', label: 'Speaking', icon: MessageSquare },
          { id: 'writing', label: 'Writing', icon: PenTool },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as PracticeMode)}
            className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              mode === m.id 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <m.icon size={18} />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Practice Area */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm min-h-[400px] flex flex-col">
        <AnimatePresence mode="wait">
          {mode === 'dictation' && (
            <motion.div 
              key="dictation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Chunk 3/12</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: '25%' }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-400">25%</span>
                  </div>
                </div>
                <button className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-colors">
                  <Volume2 size={24} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12">
                <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed max-w-2xl">
                  "...the key is to research <span className="px-4 py-1 bg-gray-100 border-b-4 border-blue-500 rounded-lg text-transparent">_______ _______</span> beforehand..."
                </p>

                <div className="w-full max-w-md space-y-4">
                  <input 
                    type="text"
                    placeholder="Type what you hear..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-xl font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all text-center"
                  />
                  <div className="flex gap-3">
                    <button 
                      onClick={handleCheck}
                      className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                    >
                      Check Answer
                    </button>
                    <button className="px-6 py-4 bg-white border-2 border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                      <Lightbulb size={20} className="text-amber-500" />
                      Hint
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {mode === 'shadowing' && (
            <motion.div 
              key="shadowing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
                <Mic size={48} />
              </div>
              <h3 className="text-2xl font-bold">Shadowing Mode</h3>
              <p className="text-gray-500 max-w-md">Listen to the speaker and repeat immediately. We'll analyze your rhythm and pronunciation.</p>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
                <Mic size={20} />
                Start Recording
              </button>
            </motion.div>
          )}

          {/* Other modes would follow similar patterns */}
          {mode !== 'dictation' && mode !== 'shadowing' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
              <div className="text-4xl mb-4">🚧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{mode.charAt(0).toUpperCase() + mode.slice(1)} Mode Coming Soon</h3>
              <p className="text-gray-500">We're working hard to bring you this feature.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback Panel */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-6 rounded-3xl border-2 flex items-center gap-6 shadow-xl ${
              isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {isCorrect ? <CheckCircle2 size={32} /> : <XCircle size={32} />}
            </div>
            <div className="flex-1">
              <h4 className={`text-xl font-bold mb-1 ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                {isCorrect ? 'Excellent! Correct Answer' : 'Almost! Not quite right'}
              </h4>
              <p className={`text-sm font-medium ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? 'You nailed the term "market rates". Keep going!' : 'The correct answer was "market rates". Listen again.'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {!isCorrect && (
                <button className="px-6 py-3 bg-white border border-rose-200 text-rose-600 rounded-xl font-bold hover:bg-rose-100 transition-all">
                  Try Again
                </button>
              )}
              <button 
                onClick={nextChunk}
                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg transition-all ${
                  isCorrect ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-900 text-white hover:bg-black'
                }`}
              >
                {isCorrect ? 'Continue' : 'Skip Chunk'}
                <FastForward size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
