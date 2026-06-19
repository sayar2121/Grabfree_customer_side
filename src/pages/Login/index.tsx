import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Tag, ShoppingBag, ShieldCheck } from 'lucide-react';
import { APP_NAME } from '@/constants';
import { useThemeStore } from '@/store/themeStore';

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useThemeStore();

  const handleGoogleLogin = () => {
    setIsLoggingIn(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoggingIn(false);
      navigate('/'); // Redirect to home on success
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center theme-bg-primary p-4 md:p-8">
      <div className="w-full max-w-6xl glass-card overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        {/* Left Column: Advertisement / Promo */}
        <div className="md:w-1/2 bg-gradient-to-br from-brand-orange to-brand-violet p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          
          {/* Background Decorative Orbs */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10">
            <Link to="/" className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full mb-8 transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
                Unlock More <br/> with {APP_NAME}
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Join over 2 million smart shoppers in India who never pay full price. Sign in to access exclusive features!
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {[
                { icon: Tag, title: 'Personalized Deals', desc: 'Get offers tailored just for you based on your favorite stores.' },
                { icon: ShoppingBag, title: 'Save Coupons', desc: 'Save your favorite coupons and access them instantly anytime.' },
                { icon: ShieldCheck, title: 'Verified Offers', desc: 'Gain early access to 100% verified premium discount codes.' }
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="relative z-10 mt-12 flex items-center gap-4 border-t border-white/20 pt-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://i.pravatar.cc/40?img=${i * 10}`} 
                  alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-brand-orange object-cover" 
                />
              ))}
            </div>
            <div className="text-sm font-medium">
              <span className="font-bold">2M+</span> Users joined
            </div>
          </div>
        </div>

        {/* Right Column: Login Box */}
        <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center items-center relative bg-white dark:bg-[#0A0F1E]">
          <div className="w-full max-w-sm">
            
            <div className="text-center mb-10">
              <img 
                src={isDark ? "/Dark%20Mode%20Logo_NOBG.png" : "/Light%20Mode%20Logo_NOBG.png"} 
                alt={APP_NAME} 
                className="w-48 h-auto object-contain mx-auto mb-6" 
              />
              <h1 className="text-2xl font-bold theme-text mb-2">Welcome Back!</h1>
              <p className="theme-text-secondary text-sm">
                Sign in to continue to your account.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800/50 hover:bg-slate-700/50' : 'border-slate-200 bg-white hover:bg-slate-50'} transition-all shadow-sm font-semibold theme-text disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {isLoggingIn ? (
                  <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
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
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-xs theme-text-secondary leading-relaxed">
                By continuing, you agree to GrabFree's <br/>
                <Link to="/terms" className="text-brand-orange hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-brand-orange hover:underline">Privacy Policy</Link>.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
