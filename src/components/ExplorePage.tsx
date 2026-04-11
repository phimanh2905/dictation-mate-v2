import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Play, Bookmark, TrendingUp, ChevronDown } from 'lucide-react';
import { Page, Video, CEFRLevel } from '../types';
import { MOCK_VIDEOS, TOPICS } from '../constants';

interface ExplorePageProps {
  onNavigate: (page: Page) => void;
}

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'All'>('All');
  const [selectedTopic, setSelectedTopic] = useState<string | 'All'>('All');

  const levels: (CEFRLevel | 'All')[] = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  const filteredVideos = MOCK_VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'All' || video.level === selectedLevel;
    const matchesTopic = selectedTopic === 'All' || video.topic === selectedTopic;
    return matchesSearch && matchesLevel && matchesTopic;
  });

  return (
    <div className="space-y-8">
      {/* Search and Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Explore Content</h1>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search topics, videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-6">
        {/* Level Filter */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Proficiency Level</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedLevel === level 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                {level === 'All' ? 'All Levels' : level}
              </button>
            ))}
          </div>
        </div>

        {/* Topic Filter */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Topics</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTopic('All')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                selectedTopic === 'All' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
              }`}
            >
              All Topics
            </button>
            {TOPICS.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.name)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  selectedTopic === topic.name 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <span>{topic.icon}</span>
                {topic.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">
            Showing <span className="text-gray-900 font-bold">{filteredVideos.length}</span> videos
          </p>
          <button className="flex items-center gap-2 text-sm font-bold text-gray-600 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            Sort: Recommended
            <ChevronDown size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <VideoCard key={video.id} video={video} onClick={() => onNavigate('practice')} />
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedLevel('All');
                setSelectedTopic('All');
              }}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
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
        
        {video.progress > 0 && (
          <div className="mb-3">
            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600" style={{ width: `${video.progress}%` }}></div>
            </div>
            <p className="text-[10px] text-gray-500 mt-1 font-medium">{video.progress}% completed</p>
          </div>
        )}

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
