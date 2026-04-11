import React from 'react';
import { motion } from 'motion/react';
import { Youtube, Clock, User } from 'lucide-react';
import { YouTubeInfo } from '../../types';

interface VideoPreviewProps {
  info: YouTubeInfo | null;
  isLoading?: boolean;
}

export default function VideoPreview({ info, isLoading }: VideoPreviewProps) {
  if (isLoading) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 animate-pulse">
        <div className="flex gap-4">
          <div className="w-32 aspect-video bg-gray-200 rounded-lg"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!info) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border-2 border-emerald-100 rounded-2xl p-4 shadow-sm"
    >
      <div className="flex gap-4">
        <div className="relative w-32 flex-shrink-0 aspect-video rounded-lg overflow-hidden shadow-sm">
          <img 
            src={info.thumbnail} 
            alt={info.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-blue-600">
              <Youtube size={16} fill="currentColor" />
            </div>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 leading-snug">
            {info.title}
          </h3>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
              <User size={12} />
              <span className="truncate">{info.channel}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-gray-500">
              <Clock size={12} />
              <span>{info.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
