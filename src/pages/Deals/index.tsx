import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { useDeals } from '@/hooks/useDeals';
import DealCard from '@/components/deals/DealCard';
import { CATEGORIES, SORT_OPTIONS } from '@/constants';

const CardSkeleton = () => <div className="glass-card overflow-hidden"><div className="skeleton h-44 w-full" /><div className="p-4 space-y-3"><div className="skeleton h-4 w-3/4" /><div className="skeleton h-6 w-1/2" /><div className="skeleton h-10 w-full" /></div></div>;

export default function DealsPage() {
  const [category, setCategory] = useState('');
  const { data, isLoading } = useDeals({ category: category || undefined });

  return (
    <div className="section-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All Deals</h1>
        <p className="text-slate-400">Handpicked deals with massive discounts — updated daily</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setCategory('')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${!category ? 'bg-gradient-brand text-white' : 'pill-inactive'}`}>
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} onClick={() => setCategory(cat.name)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${category === cat.name ? 'bg-gradient-brand text-white' : 'pill-inactive'}`}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {isLoading ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />) :
          data?.data.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
      </div>

      {!isLoading && data?.data.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🎁</p>
          <p className="text-slate-400">No deals found for this category</p>
        </div>
      )}
    </div>
  );
}
