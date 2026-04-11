import React from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, BookOpen, Lightbulb, ChevronDown, ListChecks, Sparkles } from 'lucide-react';

export default function SummaryPanel() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col h-full overflow-y-auto no-scrollbar p-6 space-y-6"
    >
      {/* Overview Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 bg-amber-50/50 border-b border-amber-100/50 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-100">
            <Sparkles size={20} />
          </div>
          <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider">AI Summary</h3>
        </div>
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed text-sm font-medium">
            This video covers essential strategies for salary negotiation, emphasizing the importance of market research and timing. The speaker explains how to leverage your unique value proposition to secure better compensation packages while maintaining professional relationships.
          </p>
        </div>
      </div>

      {/* Key Vocabulary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { word: 'Negotiation', ipa: '/nɪˌɡəʊʃiˈeɪʃn/', example: 'The negotiation process took several weeks.' },
          { word: 'Compensation', ipa: '/ˌkɒmpenˈseɪʃn/', example: 'They offered a competitive compensation package.' },
          { word: 'Leverage', ipa: '/ˈliːvərɪdʒ/', example: 'You can use your experience as leverage.' },
          { word: 'Proposition', ipa: '/ˌprɒpəˈzɪʃn/', example: 'What is your unique value proposition?' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-200 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-900">{item.word}</h4>
              <span className="text-[10px] font-mono text-slate-400">{item.ipa}</span>
            </div>
            <p className="text-xs text-slate-500 italic">"{item.example}"</p>
          </div>
        ))}
      </div>

      {/* Useful Patterns & Grammar */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
            <BookOpen size={16} className="text-amber-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Useful Patterns</h4>
          </div>
          <div className="p-4 space-y-3">
            {[
              { pattern: 'To research market rates', usage: 'Always research market rates before the interview.' },
              { pattern: 'To secure a package', usage: 'He managed to secure a better benefits package.' },
            ].map((p, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-sm font-bold text-slate-700">{p.pattern}</span>
                <span className="text-xs text-slate-500">{p.usage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <Lightbulb size={16} className="text-amber-600" />
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Grammar Points</h4>
            </div>
            <ChevronDown size={16} className="text-slate-400" />
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-600">Usage of conditional sentences (Type 2) for hypothetical negotiation scenarios.</p>
          </div>
        </div>
      </div>

      {/* Practice Suggestions */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <ListChecks size={20} className="text-amber-600" />
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Practice Suggestions</h4>
        </div>
        <ul className="space-y-3">
          {[
            'Try shadowing the speaker\'s intonation during the "closing" section.',
            'Practice explaining your value proposition in 3 sentences.',
            'Use the word "leverage" in your own sentence about work.',
          ].map((s, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 shrink-0" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
