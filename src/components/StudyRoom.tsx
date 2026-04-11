import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Music, 
  Volume2, 
  Layout, 
  ChevronRight,
  Smile,
  Zap,
  Coffee,
  Brain,
  Target,
  Clock
} from 'lucide-react';
import { Page, Mood } from '../types';
import { MOCK_VIDEOS } from '../constants';

interface StudyRoomProps {
  onNavigate: (page: Page) => void;
}

export default function StudyRoom({ onNavigate }: StudyRoomProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mood, setMood] = useState<Mood>('Focused');
  const [isMoodPopupOpen, setIsMoodPopupOpen] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const moods: { type: Mood; icon: any; color: string; description: string }[] = [
    { type: 'Focused', icon: Brain, color: 'text-blue-500', description: 'Ready for deep learning' },
    { type: 'Confident', icon: Zap, color: 'text-yellow-500', description: 'Feeling like an expert' },
    { type: 'Curious', icon: Target, color: 'text-purple-500', description: 'Want to explore new things' },
    { type: 'Tired', icon: Coffee, color: 'text-orange-500', description: 'Need something light' },
    { type: 'Stressed', icon: Smile, color: 'text-emerald-500', description: 'Relaxing practice' },
    { type: 'Busy', icon: Clock, color: 'text-rose-500', description: 'Quick 5-min sessions' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Focus Timer */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-sm mb-6">
              <Timer size={20} />
              Focus Session
            </div>
            
            <div className="text-8xl md:text-9xl font-mono font-light tracking-tighter text-gray-900 mb-8 tabular-nums">
              {formatTime(timeLeft)}
            </div>

            <div className="flex items-center justify-center gap-4 mb-12">
              <button 
                onClick={toggleTimer}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isActive 
                    ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-all"
              >
                <RotateCcw size={20} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                <Music size={20} className="text-gray-400" />
                <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-2/3 bg-blue-500 rounded-full"></div>
                </div>
                <Volume2 size={20} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 font-medium italic">Playing: Lo-fi Study Beats</p>
            </div>
          </div>

          {/* Background decoration */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${isActive ? 'opacity-10' : 'opacity-0'}`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 to-violet-500 animate-pulse"></div>
          </div>
        </section>

        {/* Quick Start Recommendations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recommended for your mood</h2>
            <div 
              onClick={() => setIsMoodPopupOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
            >
              <span className="text-sm font-bold text-gray-600">Mood: {mood}</span>
              <Smile size={18} className="text-blue-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_VIDEOS.slice(0, 2).map((video) => (
              <div 
                key={video.id}
                onClick={() => onNavigate('practice')}
                className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center gap-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="w-24 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600">{video.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">{video.level}</span>
                    <span className="text-[10px] text-gray-500">• {video.duration}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-blue-600" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Kanban Board */}
      <div className="space-y-8">
        <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Layout size={20} className="text-blue-600" />
            <h2 className="text-xl font-bold">Kanban Board</h2>
          </div>

          <div className="space-y-6 flex-1">
            {/* To Learn */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">To Learn</h3>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full">5</span>
              </div>
              <div className="space-y-3">
                <KanbanCard title="Salary Negotiation" level="B2" progress={0} />
                <KanbanCard title="Startup Pitch" level="B2" progress={0} />
              </div>
            </div>

            {/* Learning */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-blue-500 uppercase tracking-wider">Learning</h3>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full">2</span>
              </div>
              <div className="space-y-3">
                <KanbanCard title="Email Writing" level="B1" progress={30} active />
              </div>
            </div>

            {/* Mastered */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Mastered</h3>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-[10px] font-bold rounded-full">47</span>
              </div>
              <div className="space-y-3 opacity-60">
                <KanbanCard title="Meeting Vocab" level="B1" progress={100} />
              </div>
            </div>
          </div>

          <button className="mt-8 w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-all">
            + Add to Board
          </button>
        </section>
      </div>

      {/* Mood Popup */}
      <AnimatePresence>
        {isMoodPopupOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoodPopupOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">How are you feeling?</h2>
              <p className="text-gray-500 mb-8">We'll suggest content based on your mood.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {moods.map((m) => (
                  <button
                    key={m.type}
                    onClick={() => {
                      setMood(m.type);
                      setIsMoodPopupOpen(false);
                    }}
                    className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-2 ${
                      mood === m.type 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                  >
                    <m.icon className={m.color} size={24} />
                    <div>
                      <div className="font-bold text-gray-900">{m.type}</div>
                      <div className="text-[10px] text-gray-500">{m.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KanbanCard({ title, level, progress, active = false }: { title: string, level: string, progress: number, active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border bg-white shadow-sm cursor-grab active:cursor-grabbing transition-all ${active ? 'border-blue-200 ring-2 ring-blue-500/10' : 'border-gray-100'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase">{level}</span>
        {progress === 100 && <Zap size={14} className="text-emerald-500" fill="currentColor" />}
      </div>
      <h4 className="font-bold text-gray-900 text-sm mb-3">{title}</h4>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
