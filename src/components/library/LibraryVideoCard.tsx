import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, MoreVertical, Clock, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import { UserVideo, Folder } from '../../types';
import VideoActionsMenu from './VideoActionsMenu';

interface LibraryVideoCardProps {
  key?: React.Key;
  video: UserVideo;
  folders: Folder[];
  viewMode: 'grid' | 'list';
  onClick: () => void;
  onAction: (action: string, data?: any) => void;
}

export default function LibraryVideoCard({ 
  video, 
  folders, 
  viewMode, 
  onClick, 
  onAction 
}: LibraryVideoCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const renderProgress = () => {
    if (video.status === 'not-started') {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          Chưa bắt đầu
        </div>
      );
    }

    if (video.status === 'completed') {
      return (
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
          <CheckCircle2 size={12} />
          Hoàn thành! 🎉
        </div>
      );
    }

    return (
      <div className="space-y-1.5">
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-blue-600">Đã học {video.chunksCompleted}/{video.chunksTotal} chunks</span>
          <span className="text-gray-500">{video.progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${video.progress}%` }}
            className="h-full bg-blue-600 rounded-full"
          />
        </div>
      </div>
    );
  };

  if (viewMode === 'list') {
    return (
      <div className="group bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-4 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer relative">
        <div onClick={onClick} className="flex-shrink-0 w-32 aspect-video relative rounded-lg overflow-hidden">
          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={20} className="text-white fill-white" />
          </div>
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[9px] font-bold rounded">
            {video.duration}
          </div>
        </div>

        <div onClick={onClick} className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold rounded uppercase">
              {video.level}
            </span>
            <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
            <span className="flex items-center gap-1"><Youtube size={12} /> {video.channel}</span>
            {video.lastPracticed && <span className="flex items-center gap-1"><Clock size={12} /> {new Date(video.lastPracticed).toLocaleDateString()}</span>}
          </div>
        </div>

        <div className="w-48 px-4 border-l border-gray-100">
          {renderProgress()}
        </div>

        <div className="relative">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            className={`p-1.5 rounded-lg transition-all ${isMenuOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
          >
            <MoreVertical size={18} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 z-30">
                <div className="fixed inset-0" onClick={() => setIsMenuOpen(false)} />
                <div className="relative">
                  <VideoActionsMenu 
                    video={video} 
                    folders={folders} 
                    onAction={(action, data) => {
                      onAction(action, data);
                      setIsMenuOpen(false);
                    }}
                    onClose={() => setIsMenuOpen(false)}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer relative flex flex-col"
    >
      <div onClick={onClick} className="aspect-video relative overflow-hidden">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-blue-600 shadow-lg">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] font-bold rounded">
          {video.duration}
        </div>
        <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold rounded shadow-sm">
          {video.level}
        </div>
        {video.isNew && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white text-[10px] font-bold rounded uppercase tracking-wider">
            New
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div onClick={onClick} className="mb-3">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
            {video.title}
          </h3>
          <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
            <Youtube size={12} /> {video.channel}
          </p>
        </div>

        <div className="mt-auto space-y-3">
          <div onClick={onClick}>
            {renderProgress()}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
              <Clock size={12} />
              {video.lastPracticed ? `Học ${new Date(video.lastPracticed).toLocaleDateString()}` : 'Chưa học'}
            </span>
            
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className={`p-1.5 rounded-lg transition-all ${isMenuOpen ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:bg-gray-100'}`}
              >
                <MoreVertical size={16} />
              </button>
              
              <AnimatePresence>
                {isMenuOpen && (
                  <div className="absolute right-0 bottom-full mb-2 z-30">
                    <div className="fixed inset-0" onClick={() => setIsMenuOpen(false)} />
                    <div className="relative">
                      <VideoActionsMenu 
                        video={video} 
                        folders={folders} 
                        onAction={(action, data) => {
                          onAction(action, data);
                          setIsMenuOpen(false);
                        }}
                        onClose={() => setIsMenuOpen(false)}
                      />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
