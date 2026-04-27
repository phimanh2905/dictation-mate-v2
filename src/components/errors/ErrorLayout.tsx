import React from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ErrorLayoutProps {
  code: string;
  titleKey: string;
  subtitleKey: string;
  Icon: LucideIcon;
  primaryAction: {
    labelKey: string;
    onClick: () => void;
  };
  secondaryAction?: {
    labelKey: string;
    onClick: () => void;
  };
  ghostAction?: {
    labelKey: string;
    onClick: () => void;
  };
}

export default function ErrorLayout({
  code,
  titleKey,
  subtitleKey,
  Icon,
  primaryAction,
  secondaryAction,
  ghostAction
}: ErrorLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-white items-center justify-center text-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 p-4 rounded-full bg-slate-50"
      >
        <Icon size={80} className="text-slate-400" />
      </motion.div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-blue-600 text-xs font-black uppercase tracking-widest mb-4"
      >
        Lỗi {code}
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-slate-900 text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-4 max-w-lg"
      >
        {t(titleKey)}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-slate-500 text-md font-medium leading-relaxed mb-12 max-w-md"
      >
        {t(subtitleKey)}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        <button
          onClick={primaryAction.onClick}
          className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-3xl font-bold shadow-lg shadow-blue-100 hover:scale-105 transition-transform active:scale-95"
        >
          {t(primaryAction.labelKey)}
        </button>

        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="w-full sm:w-auto bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-3xl font-bold hover:bg-slate-50 transition-colors active:scale-95"
          >
            {t(secondaryAction.labelKey)}
          </button>
        )}

        {ghostAction && (
          <button
            onClick={ghostAction.onClick}
            className="w-full sm:w-auto text-slate-400 hover:text-slate-600 px-6 py-2 rounded-xl font-bold transition-colors text-sm"
          >
            {t(ghostAction.labelKey)}
          </button>
        )}
      </motion.div>
    </div>
  );
}
