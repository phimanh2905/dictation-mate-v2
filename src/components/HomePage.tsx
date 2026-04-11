import { motion } from 'motion/react';
import { Play, Flame, TrendingUp, Clock, Bookmark, ChevronRight } from 'lucide-react';
import { Page, Video } from '../types';
import { TOPICS, MOCK_VIDEOS } from '../constants';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const resumeVideo = MOCK_VIDEOS[0];
  const dailyMix = MOCK_VIDEOS.slice(1);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-violet-700 text-white p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-5xl font-bold leading-tight mb-6"
          >
            Master English Through Active Practice
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg mb-8"
          >
            Improve your listening, speaking, and writing with real-world videos and AI-powered feedback.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('practice')}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Play size={20} fill="currentColor" />
              Continue Learning
            </button>
            <button 
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 bg-blue-500/20 backdrop-blur-md border border-white/30 text-white rounded-xl font-bold hover:bg-blue-500/30 transition-colors"
            >
              Explore Topics
            </button>
          </div>
        </div>
        
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-2xl"></div>
      </section>

      {/* Topics Rail */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            My Topics
          </h2>
          <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:underline">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {TOPICS.map((topic) => (
            <motion.div
              key={topic.id}
              whileHover={{ y: -4 }}
              className="flex-shrink-0 w-40 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-all text-center"
            >
              <div className="text-4xl mb-3">{topic.icon}</div>
              <h3 className="font-bold text-gray-900 mb-1">{topic.name}</h3>
              <p className="text-xs text-gray-500">{topic.videoCount} videos</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Resume Learning */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Clock className="text-blue-600" />
          Continue Learning
        </h2>
        <div 
          onClick={() => onNavigate('practice')}
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm cursor-pointer hover:shadow-md transition-all flex flex-col md:flex-row"
        >
          <div className="md:w-1/3 aspect-video relative overflow-hidden">
            <img 
              src={resumeVideo.thumbnail} 
              alt={resumeVideo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-blue-600 shadow-xl">
                <Play size={24} fill="currentColor" />
              </div>
            </div>
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs font-bold rounded">
              {resumeVideo.duration}
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {resumeVideo.level}
                </span>
                <span className="text-xs text-gray-500 font-medium">{resumeVideo.topic}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {resumeVideo.title}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Last practiced 2 hours ago • Keep it up!</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-600">
                <span>Progress</span>
                <span>{resumeVideo.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${resumeVideo.progress}%` }}
                  className="h-full bg-blue-600 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Mix */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-blue-600" />
            Today's Mix
          </h2>
          <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:underline">
            Refresh <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dailyMix.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => onNavigate('practice')} />
          ))}
        </div>
      </section>
    </div>
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
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {video.level}
          </span>
          <span className="text-[10px] text-gray-500 font-medium">{video.topic}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <TrendingUp size={14} />
            {video.views || '0'} views
          </div>
          <button className="text-gray-400 hover:text-blue-600 transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
