import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  Flame, 
  TrendingUp, 
  Clock, 
  Bookmark, 
  ChevronRight, 
  Youtube, 
  Target, 
  BookOpen,
  BarChart3,
  Award
} from 'lucide-react';
import { Page, Video } from '../types';
import { TOPICS, MOCK_VIDEOS } from '../constants';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onAddVideo: () => void;
}

export default function HomePage({ onNavigate, onAddVideo }: HomePageProps) {
  const { t } = useTranslation();
  const resumeVideo = MOCK_VIDEOS[0];
  const dailyMix = MOCK_VIDEOS.slice(1);

  const quickStats = [
    { icon: Flame, label: t('mastery.streak'), value: '12 days', color: 'orange' },
    { icon: Target, label: 'XP Today', value: '450 XP', color: 'blue' },
    { icon: BookOpen, label: t('nav.vocab'), value: '128 learned', color: 'emerald' },
    { icon: Clock, label: 'Time', value: '45 mins', color: 'violet' },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* 1. Hero Section (compact, personalized) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-violet-700 text-white p-8 shadow-xl shadow-blue-100">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-2"
          >
            {t('home.welcome', { name: 'Phạm Anh' })}
          </motion.h1>
          <p className="text-blue-100 mb-6 font-medium">
            {t('home.streakMessage', { count: 12 })} Today's goal is almost reached.
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => onNavigate('practice')}
              className="px-5 py-2.5 bg-white text-blue-600 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-all shadow-lg active:scale-95"
            >
              <Play size={18} fill="currentColor" />
              {t('home.continue')}
            </button>
            <button 
              onClick={() => onNavigate('statistics')}
              className="px-5 py-2.5 bg-blue-500/30 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-sm hover:bg-blue-500/40 transition-all active:scale-95"
            >
              <BarChart3 size={18} />
              {t('home.viewProgress')}
            </button>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/2 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* 2. Video Creation CTA (NEW - prominent) */}
      <section className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
              <Youtube size={28} />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-gray-900 text-lg">Create Your Own Lesson</h3>
              <p className="text-sm text-gray-600">Paste any YouTube link to practice dictation and shadowing</p>
            </div>
          </div>
          <button 
            onClick={onAddVideo}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2"
          >
            <PlusCircle size={20} />
            Add Video
          </button>
        </div>
      </section>

      {/* 3. Quick Stats Row (NEW) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
              stat.color === 'orange' ? 'bg-orange-100 text-orange-600' :
              stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
              stat.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
              'bg-violet-100 text-violet-600'
            }`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Continue Learning (restyled) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="text-blue-600" />
            Continue Learning
          </h2>
          <button 
            onClick={() => onNavigate('study-room')}
            className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline"
          >
            Study Room <ChevronRight size={16} />
          </button>
        </div>
        <div 
          onClick={() => onNavigate('practice')}
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col md:flex-row"
        >
          <div className="md:w-1/4 aspect-video relative overflow-hidden">
            <img 
              src={resumeVideo.thumbnail} 
              alt={resumeVideo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                <Play size={20} fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
              {resumeVideo.duration}
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                {resumeVideo.level}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{resumeVideo.topic}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
              {resumeVideo.title}
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${resumeVideo.progress}%` }}
                  className="h-full bg-blue-600 rounded-full"
                ></motion.div>
              </div>
              <span className="text-xs font-bold text-gray-600">{resumeVideo.progress}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. My Topics (horizontal scroll) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            My Topics
          </h2>
          <button 
            onClick={() => onNavigate('explore')}
            className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline"
          >
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {TOPICS.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-40 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md hover:border-blue-200 transition-all text-center group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{topic.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{topic.name}</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{topic.videoCount} videos</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Daily Mix (4-col grid, with view counts) */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="text-blue-600" />
            Daily Mix
          </h2>
          <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
            Refresh <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyMix.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => onNavigate('practice')} />
          ))}
        </div>
      </section>

      {/* 7. Recent Achievements (optional) */}
      <section className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Achievements</h2>
          <button 
            onClick={() => onNavigate('mastery')}
            className="text-blue-600 font-bold text-sm hover:underline"
          >
            View All
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          {[
            { title: 'Star Performer', date: '2 hours ago', icon: Award, color: 'amber' },
            { title: 'Fast Learner', date: 'Yesterday', icon: Zap, color: 'blue' },
          ].map((ach) => (
            <div key={ach.title} className="flex-1 flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                ach.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <ach.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{ach.title}</h4>
                <p className="text-xs text-gray-500">{ach.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlusCircle({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

function Zap({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

interface VideoCardProps {
  key?: string | number;
  video: Video;
  onClick: () => void;
}

function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 shadow-lg">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
          {video.duration}
        </div>
        {video.isNew && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
            New
          </div>
        )}
        {/* View Count Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold rounded flex items-center gap-1">
          <TrendingUp size={12} />
          {video.views || '0'}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {video.level}
          </span>
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{video.topic}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={14} />
            {video.duration}
          </div>
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
