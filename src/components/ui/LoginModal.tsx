import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '@/constants';
import { useThemeStore } from '@/store/themeStore';
import { useLoginModalStore } from '@/store/loginModalStore';
import { useAuthStore } from '@/store/authStore';
import { Link } from 'react-router-dom';

export default function LoginModal() {
  const { isOpen, closeLoginModal } = useLoginModalStore();
  const { login } = useAuthStore();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { isDark } = useThemeStore();

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLoginModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeLoginModal]);

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoggingIn(false);
      login();
      closeLoginModal();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLoginModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 max-h-[90vh]"
          >
            {/* Close Button (Mobile Absolute) */}
            <button 
              onClick={closeLoginModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 hover:bg-black/20 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors md:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Advertisement / Promo */}
            <div className="md:w-1/2 bg-gradient-to-br from-brand-orange to-brand-violet p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden shrink-0 hidden md:flex">
              
              {/* Background Decorative Orbs */}
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10">
                <h2 className="text-3xl font-black mb-4 leading-tight">
                  Unlock More <br/> with {APP_NAME}
                </h2>
                <p className="text-white/80 text-sm mb-8 max-w-[280px]">
                  Join over 2 million smart shoppers in India who never pay full price.
                </p>

                <div className="space-y-5">
                  {[
                    { icon: Tag, title: 'Personalized Deals', desc: 'Get offers tailored just for you.' },
                    { icon: ShoppingBag, title: 'Save Coupons', desc: 'Save and access coupons instantly.' },
                    { icon: ShieldCheck, title: 'Verified Offers', desc: 'Early access to 100% verified codes.' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-base mb-0.5">{feature.title}</h3>
                        <p className="text-white/70 text-xs leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 flex items-center gap-3 border-t border-white/20 pt-5">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i} 
                      src={`https://i.pravatar.cc/32?img=${i * 10}`} 
                      alt="User" 
                      className="w-8 h-8 rounded-full border-2 border-brand-orange object-cover" 
                    />
                  ))}
                </div>
                <div className="text-xs font-medium">
                  <span className="font-bold">2M+</span> Users joined
                </div>
              </div>
            </div>

            {/* Right Column: Login Box */}
            <div className={`md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center relative ${isDark ? 'bg-[#0A0F1E]' : 'bg-white'} overflow-y-auto`}>
              
              {/* Close Button (Desktop) */}
              <button 
                onClick={closeLoginModal}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors hidden md:block"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-w-sm">
                
                <div className="text-center mb-8">
                  <img 
                    src={isDark ? "/Dark%20Mode%20Logo_NOBG.png" : "/Light%20Mode%20Logo_NOBG.png"} 
                    alt={APP_NAME} 
                    className="w-40 h-auto object-contain mx-auto mb-6" 
                  />
                  <h1 className="text-xl md:text-2xl font-bold theme-text mb-2">Welcome Back!</h1>
                  <p className="theme-text-secondary text-sm">
                    Sign in to continue to your account.
                  </p>
                </div>

                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className={`w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-700/50' : 'border-slate-200 bg-white hover:bg-slate-50'} transition-all shadow-sm font-semibold theme-text disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isLoggingIn ? (
                    <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  )}
                  <span>{isLoggingIn ? 'Signing in...' : 'Continue with Google'}</span>
                </button>

                <div className="mt-8 text-center">
                  <p className="text-xs theme-text-secondary leading-relaxed">
                    By continuing, you agree to GrabFree's <br/>
                    <Link to="/terms" onClick={closeLoginModal} className="text-brand-orange hover:underline">Terms of Service</Link> and <Link to="/privacy" onClick={closeLoginModal} className="text-brand-orange hover:underline">Privacy Policy</Link>.
                  </p>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
