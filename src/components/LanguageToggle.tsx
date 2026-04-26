import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm font-bold hover:border-blue-300 transition-all shadow-sm group active:scale-95"
      >
        <span className="text-lg leading-none group-hover:scale-110 transition-transform">{currentLang.flag}</span>
        <span className="uppercase text-[10px] tracking-wider text-gray-600 font-black">{currentLang.code}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-black text-slate-800 tracking-tight uppercase text-sm">Select Language</h3>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-slate-600 transition-all shadow-sm shadow-transparent hover:shadow-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-3 space-y-1">
                {languages.map((lang) => {
                  const isSelected = i18n.language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-600' 
                          : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl leading-none group-hover:scale-110 transition-transform">{lang.flag}</span>
                        <div className="text-left">
                          <p className={`text-sm font-bold tracking-tight ${isSelected ? 'text-blue-700' : 'text-slate-800'}`}>
                            {lang.name}
                          </p>
                          <p className="text-[10px] uppercase font-black tracking-widest opacity-50">
                            {lang.code}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
                          <Check size={16} strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="p-6 bg-slate-50/50 border-t border-slate-50">
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">
                  More languages coming soon
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
