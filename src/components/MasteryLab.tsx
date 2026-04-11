import { motion } from 'motion/react';
import { Trophy, Flame, Clock, Star, Target, TrendingUp, ChevronRight, Zap, Award } from 'lucide-react';
import { Page } from '../types';

interface MasteryLabProps {
  onNavigate: (page: Page) => void;
}

export default function MasteryLab({ onNavigate }: MasteryLabProps) {
  const stats = [
    { label: 'Streak', value: '12 Days', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Studied', value: '47 Hours', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'XP Earned', value: '2,340', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { label: 'Level', value: 'B2', icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  const achievements = [
    { title: 'Star Performer', description: 'Complete 10 videos with 95%+ score', progress: 100, earned: true, date: 'Apr 2025' },
    { title: 'Diamond Master', description: 'Master 50 videos with 100% score', progress: 70, earned: false, count: '35/50' },
    { title: 'Streak Master', description: 'Achieve a 30-day learning streak', progress: 40, earned: false, count: '12/30' },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Mastery Lab</h1>
        <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <TrendingUp size={18} />
          Share Progress
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.label}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center space-y-2"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
              <stat.icon size={24} fill="currentColor" className="opacity-80" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Learning Kanban (Simplified for dashboard) */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Learning Kanban</h2>
          <button 
            onClick={() => onNavigate('study-room')}
            className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Open Study Room <ChevronRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">To Learn</span>
              <span className="text-xs font-bold text-gray-400">5</span>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-sm font-bold">Salary Negotiation</div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-sm font-bold">Startup Pitch</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Learning</span>
              <span className="text-xs font-bold text-blue-500">2</span>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-blue-200 shadow-sm text-sm font-bold flex items-center justify-between">
                Email Writing
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Mastered</span>
              <span className="text-xs font-bold text-emerald-500">47</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm text-sm font-bold flex items-center justify-between text-gray-400">
                Meeting Vocab
                <Zap size={14} className="text-emerald-500" fill="currentColor" />
              </div>
              <div className="bg-white p-3 rounded-xl border border-emerald-200 shadow-sm text-sm font-bold flex items-center justify-between text-gray-400">
                Presentation Skills
                <Zap size={14} className="text-emerald-500" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Achievements</h2>
          <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach) => (
            <div key={ach.title} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ach.earned ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                  <Award size={24} />
                </div>
                {ach.earned && (
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase">Earned</span>
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{ach.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{ach.description}</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Progress</span>
                  <span>{ach.earned ? ach.date : ach.count}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${ach.earned ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${ach.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
