import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Smartphone, Plane, Home, Shirt, Zap } from 'lucide-react';
import { useDeals } from '@/hooks/useDeals';
import DealCard from '@/components/deals/DealCard';

const CATEGORIES = [
  { id: 'tech', name: 'Electronics', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'fashion', name: 'Fashion', icon: <Shirt className="w-4 h-4" /> },
  { id: 'home', name: 'Home & Kitchen', icon: <Home className="w-4 h-4" /> },
  { id: 'travel', name: 'Travel', icon: <Plane className="w-4 h-4" /> },
];

const CardSkeleton = () => (
  <div className="glass-card overflow-hidden">
    <div className="skeleton h-44 w-full" />
    <div className="p-4 space-y-3">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-6 w-1/2" />
      <div className="skeleton h-10 w-full" />
    </div>
  </div>
);

export default function DealsOfTheDayPage() {
  const [category, setCategory] = useState('');
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });
  
  const { data, isLoading } = useDeals({ category: category || undefined });

  // Simulate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pt-4 pb-20">
      
      {/* Hero Banner Section */}
      <section className="section-container mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 px-6 py-16 md:py-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-fuchsia-300/30 blur-3xl rounded-full translate-y-1/4 translate-x-1/3" />
          
          {/* Content */}
          <div className="relative z-10 max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ color: '#FFFFFF' }}>
                <Zap className="w-4 h-4 text-yellow-300" />
                <span>24 Hours Only</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-md" style={{ color: '#FFFFFF' }}>
                Deals of the Day
              </h1>
              <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Handpicked exclusive offers that expire soon. Grab them before they're gone!
              </p>
              
              {/* Countdown Timer */}
              <div className="flex items-center justify-center md:justify-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold border border-white/30 shadow-lg">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-medium mt-2 opacity-80 uppercase tracking-wider">Hours</span>
                </div>
                <span className="text-3xl font-bold mb-6 opacity-50">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold border border-white/30 shadow-lg">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-medium mt-2 opacity-80 uppercase tracking-wider">Mins</span>
                </div>
                <span className="text-3xl font-bold mb-6 opacity-50">:</span>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-2xl font-bold border border-white/30 shadow-lg">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-xs font-medium mt-2 opacity-80 uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Featured Graphic / Mock Icon */}
          <div className="relative z-10 hidden md:flex items-center justify-center shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <Clock className="w-24 h-24 text-white" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-container">
        
        {/* Category Filter Pills */}
        <div className="flex flex-nowrap gap-4 md:gap-5 mb-10 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setCategory('')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              !category
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[#FFFFFF] shadow-md border border-transparent'
                : 'pill-inactive'
            }`}
          >
            All Deals
          </button>
          
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                category === cat.name
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-[#FFFFFF] shadow-md border border-transparent'
                  : 'pill-inactive'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array(8)
                .fill(0)
                .map((_, i) => <CardSkeleton key={i} />)
            : data?.data.map((deal, i) => (
                <DealCard key={deal.id} deal={deal} index={i} />
              ))}
        </div>

        {/* Empty State */}
        {!isLoading && data?.data.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-24 glass-card mt-8"
          >
            <div className="w-20 h-20 bg-fuchsia-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <Clock className="w-10 h-10 text-fuchsia-500" />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">No deals found</h3>
            <p className="theme-text-secondary">
              We're currently hunting for more deals in this category. Check back soon!
            </p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
