import { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Plus, Search, Volume2, Mic, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

export default function VocabPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const collections = [
    { name: 'Business Terms', count: 24, progress: 60, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Movies & TV', count: 18, progress: 40, color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Science Words', count: 12, progress: 80, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const recentWords = [
    { word: 'negotiate', definition: 'To try to reach an agreement or compromise by discussion.', context: 'You should research market rates before you negotiate.', mastered: true },
    { word: 'competitive', definition: 'Relating to or characterized by competition.', context: 'The company offers a competitive salary package.', mastered: false },
    { word: 'market rates', definition: 'The current price or cost of something in the market.', context: 'Ask for a salary that matches current market rates.', mastered: false },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Vocabulary</h1>
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search words..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-sm text-sm"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md">
            <Plus size={18} />
            Add New
          </button>
        </div>
      </div>

      {/* Collections */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">My Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <motion.div 
              key={col.name}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 cursor-pointer hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 ${col.bg} ${col.color} rounded-2xl flex items-center justify-center`}>
                <Bookmark size={24} fill="currentColor" className="opacity-80" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{col.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{col.count} words</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-gray-400">
                  <span>Mastery</span>
                  <span>{col.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full bg-blue-600`} style={{ width: `${col.progress}%` }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Active Review / Flashcard */}
      <section className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
          <div className="text-blue-400 font-bold uppercase tracking-widest text-xs">Active Review</div>
          
          <div className="space-y-4">
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">market rates</h3>
            <p className="text-gray-400 text-lg italic">"The current price or cost of something in the market."</p>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-left">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-blue-400 font-bold">Context:</span> "You should research <span className="text-white font-bold underline decoration-blue-500 underline-offset-4">market rates</span> before you negotiate your salary."
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
              <Volume2 size={24} />
            </button>
            <button className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all border border-white/10">
              <Mic size={24} />
            </button>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl flex items-center gap-2">
              <CheckCircle2 size={20} />
              Mark as Mastered
            </button>
            <button className="px-8 py-4 bg-white/10 text-white rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2">
              Next Word
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* Recently Added List */}
      <section>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Recently Added</h2>
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          {recentWords.map((item, idx) => (
            <div 
              key={item.word} 
              className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${idx !== recentWords.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.mastered ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.mastered ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{item.word}</h4>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.definition}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Added 2h ago</span>
                <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                  <Volume2 size={18} />
                </button>
                <ChevronRight size={20} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
