import { useState } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useStores } from '@/hooks/useStores';
import StoreCard from '@/components/stores/StoreCard';
import { CATEGORIES } from '@/constants';

const CardSkeleton = () => <div className="glass-card p-5 space-y-3"><div className="skeleton h-16 w-16 rounded-2xl mx-auto" /><div className="skeleton h-4 w-2/3 mx-auto" /><div className="skeleton h-3 w-1/2 mx-auto" /></div>;

export default function StoresPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { data, isLoading } = useStores({ search: search || undefined, category: category || undefined });

  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All Stores</h1>
        <p className="text-slate-400">Find coupons and deals from 500+ top online stores</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stores..."
            className="input-theme w-full pl-10 pr-4 py-2.5 text-sm" />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="select-theme pl-10 pr-10 py-2.5 text-sm appearance-none">
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {isLoading ? Array(12).fill(0).map((_, i) => <CardSkeleton key={i} />) :
          data?.data.map((store, i) => <StoreCard key={store.id} store={store} index={i} />)}
      </div>

      {data?.total === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🏪</p>
          <p className="text-slate-400">No stores found for "{search}"</p>
        </div>
      )}
    </div>
  );
}
