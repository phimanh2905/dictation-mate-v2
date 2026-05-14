import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Plus, Search, Volume2, Mic, CheckCircle2, 
  ChevronRight, ChevronLeft, Bookmark, Sparkles, Lightbulb,
  RotateCcw, Trophy, Star, Clock, Target, TrendingUp,
  Briefcase, Film, FlaskConical, Plane, Heart, Music, 
  FolderPlus, Type, X, ChevronDown, Users
} from 'lucide-react';

const practiceModes = ['Flashcard', 'Quiz', 'Write', 'Review'] as const;
type PracticeMode = typeof practiceModes[number];
type FilterCategory = 'All' | 'CEFR' | 'Exams' | 'Topics';

interface FeaturedCollection {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  wordCount: number;
  learnerCount: number;
  level: string;
  difficultyColor: string;
  category: 'CEFR' | 'Exams' | 'Topics';
  isOfficial: boolean;
}

interface WordData {
  id: string;
  word: string;
  phonetic: string;
  translation: string;
  definition: string;
  example: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  partOfSpeech: string;
  masteryLevel: number;
  reviewCount: number;
}

const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  {
    id: 'toeic-500-starter',
    name: 'TOEIC 500+ Starter Pack',
    description: '300 từ vựng cơ bản nhất cho người mới bắt đầu luyện TOEIC',
    icon: '📊',
    color: 'blue',
    wordCount: 300,
    learnerCount: 2341,
    level: 'A2-B1',
    difficultyColor: 'amber',
    category: 'Exams',
    isOfficial: true
  },
  {
    id: 'ielts-academic-7',
    name: 'IELTS Academic Band 7+',
    description: 'Từ vựng học thuật nâng cao cho IELTS Writing & Speaking',
    icon: '🎓',
    color: 'purple',
    wordCount: 500,
    learnerCount: 1856,
    level: 'B2-C1',
    difficultyColor: 'purple',
    category: 'Exams',
    isOfficial: true
  },
  {
    id: 'business-essentials',
    name: 'Business English Essentials',
    description: 'Từ vựng công sở thông dụng: meeting, email, presentation',
    icon: '💼',
    color: 'emerald',
    wordCount: 250,
    learnerCount: 3422,
    level: 'B1',
    difficultyColor: 'emerald',
    category: 'Topics',
    isOfficial: true
  },
  {
    id: 'a1-beginner-core',
    name: 'A1 Beginner Core 100',
    description: '100 từ vựng căn bản nhất để bắt đầu học tiếng Anh',
    icon: '🌱',
    color: 'green',
    wordCount: 100,
    learnerCount: 5678,
    level: 'A1',
    difficultyColor: 'green',
    category: 'CEFR',
    isOfficial: true
  }
];

const MOCK_WORDS: WordData[] = [
  {
    id: '1',
    word: 'negotiate',
    phonetic: '/nɪˈɡəʊʃieɪt/',
    translation: 'Đàm phán, thương lượng',
    definition: 'To try to reach an agreement or compromise by discussion.',
    example: 'You should research market rates before you negotiate your salary.',
    level: 'B2',
    partOfSpeech: 'verb',
    masteryLevel: 60,
    reviewCount: 5
  },
  {
    id: '2',
    word: 'abundant',
    phonetic: '/əˈbʌndənt/',
    translation: 'Dồi dào, phong phú',
    definition: 'Existing or available in large quantities; plentiful.',
    example: 'The region is abundant in natural resources.',
    level: 'C1',
    partOfSpeech: 'adjective',
    masteryLevel: 40,
    reviewCount: 3
  },
  {
    id: '3',
    word: 'competitive',
    phonetic: '/kəmˈpetətɪv/',
    translation: 'Cạnh tranh',
    definition: 'Relating to or characterized by competition.',
    example: 'The company offers a competitive salary package.',
    level: 'B1',
    partOfSpeech: 'adjective',
    masteryLevel: 80,
    reviewCount: 8
  }
];

export default function VocabPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMode, setActiveMode] = useState<PracticeMode>('Flashcard');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [writeInput, setWriteInput] = useState('');
  const [writeAttempts, setWriteAttempts] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // New state for layout updates
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  // View state
  const [activeCollection, setActiveCollection] = useState<FeaturedCollection | any | null>(null);
  const [activeTopic, setActiveTopic] = useState<{ id: string, name: string } | null>(null);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [isCreateCollectionModalOpen, setIsCreateCollectionModalOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(0);
  const [selectedColor, setSelectedColor] = useState('blue');

  const MOCK_TOPICS: Record<string, { id: string, name: string, status: string, count: number }[]> = {
    'toeic-500-starter': [
      { id: 'toeic-t1', name: 'Office Communications', status: 'In Progress', count: 45 },
      { id: 'toeic-t2', name: 'Business Travel', status: 'New', count: 30 },
      { id: 'toeic-t3', name: 'Financial Documents', status: 'Completed', count: 50 },
      { id: 'toeic-t4', name: 'Marketing & Sales', status: 'New', count: 35 },
    ],
    'ielts-academic-7': [
      { id: 'ielts-t1', name: 'Abstract Concepts', status: 'New', count: 40 },
      { id: 'ielts-t2', name: 'Academic Research', status: 'In Progress', count: 60 },
      { id: 'ielts-t3', name: 'Natural Environment', status: 'Completed', count: 45 },
    ],
    'business-essentials': [
      { id: 'biz-t1', name: 'Meetings & Presentations', status: 'Completed', count: 40 },
      { id: 'biz-t2', name: 'Email Etiquette', status: 'In Progress', count: 30 },
      { id: 'biz-t3', name: 'Negotiation Skills', status: 'New', count: 25 },
    ],
    'a1-beginner-core': [
      { id: 'a1-t1', name: 'Greetings & Basics', status: 'Completed', count: 25 },
      { id: 'a1-t2', name: 'Numbers & Time', status: 'Completed', count: 30 },
      { id: 'a1-t3', name: 'Family & Friends', status: 'In Progress', count: 20 },
      { id: 'a1-t4', name: 'Daily Objects', status: 'New', count: 25 },
    ]
  };

  const currentWord = MOCK_WORDS[currentWordIndex];

  const collections = [
    { id: 'biz-terms', name: 'Business Terms', count: 24, progress: 60, color: 'text-blue-600', bg: 'bg-blue-50', icon: '💼' },
    { id: 'movies-tv', name: 'Movies & TV', count: 18, progress: 40, color: 'text-purple-600', bg: 'bg-purple-50', icon: '🎬' },
    { id: 'sci-words', name: 'Science Words', count: 12, progress: 80, color: 'text-amber-600', bg: 'bg-amber-50', icon: '🔬' },
  ];

  const handleNextWord = () => {
    setCurrentWordIndex((prev) => (prev + 1) % MOCK_WORDS.length);
    setIsFlipped(false);
    setQuizAnswered(false);
    setSelectedOption(null);
    setWriteInput('');
    setWriteAttempts(0);
    setIsRevealed(false);
  };

  const handlePrevWord = () => {
    setCurrentWordIndex((prev) => (prev - 1 + MOCK_WORDS.length) % MOCK_WORDS.length);
    setIsFlipped(false);
    setQuizAnswered(false);
    setSelectedOption(null);
    setWriteInput('');
    setWriteAttempts(0);
    setIsRevealed(false);
  };

  const handleTopicClick = (topic: { id: string, name: string }) => {
    setActiveTopic(topic);
    // Scroll to top or practice area
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToCollections = () => {
    setActiveCollection(null);
    setActiveTopic(null);
  };

  const handleBackToTopics = () => {
    setActiveTopic(null);
  };

  if (activeTopic) {
    return (
      <div className="space-y-6 pb-12">
        <button 
          onClick={handleBackToTopics}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors mb-4"
        >
          <ChevronLeft size={20} />
          Back to {activeCollection?.name} Topics
        </button>

        <section className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10 space-y-8">
            {/* Selected Topic Badge */}
            <div className="flex justify-center">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">
                  <BookOpen size={16} className="text-blue-400" />
                  <span className="text-white text-sm font-bold">{activeTopic.name}</span>
                </div>
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{activeCollection?.name}</p>
              </div>
            </div>

            {/* SESSION STATS BAR */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1 max-w-xs">
                <span className="text-sm font-bold text-white">{currentWordIndex + 1}/{MOCK_WORDS.length} words</span>
                <div className="flex-1 h-2 bg-white/20 rounded-full">
                  <div 
                    className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentWordIndex + 1) / MOCK_WORDS.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">85%</p>
                  <p className="text-xs text-white/60">Accuracy</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-400">🔥 5</p>
                  <p className="text-xs text-white/60">Streak</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">120</p>
                  <p className="text-xs text-white/60">XP</p>
                </div>
              </div>
            </div>

            <div className="md:hidden space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white font-bold">Session Progress</span>
                <span className="text-white/80">{currentWordIndex + 1}/{MOCK_WORDS.length}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                  style={{ width: `${((currentWordIndex + 1) / MOCK_WORDS.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-lg font-bold text-white">85%</p>
                  <p className="text-xs text-white/60">Accuracy</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-orange-400">🔥 5</p>
                  <p className="text-xs text-white/60">Streak</p>
                </div>
              </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex justify-center">
              <div className="flex p-1 bg-white/10 rounded-xl max-w-md w-full">
                {practiceModes.map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                      activeMode === mode
                        ? 'bg-white text-gray-900 shadow-lg'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT AREA */}
            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeMode === 'Flashcard' && (
                  <motion.div
                    key="flashcard"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center space-y-8"
                  >
                    <div 
                      className="w-full max-w-md h-80 relative cursor-pointer group" 
                      style={{ perspective: '1000px' }}
                      onClick={() => setIsFlipped(!isFlipped)}
                    >
                      <motion.div
                        className="w-full h-full relative preserve-3d"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                      >
                        {/* Front */}
                        <div className="absolute inset-0 backface-hidden bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 group-hover:bg-white/10 transition-colors">
                          <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            {currentWord.level} • {currentWord.partOfSpeech}
                          </div>
                          <h3 className="text-5xl font-bold text-white tracking-tight">{currentWord.word}</h3>
                          <p className="text-lg text-white/40 font-mono">{currentWord.phonetic}</p>
                          <div className="pt-4 flex items-center gap-2 text-white/20 text-xs font-medium">
                            <RotateCcw size={14} />
                            Tap to flip
                          </div>
                        </div>

                        {/* Back */}
                        <div className="absolute inset-0 backface-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-6 rotate-y-180">
                          <div className="space-y-2">
                            <h4 className="text-2xl font-bold text-white">{currentWord.translation}</h4>
                            <p className="text-white/60 leading-relaxed">{currentWord.definition}</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-xl border border-white/5 w-full">
                            <p className="text-sm text-white/80 italic leading-relaxed">
                              "{currentWord.example}"
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between w-full max-w-lg">
                      <button 
                        onClick={handlePrevWord}
                        className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white font-bold transition-colors"
                      >
                        <ChevronLeft size={20} /> Prev
                      </button>
                      <span className="text-white/40 font-mono text-sm">{currentWordIndex + 1} / {MOCK_WORDS.length}</span>
                      <button 
                        onClick={handleNextWord}
                        className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white font-bold transition-colors"
                      >
                        Next <ChevronRight size={20} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
                        <Volume2 size={24} />
                      </button>
                      <button className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10">
                        <Mic size={24} />
                      </button>
                      <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20">
                        <CheckCircle2 size={20} /> Mastered
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeMode === 'Quiz' && (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-2xl mx-auto space-y-8"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-white/80 font-medium">
                        <span>Question {currentWordIndex + 1} of {MOCK_WORDS.length}</span>
                        <span className="text-orange-400">🔥 5 in a row!</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-emerald-500 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentWordIndex + 1) / MOCK_WORDS.length) * 100}%` }}
                        ></motion.div>
                      </div>
                    </div>

                    <div className="text-center space-y-4 py-4">
                      <p className="text-white/60 uppercase tracking-widest text-xs font-bold">What does this word mean?</p>
                      <h3 className="text-4xl font-bold text-white">{currentWord.word}</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Đàm phán, thương lượng', 'Dồi dào, phong phú', 'Cạnh tranh', 'Phát triển'].map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedOption(idx);
                            setQuizAnswered(true);
                          }}
                          disabled={quizAnswered}
                          className={`p-6 rounded-2xl text-white text-center font-bold transition-all min-h-[80px] flex items-center justify-center border-2 ${
                            selectedOption === idx
                              ? option === currentWord.translation
                                ? 'bg-emerald-500/20 border-emerald-500'
                                : 'bg-rose-500/20 border-rose-500'
                              : quizAnswered && option === currentWord.translation
                                ? 'bg-emerald-500/20 border-emerald-500'
                                : 'bg-white/5 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {quizAnswered && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center pt-4"
                      >
                        <button 
                          onClick={handleNextWord}
                          className="px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-all shadow-xl"
                        >
                          Next Question <ChevronRight size={20} />
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {activeMode === 'Write' && (
                  <motion.div
                    key="write"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-xl mx-auto text-center space-y-8"
                  >
                    <div className="space-y-2">
                      <p className="text-white/40 uppercase tracking-widest text-xs font-bold">Type the word for:</p>
                      <p className="text-3xl text-white font-bold">"{currentWord.translation}"</p>
                    </div>

                    <div className="relative group">
                      <input
                        type="text"
                        value={writeInput}
                        onChange={(e) => setWriteInput(e.target.value)}
                        className="w-full p-6 pr-32 text-xl text-center bg-white/5 border-2 border-white/10 rounded-3xl text-white placeholder-white/20 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Type answer..."
                      />
                      <button 
                        onClick={() => {
                          if (writeInput.toLowerCase() === currentWord.word.toLowerCase()) {
                            handleNextWord();
                          } else {
                            setWriteAttempts(prev => prev + 1);
                          }
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                      >
                        Submit
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-center gap-3">
                        {[...Array(3)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`w-3 h-3 rounded-full transition-colors ${
                              i < writeAttempts ? 'bg-rose-500' : 'bg-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-white/40 font-bold uppercase tracking-widest">{writeAttempts}/3 attempts used</p>
                    </div>

                    <div className="flex justify-center gap-6">
                      <button className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors">
                        <Lightbulb size={16} /> Hint
                      </button>
                      <button 
                        onClick={handleNextWord}
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold transition-colors"
                      >
                        Skip <ChevronRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeMode === 'Review' && (
                  <motion.div
                    key="review"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-lg mx-auto space-y-8"
                  >
                    <div className="flex justify-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                        <BookOpen className="text-blue-400" size={18} />
                        <span className="text-white font-bold">12 words</span>
                        <span className="text-white/60">due for review</span>
                      </div>
                    </div>

                    <div className="p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl text-center space-y-2">
                      <h3 className="text-5xl font-bold text-white tracking-tight">{currentWord.word}</h3>
                      <p className="text-xl text-white/40 font-mono">{currentWord.phonetic}</p>
                    </div>

                    <div className="space-y-4">
                      {!isRevealed ? (
                        <button 
                          onClick={() => setIsRevealed(true)}
                          className="w-full py-5 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold transition-all border border-white/10 shadow-xl"
                        >
                          Reveal Answer
                        </button>
                      ) : (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="space-y-6"
                        >
                          <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-2xl font-bold text-white mb-1">{currentWord.translation}</p>
                            <p className="text-white/60">{currentWord.definition}</p>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { label: 'Again', time: '1 min', color: 'rose' },
                              { label: 'Hard', time: '6 hrs', color: 'orange' },
                              { label: 'Good', time: '1 day', color: 'blue' },
                              { label: 'Easy', time: '3 days', color: 'emerald' },
                            ].map((grade) => (
                              <button
                                key={grade.label}
                                onClick={handleNextWord}
                                className={`flex flex-col items-center p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group`}
                              >
                                <span className={`text-sm font-bold mb-1 group-hover:scale-110 transition-transform ${
                                  grade.color === 'rose' ? 'text-rose-400' :
                                  grade.color === 'orange' ? 'text-orange-400' :
                                  grade.color === 'blue' ? 'text-blue-400' : 'text-emerald-400'
                                }`}>{grade.label}</span>
                                <span className="text-white/40 text-[10px] font-bold uppercase">{grade.time}</span>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activeCollection) {
    const collectionTopics = MOCK_TOPICS[activeCollection.id] || [
      { id: 'custom-t1', name: 'General Practice', status: 'New', count: 10 },
      { id: 'custom-t2', name: 'Review Session', status: 'In Progress', count: 5 },
    ];

    return (
      <div className="space-y-8 pb-12">
        <button 
          onClick={handleBackToCollections}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Collections
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/3 lg:w-1/4 sticky top-24">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm space-y-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-${activeCollection.color}-100 text-${activeCollection.color}-600`}>
                {activeCollection.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{activeCollection.name}</h1>
                <p className="text-sm text-gray-500 mt-2">{activeCollection.description}</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Words</span>
                  <span className="font-bold text-gray-900">{activeCollection.wordCount || activeCollection.count}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Topics</span>
                  <span className="font-bold text-gray-900">{collectionTopics.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Level</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold text-[10px] uppercase">
                    {activeCollection.level || 'B1'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Select a Topic</h2>
              <span className="text-xs text-gray-500">{collectionTopics.length} topics available</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collectionTopics.map((topic) => (
                <div 
                  key={topic.id}
                  onClick={() => handleTopicClick({ id: topic.id, name: topic.name })}
                  className="group bg-white p-5 rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <FolderPlus size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{topic.name}</h3>
                      <p className="text-xs text-gray-500">{topic.count} words • {topic.status}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-12">
      {/* Header Section */}
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
          
          {/* Add New Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md"
            >
              <Plus size={18} />
              Add New
              <ChevronDown size={16} className={`transition-transform ${isAddMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isAddMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
                >
                  <button 
                    onClick={() => { setIsAddWordModalOpen(true); setIsAddMenuOpen(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Type size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Add Word Manually</p>
                      <p className="text-[10px] text-gray-500">Enter word details yourself</p>
                    </div>
                  </button>
                  
                  <div className="h-px bg-gray-100 mx-2"></div>
                  
                  <button 
                    onClick={() => { setIsCreateCollectionModalOpen(true); setIsAddMenuOpen(false); }}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 transition-colors"
                  >
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                      <FolderPlus size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Create Collection</p>
                      <p className="text-[10px] text-gray-500">Organize words into sets</p>
                    </div>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* VOCABULARY STATS SECTION */}
      <section className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Stat Card 1: Total Words */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">247</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Words Saved</p>
            </div>
          </div>

          {/* Stat Card 2: Mastered */}
          <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Trophy size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Mastered</p>
            </div>
          </div>

          {/* Stat Card 3: Accuracy */}
          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl">
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
              <Target size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">89%</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Accuracy</p>
            </div>
          </div>

          {/* Stat Card 4: Today's Progress */}
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-2xl">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Reviewed Today</p>
            </div>
          </div>
        </div>

        {/* Overall mastery progress bar */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700">Overall Mastery</span>
            <span className="text-sm font-bold text-gray-900">63%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" style={{ width: '63%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">156 of 247 words mastered</p>
        </div>
      </section>

      {/* FEATURED COLLECTIONS SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
              Featured Collections
            </h2>
            <p className="text-sm text-gray-500">Bộ từ vựng được chọn lọc bởi Dictation Mate</p>
          </div>
          
          <div className="flex p-1 bg-gray-100 rounded-xl">
            {['All', 'CEFR', 'Exams', 'Topics'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as FilterCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeFilter === filter
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURED_COLLECTIONS.filter(c => activeFilter === 'All' || c.category === activeFilter).map((collection) => (
            <div 
              key={collection.id}
              onClick={() => setActiveCollection(collection)}
              className="group relative bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              {collection.isOfficial && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                  Official
                </span>
              )}
              
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-${collection.color}-100 text-${collection.color}-600`}>
                  {collection.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{collection.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {collection.wordCount} words
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {collection.learnerCount.toLocaleString()} learning
                </span>
                <span className={`px-2 py-0.5 rounded-full bg-${collection.difficultyColor}-100 text-${collection.difficultyColor}-700 font-medium`}>
                  {collection.level}
                </span>
              </div>
              
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-full py-2 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* My Collections Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">My Collections</h2>
          <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Select to Practice</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <motion.div 
              key={col.id}
              whileHover={{ y: -4 }}
              onClick={() => setActiveCollection(col)}
              className={`bg-white p-6 rounded-3xl border transition-all cursor-pointer border-gray-100 shadow-sm hover:shadow-md space-y-4`}
            >
              <div className={`w-12 h-12 ${col.bg} ${col.color} rounded-2xl flex items-center justify-center`}>
                <Bookmark size={24} fill="currentColor" className="opacity-80" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-gray-900">{col.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{col.count} words</p>
                </div>
                <div className="text-[20px]">{col.icon}</div>
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

      {/* Removed Practice area from here as it is now conditional */}

      {/* Recently Added Section */}
      <section className="space-y-6">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recently Added</h2>
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
          {MOCK_WORDS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer ${idx !== MOCK_WORDS.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.masteryLevel >= 80 ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.masteryLevel >= 80 ? <CheckCircle2 size={24} /> : <BookOpen size={24} />}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{item.word}</h4>
                  <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{item.definition}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mastery</span>
                  <div className="flex items-center gap-1">
                    <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${item.masteryLevel}%` }}></div>
                    </div>
                    <span className="text-xs font-bold text-gray-700">{item.masteryLevel}%</span>
                  </div>
                </div>
                <button className="p-3 text-gray-300 hover:text-blue-600 transition-colors bg-gray-50 rounded-xl">
                  <Volume2 size={20} />
                </button>
                <ChevronRight size={24} className="text-gray-300" />
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* MODALS */}
      <AnimatePresence>
        {isAddWordModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Word</h2>
                <button onClick={() => setIsAddWordModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Word *</label>
                  <input type="text" placeholder="e.g., abundant" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phonetic</label>
                  <input type="text" placeholder="/əˈbʌndənt/" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Definition *</label>
                  <textarea placeholder="Existing in large quantities..." rows={2} className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Vietnamese Meaning</label>
                  <input type="text" placeholder="Đồi dào, phong phú" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Part of Speech</label>
                    <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                      <option value="noun">Noun</option>
                      <option value="verb">Verb</option>
                      <option value="adjective">Adjective</option>
                      <option value="adverb">Adverb</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CEFR Level</label>
                    <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
                      <option value="A1">A1</option>
                      <option value="A2">A2</option>
                      <option value="B1">B1</option>
                      <option value="B2">B2</option>
                      <option value="C1">C1</option>
                      <option value="C2">C2</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsAddWordModalOpen(false)} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">Cancel</button>
                <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">Save Word</button>
              </div>
            </motion.div>
          </div>
        )}

        {isCreateCollectionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Create Collection</h2>
                <button onClick={() => setIsCreateCollectionModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Collection Name *</label>
                  <input type="text" placeholder="e.g., Business Terms" className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Choose Icon</label>
                  <div className="flex gap-3 flex-wrap">
                    {[Briefcase, Film, FlaskConical, Plane, Heart, Music, BookOpen, Star].map((Icon, idx) => (
                      <button
                        key={idx}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          selectedIcon === idx ? 'bg-blue-100 ring-2 ring-blue-500 text-blue-600' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedIcon(idx)}
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Choose Color</label>
                  <div className="flex gap-3">
                    {['blue', 'emerald', 'amber', 'purple', 'rose', 'indigo'].map((color) => (
                      <button
                        key={color}
                        className={`w-10 h-10 rounded-full bg-${color}-500 transition-all ${
                          selectedColor === color ? 'ring-4 ring-offset-2 ring-gray-300' : ''
                        }`}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button onClick={() => setIsCreateCollectionModalOpen(false)} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50">Cancel</button>
                <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700">Create Collection</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
