import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Smartphone, Shirt, Scissors, Ticket } from 'lucide-react';
import { useDeals } from '@/hooks/useDeals';
import DealCard from '@/components/deals/DealCard';

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: <Smartphone className="w-4 h-4" /> },
  { id: 'fashion', name: 'Fashion', icon: <Shirt className="w-4 h-4" /> },
  { id: 'grooming', name: 'Grooming', icon: <Scissors className="w-4 h-4" /> },
  { id: 'experiences', name: 'Experiences', icon: <Ticket className="w-4 h-4" /> },
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

export default function FathersDayPage() {
  const [category, setCategory] = useState('');
  
  // We use the general mock deals for the demo
  const { data, isLoading } = useDeals({ category: category || undefined });

  return (
    <div className="min-h-screen pt-4 pb-20">
      
      {/* Hero Banner Section */}
      <section className="section-container mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-navy to-brand-violet px-6 py-16 md:py-24 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-orange/20 blur-3xl rounded-full translate-y-1/2 -translate-x-1/4" />
          
          {/* Content */}
          <div className="relative z-10 max-w-xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-6" style={{ color: '#FFFFFF' }}>
                <Gift className="w-4 h-4 text-brand-orange" />
                <span>Special Event</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/70">
                Happy Father's Day
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                Celebrate Dad with exclusive deals and handpicked gifts from top brands. Up to 70% OFF!
              </p>
            </motion.div>
          </div>

          {/* Featured Graphic / Mock Icon */}
          <div className="relative z-10 hidden md:flex items-center justify-center shrink-0">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-48 h-48 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-glow"
            >
              <Gift className="w-24 h-24 text-brand-orange" />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Main Content Section */}
      <section className="section-container">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto scrollbar-hide pb-2">
          <button
            onClick={() => setCategory('')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              !category
                ? 'bg-gradient-brand text-[#FFFFFF] shadow-brand-sm border border-transparent'
                : 'pill-inactive'
            }`}
          >
            All Gifts
          </button>
          
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                category === cat.name
                  ? 'bg-gradient-brand text-[#FFFFFF] shadow-brand-sm border border-transparent'
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
            <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
               <Gift className="w-10 h-10 text-brand-orange" />
            </div>
            <h3 className="text-xl font-bold theme-text mb-2">No deals found</h3>
            <p className="theme-text-secondary">
              Check back later for more Father's Day offers in this category!
            </p>
          </motion.div>
        )}
      </section>

    </div>
  );
}
