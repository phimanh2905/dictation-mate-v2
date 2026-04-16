import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Check, Clock, Globe, Award, Target, Sparkles, Star } from 'lucide-react';
import { Page } from '../../types';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const LANGUAGES = [
  { id: 'en', name: 'English', flag: '🇺🇸', popular: true },
  { id: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { id: 'ko', name: 'Korean', flag: '🇰🇷' },
  { id: 'fr', name: 'French', flag: '🇫🇷' },
];

const LEVELS = [
  { id: 'beginner', title: 'Beginner', cefr: 'A1-A2', desc: 'New to English' },
  { id: 'intermediate', title: 'Intermediate', cefr: 'B1-B2', desc: 'Familiar basics', popular: true },
  { id: 'advanced', title: 'Advanced', cefr: 'C1-C2', desc: 'Proficient speaker' },
];

const GOALS = [
  { id: '15', label: 'Quick practice', time: '15 min', desc: 'Light usage', iconSize: 18 },
  { id: '30', label: 'Regular', time: '30 min', desc: 'Recommended', iconSize: 24, recommended: true },
  { id: '60', label: 'Serious learner', time: '60 min', desc: 'Intensive study', iconSize: 32 },
  { id: '90', label: 'Intensive', time: '90 min', desc: 'Rapid mastery', iconSize: 40 },
];

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string>('30');
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onComplete();
      }, 1500);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Choose Your Language</h2>
              <p className="text-slate-500 text-sm">What would you like to learn today?</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setSelectedLang(lang.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 group hover:scale-[1.02] hover:bg-slate-50 ${
                    selectedLang === lang.id
                      ? 'border-indigo-400 bg-indigo-50/30'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <span className="text-3xl">{lang.flag}</span>
                  <span className="font-bold text-slate-800">{lang.name}</span>
                  {lang.popular && (
                    <span className="absolute -top-2 -right-1 px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                      Popular
                    </span>
                  )}
                  {selectedLang === lang.id && (
                    <div className="absolute top-2 left-2 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">What's Your Level?</h2>
              <p className="text-slate-500 text-sm">Select your current English proficiency.</p>
            </div>
            <div className="space-y-3">
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`w-full relative p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                    selectedLevel === level.id
                      ? 'border-indigo-500 bg-indigo-50/30 border-l-[6px]'
                      : 'border-slate-100 bg-white hover:border-slate-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-black ${
                    selectedLevel === level.id ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {level.cefr}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{level.title}</span>
                      {level.popular && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-bold rounded-full">
                          Most popular
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{level.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            <center>
              <button className="text-indigo-600 text-sm font-bold hover:underline">
                Not sure? Take a quick test
              </button>
            </center>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-800">Set Your Daily Goal</h2>
              <p className="text-slate-500 text-sm">How long do you want to practice each day?</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                    selectedGoal === goal.id
                      ? 'border-indigo-500 bg-indigo-500 text-white'
                      : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
                  }`}
                >
                  <Clock size={goal.iconSize} className={selectedGoal === goal.id ? 'text-white' : 'text-slate-300'} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${selectedGoal === goal.id ? 'text-white' : 'text-slate-800'}`}>
                        {goal.time}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedGoal === goal.id ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {goal.label}
                      </span>
                    </div>
                    <p className={`text-xs mt-0.5 ${selectedGoal === goal.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {goal.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-3">
              <Sparkles size={18} className="text-orange-500" />
              <p className="text-xs text-orange-700 font-medium">
                🔥 Build a daily streak for best results!
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const isNextDisabled = (step === 1 && !selectedLang) || (step === 2 && !selectedLevel);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-50 flex flex-col lg:flex-row">
      {/* Desktop Left Illustration Panel */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-indigo-600 to-indigo-800 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-black shadow-lg">DM</div>
            <span className="text-2xl font-black tracking-tight">Dictation Mate</span>
          </div>
          <div className="space-y-4 max-w-sm">
            <h1 className="text-5xl font-black leading-tight">Master any language through dictation</h1>
            <p className="text-indigo-100 text-lg">Join 50k+ learners practicing with their favorite YouTube content.</p>
          </div>
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-700 bg-indigo-500 overflow-hidden">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-indigo-700 bg-indigo-400 flex items-center justify-center text-[10px] font-bold">
              +5k
            </div>
          </div>
          <p className="text-xs text-indigo-200">New learners joined this week</p>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl" />
      </div>

      {/* Main Wizard Area */}
      <div className="flex-1 flex flex-col relative w-full lg:max-w-3xl lg:mx-auto">
        {/* Fixed Header */}
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-100">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="font-bold text-slate-800">Dictation Mate</span>
          </div>
          <div className="hidden lg:block">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Setup Wizard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s <= step ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400">Step {step} of 3</span>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
          <div className="max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Sticky Bottom Navigation */}
        <footer className="fixed bottom-0 left-0 right-0 lg:absolute lg:right-0 lg:w-full bg-white border-t border-slate-100 p-6 z-50">
          <div className="max-w-md mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleBack}
              disabled={step === 1 || isLoading}
              className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-800'
              }`}
            >
              <ChevronLeft size={20} />
              Back
            </button>

            <button
              onClick={handleNext}
              disabled={isNextDisabled || isLoading}
              className={`flex-1 py-4 px-8 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isNextDisabled
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-100'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : step === 3 ? (
                <>Start Learning <Sparkles size={18} /></>
              ) : (
                <>Next <ChevronRight size={20} /></>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
