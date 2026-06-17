import { useState } from 'react';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useCoupons } from '@/hooks/useCoupons';
import CouponCard from '@/components/coupons/CouponCard';
import { CATEGORIES, SORT_OPTIONS } from '@/constants';

const CardSkeleton = () => <div className="glass-card p-4 space-y-3"><div className="skeleton h-12 w-full" /><div className="skeleton h-4 w-3/4" /><div className="skeleton h-10 w-full" /></div>;

export default function CouponsPage() {
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const { data, isLoading } = useCoupons({ category: category || undefined });

  return (
    <div className="section-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All Coupons</h1>
        <p className="text-slate-400">Browse {data?.total || 0}+ verified coupons from top stores</p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
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

      {/* Sort */}
      <div className="flex items-center justify-end gap-3 mb-8">
        <SlidersHorizontal className="w-4 h-4 text-slate-400" />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className="select-theme px-4 py-2 text-sm">
          {SORT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {isLoading ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />) :
          data?.data.map((coupon, i) => <CouponCard key={coupon.id} coupon={coupon} index={i} />)}
      </div>

      {!isLoading && data?.data.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-slate-400">No coupons found for this category</p>
        </div>
      )}
    </div>
  );
}
