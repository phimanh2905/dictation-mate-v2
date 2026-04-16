import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Headphones, Target, BarChart3, Flame, Mail, ArrowRight, Github } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-white flex flex-col lg:flex-row overflow-hidden">
      {/* Left Panel: App Illustration & Features */}
      <div className="flex-1 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] p-8 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400 opacity-20 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-indigo-600 font-black shadow-xl">DM</div>
            <span className="text-3xl font-black tracking-tight">Dictation Mate</span>
          </div>

          <div className="space-y-6 max-w-lg">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl lg:text-6xl font-black leading-tight"
            >
              Master English through <span className="text-amber-400">dictation</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-indigo-100 text-lg lg:text-xl font-medium"
            >
              Train your ears, improve your spelling, and build confidence with real content.
            </motion.p>
          </div>
        </div>

        {/* Mock Illustration Area */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-12">
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl relative z-20"
            >
              <div className="w-64 lg:w-80 aspect-video bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center relative">
                <Headphones size={64} className="text-indigo-400 opacity-50" />
                {/* Audio Waveform Mock */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [10, 40, 20, 35, 15][i % 5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
                      className="flex-1 bg-indigo-500 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            {/* Shadows/Glows */}
            <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-30 rounded-full scale-75 translate-y-10"></div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="relative z-10 flex flex-wrap gap-3">
          {[
            { icon: <Target className="text-amber-400" size={16} />, text: "Real dictation practice" },
            { icon: <BarChart3 className="text-blue-400" size={16} />, text: "Track your progress" },
            { icon: <Flame className="text-orange-400" size={16} />, text: "Build daily streaks" }
          ].map((pill, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-sm font-bold flex items-center gap-2"
            >
              {pill.icon}
              {pill.text}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Dictation Mate</h2>
            <p className="text-slate-500 font-medium tracking-tight">Master English through dictation</p>
          </div>

          <div className="space-y-4">
            {/* Google Login Button */}
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-white border border-slate-200 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm group active:scale-[0.98]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <button className="w-full flex items-center justify-center gap-4 py-4 px-6 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98]">
              <Github size={24} />
              Continue with GitHub
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-slate-400 text-sm font-medium">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 pl-12 pr-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-600 outline-none transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Continue with Email
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-500 font-medium">
            By continuing, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:underline font-bold">Terms of Service</a> and{' '}
            <a href="#" className="text-indigo-600 hover:underline font-bold">Privacy Policy</a>.
          </p>
        </div>

        {/* Floating background blobs for mobile form feel */}
        <div className="lg:hidden absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-indigo-50/50 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
