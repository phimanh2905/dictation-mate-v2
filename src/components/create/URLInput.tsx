import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link2, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isValidYouTubeURL, fetchYouTubeInfo } from '../../utils/youtube';
import { YouTubeInfo } from '../../types';

interface URLInputProps {
  value: string;
  onChange: (url: string) => void;
  onValidURL: (info: YouTubeInfo) => void;
  onInvalidURL: () => void;
}

export default function URLInput({ value, onChange, onValidURL, onInvalidURL }: URLInputProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const validate = async () => {
      if (!value) {
        setError(null);
        setIsValidated(false);
        onInvalidURL();
        return;
      }

      if (!isValidYouTubeURL(value)) {
        setError('Vui lòng nhập link YouTube hợp lệ');
        setIsValidated(false);
        onInvalidURL();
        return;
      }

      setError(null);
      setIsLoading(true);
      try {
        const info = await fetchYouTubeInfo(value);
        onValidURL(info);
        setIsValidated(true);
      } catch (err) {
        setError('Không thể tải thông tin video. Thử lại?');
        onInvalidURL();
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(validate, 500);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
        <Link2 size={16} className="text-blue-600" />
        Dán link YouTube để bắt đầu học
      </label>
      <div className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://youtube.com/watch?v=..."
          className={`w-full pl-4 pr-12 py-3.5 bg-white border-2 rounded-xl focus:outline-none transition-all text-base ${
            error 
              ? 'border-rose-200 focus:border-rose-500 bg-rose-50/30' 
              : isValidated
                ? 'border-emerald-200 focus:border-emerald-500 bg-emerald-50/30'
                : 'border-gray-200 focus:border-blue-500 group-hover:border-gray-300'
          }`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader2 size={20} className="text-blue-600 animate-spin" />}
          {error && <AlertCircle size={20} className="text-rose-500" />}
          {isValidated && !isLoading && <CheckCircle2 size={20} className="text-emerald-500" />}
        </div>
      </div>
      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-medium text-rose-500 flex items-center gap-1"
        >
          <AlertCircle size={12} />
          {error}
        </motion.p>
      )}
    </div>
  );
}
