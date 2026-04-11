import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  FolderOpen, 
  Rocket, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  X,
  Plus
} from 'lucide-react';
import URLInput from './URLInput';
import VideoPreview from './VideoPreview';
import CEFRSelector from './CEFRSelector';
import TopicSelector from './TopicSelector';
import { YouTubeInfo, CEFRLevel } from '../../types';

interface AddVideoFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AddVideoForm({ onSuccess, onCancel }: AddVideoFormProps) {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState<YouTubeInfo | null>(null);
  const [language, setLanguage] = useState('English');
  const [cefrLevel, setCefrLevel] = useState<CEFRLevel | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [folder, setFolder] = useState('My Collection');
  const [isCreating, setIsCreating] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const isValid = url && cefrLevel && videoInfo;

  const handleCreate = async () => {
    if (!isValid) return;
    
    setIsCreating(true);
    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err) {
      setStatus('error');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      {/* Step 1: URL Input */}
      <URLInput 
        value={url} 
        onChange={setUrl} 
        onValidURL={setVideoInfo} 
        onInvalidURL={() => setVideoInfo(null)} 
      />

      {/* Step 2: Preview (Conditional) */}
      <AnimatePresence>
        {videoInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <VideoPreview info={videoInfo} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Metadata */}
      <div className="space-y-6">
        {/* Language Select */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Globe size={16} className="text-blue-600" />
            Ngôn ngữ video
          </label>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
          >
            <option>English</option>
            <option>Vietnamese</option>
            <option>Japanese</option>
            <option>Korean</option>
            <option>French</option>
          </select>
        </div>

        {/* CEFR Level */}
        <CEFRSelector selected={cefrLevel} onChange={setCefrLevel} />

        {/* Topics */}
        <TopicSelector selected={topics} onChange={setTopics} />

        {/* Folder Select */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FolderOpen size={16} className="text-blue-600" />
            Thư mục (tùy chọn)
          </label>
          <select 
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:outline-none transition-all text-sm font-medium"
          >
            <option>My Collection</option>
            <option>IELTS Prep</option>
            <option>Business English</option>
            <option>+ Create New Folder</option>
          </select>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 flex gap-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all active:scale-95"
          >
            Hủy
          </button>
        )}
        <button
          disabled={!isValid || isCreating}
          onClick={handleCreate}
          className={`flex-[2] px-6 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 ${
            !isValid || isCreating
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : status === 'success'
                ? 'bg-emerald-500 text-white shadow-emerald-100'
                : 'bg-blue-600 text-white shadow-blue-100 hover:bg-blue-700'
          }`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Đang xử lý...
            </>
          ) : status === 'success' ? (
            <>
              <CheckCircle size={20} />
              Hoàn thành!
            </>
          ) : status === 'error' ? (
            <>
              <AlertCircle size={20} />
              Thử lại
            </>
          ) : (
            <>
              <Rocket size={20} />
              TẠO BÀI HỌC
            </>
          )}
        </button>
      </div>
    </div>
  );
}
