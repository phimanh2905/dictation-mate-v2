import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, Volume2, Video, VideoOff, Check } from 'lucide-react';
import { usePracticeSettings } from '../../contexts/PracticeSettingsContext';
import { ReplayCount, KeyboardShortcuts } from '../../types';

interface PracticeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PracticeSettingsModal({ isOpen, onClose }: PracticeSettingsModalProps) {
  const { 
    replayCount, setReplayCount, 
    hideVideo, setHideVideo, 
    shortcuts, updateShortcut 
  } = usePracticeSettings();
  
  const [listeningFor, setListeningFor] = useState<keyof KeyboardShortcuts | null>(null);

  useEffect(() => {
    if (!listeningFor) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === 'Escape') {
        setListeningFor(null);
        return;
      }

      // Check if it's a valid shortcut (usually Ctrl/Cmd/Shift + Key)
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
        let keyStr = '';
        if (e.ctrlKey) keyStr += 'Control+';
        if (e.metaKey) keyStr += 'Meta+';
        if (e.shiftKey) keyStr += 'Shift+';
        if (e.altKey) keyStr += 'Alt+';
        
        // Add the specific key
        if (e.key !== 'Control' && e.key !== 'Meta' && e.key !== 'Shift' && e.key !== 'Alt') {
           keyStr += e.key;
        }
        
        if (keyStr.endsWith('+')) return; // Just a modifier pressed

        updateShortcut(listeningFor, keyStr);
        setListeningFor(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [listeningFor, updateShortcut]);

  const replayOptions: ReplayCount[] = [1, 3, 5];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl text-indigo-600 dark:text-indigo-400">
                  <Keyboard size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Cài đặt luyện tập</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto no-scrollbar">
              {/* Replay Count */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold">
                  <Volume2 size={18} />
                  <h3>Số lần phát lại tự động</h3>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {replayOptions.map((count) => (
                    <button
                      key={count}
                      onClick={() => setReplayCount(count)}
                      className={`py-3 rounded-2xl font-bold transition-all border-2 ${
                        replayCount === count
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                          : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-200'
                      }`}
                    >
                      {count} lần
                    </button>
                  ))}
                </div>
              </section>

              {/* Video Visibility */}
              <section className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${hideVideo ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                    {hideVideo ? <VideoOff size={18} /> : <Video size={18} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white">Ẩn video khi luyện tập</h3>
                    <p className="text-xs text-slate-500">Tập trung hoàn toàn vào âm thanh</p>
                  </div>
                </div>
                <button
                  onClick={() => setHideVideo(!hideVideo)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${hideVideo ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <motion.div 
                    animate={{ x: hideVideo ? 26 : 2 }}
                    className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
                  />
                </button>
              </section>

              {/* Keyboard Shortcuts */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold">
                  <Keyboard size={18} />
                  <h3>Phím tắt bàn phím</h3>
                </div>
                <div className="space-y-2">
                   {[
                     { id: 'togglePlay', label: 'Phát/Pause video' },
                     { id: 'replayChunk', label: 'Phát lại (Replay)' },
                     { id: 'checkAnswer', label: 'Kiểm tra (Submit)' }
                   ].map((item) => (
                     <div 
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl"
                     >
                       <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
                       <button
                        onClick={() => setListeningFor(item.id as keyof KeyboardShortcuts)}
                        className={`min-w-[100px] px-3 py-1.5 rounded-lg border-2 text-xs font-mono font-bold transition-all ${
                          listeningFor === item.id
                            ? 'bg-amber-50 border-amber-400 text-amber-600 animate-pulse'
                            : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                        }`}
                       >
                         {listeningFor === item.id ? 'Đang chờ phím...' : shortcuts[item.id as keyof KeyboardShortcuts]}
                       </button>
                     </div>
                   ))}
                </div>
                {listeningFor && (
                  <p className="text-center text-[10px] text-amber-600 font-bold animate-bounce mt-2 italic">
                    Nhấn tổ hợp phím (ví dụ: Ctrl + Space) để thay đổi. Esc để hủy.
                  </p>
                )}
              </section>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800">
               <button 
                onClick={onClose}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center gap-2"
               >
                 <Check size={20} />
                 Hoàn tất
               </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
