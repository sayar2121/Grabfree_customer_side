import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, Smartphone, Plane, Home, Shirt } from 'lucide-react';
import { useDeals } from '@/hooks/useDeals';
import DealCard from '@/components/deals/DealCard';

const CATEGORIES = [
  { id: 'summer', name: 'Summer Collection', icon: <Shirt className="w-4 h-4" /> },
  { id: 'tech', name: 'Tech Gadgets', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'travel', name: 'Travel Gear', icon: <Plane className="w-4 h-4" /> },
  { id: 'home', name: 'Home Upgrades', icon: <Home className="w-4 h-4" /> },
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

export default function SalesPage() {
  const [category, setCategory] = useState('');
  
  // We use the general mock deals for the demo
  const { data, isLoading } = useDeals({ category: category || undefined });

  return (
    <div className="min-h-screen pt-4 pb-20">
      
      {/* Hero Banner Section */}
      <section className="section-container mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 px-6 py-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/4" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/30 blur-3xl rounded-full translate-y-1/4 translate-x-1/3" />
          
          {/* Content */}
          <div className="relative z-10 max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ color: '#FFFFFF' }}>
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>End of Season</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight drop-shadow-md" style={{ color: '#FFFFFF' }}>
                June Mega Sale
              </h1>
              <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Kick off the summer with massive discounts across all categories. Grab up to 80% OFF while supplies last!
              </p>
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
              <Sun className="w-24 h-24 text-yellow-100" />
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
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-[#FFFFFF] shadow-md border border-transparent'
                : 'pill-inactive'
            }`}
          >
            All Sales
          </button>
          
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                category === cat.name
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-[#FFFFFF] shadow-md border border-transparent'
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
            <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <Sun className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">No sales found</h3>
            <p className="theme-text-secondary">
              We're currently refreshing our summer offers for this category. Check back soon!
            </p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
