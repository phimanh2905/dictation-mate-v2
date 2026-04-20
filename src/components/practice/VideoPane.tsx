import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Video as VideoIcon } from 'lucide-react';
import { Video } from '../../types';
import { useRegisterAction } from '../../contexts/PracticeActionsContext';
import { usePracticeSettings } from '../../contexts/PracticeSettingsContext';

interface VideoPaneProps {
  video: Video;
  posterOnly?: boolean;
}

export default function VideoPane({ video, posterOnly = false }: VideoPaneProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(100); // Mock duration
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const registerAction = useRegisterAction();
  const { replayCount } = usePracticeSettings();
  
  const replayIterationRef = useRef(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const replayChunk = useCallback(() => {
    // Reset iteration counter
    replayIterationRef.current = 1;
    // Mock replay: set time back a bit and play
    setCurrentTime(Math.max(0, currentTime - 5));
    setIsPlaying(true);
    
    console.log(`Replaying (Iteration 1/${replayCount})`);
  }, [currentTime, replayCount]);

  useEffect(() => {
    registerAction('togglePlay', togglePlay);
    registerAction('replayChunk', replayChunk);
  }, [isPlaying, currentTime, registerAction, replayChunk]);

  // Mock auto-replay logic for demonstration
  useEffect(() => {
    if (isPlaying && replayIterationRef.current > 0 && replayIterationRef.current < replayCount) {
       const timer = setTimeout(() => {
         console.log(`Auto-replaying (${replayIterationRef.current + 1}/${replayCount})`);
         setCurrentTime(prev => Math.max(0, prev - 2));
         replayIterationRef.current += 1;
       }, 2000);
       return () => clearTimeout(timer);
    } else if (replayIterationRef.current >= replayCount) {
       replayIterationRef.current = 0;
       setIsPlaying(false);
    }
  }, [isPlaying, replayCount]);

  if (posterOnly) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 border-r border-slate-800">
        <div className="relative group">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            className="w-48 h-27 object-cover rounded-xl opacity-40 blur-[2px] grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
             <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
               <VideoIcon size={20} className="text-white" />
             </div>
             <p className="text-[10px] font-bold text-white/60 mt-2 uppercase tracking-tighter">Video đang ẩn</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-950 h-full relative overflow-hidden">
      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center bg-black relative group">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="max-w-full max-h-full object-contain shadow-2xl opacity-80"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Play Button */}
        {!isPlaying && (
          <button 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all z-10"
          >
            <div className="w-20 h-20 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
              <Play size={36} fill="white" className="ml-1 text-white" />
            </div>
          </button>
        )}
      </div>

      {/* Floating Glassmorphism Controls */}
      <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex flex-col gap-4">
          {/* Progress Bar */}
          <div className="group/progress relative h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div 
              className="h-full bg-blue-500 rounded-full relative"
              style={{ width: '35%' }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-0 group-hover/progress:scale-100 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all">
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
              </button>
              
              <div className="flex items-center gap-2">
                <button className="p-2 text-white/60 hover:text-white transition-colors">
                  <SkipBack size={18} />
                </button>
                <button className="p-2 text-white/60 hover:text-white transition-colors">
                  <SkipForward size={18} />
                </button>
              </div>

              <div className="text-xs font-bold text-white/80 font-mono tracking-wider">
                {formatTime(currentTime)} <span className="text-white/40 mx-1">/</span> {video.duration}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Volume2 size={18} className="text-white/60" />
                <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 w-3/4" />
                </div>
              </div>

              <select 
                className="bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-lg px-3 py-1.5 border border-white/10 focus:outline-none hover:bg-white/20 transition-all"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              >
                <option value={0.5} className="bg-slate-900">0.5x</option>
                <option value={0.75} className="bg-slate-900">0.75x</option>
                <option value={1} className="bg-slate-900">1x</option>
                <option value={1.25} className="bg-slate-900">1.25x</option>
                <option value={1.5} className="bg-slate-900">1.5x</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
