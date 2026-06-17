import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Tag, ShoppingBag, Store as StoreIcon, BookOpen } from 'lucide-react';
import { searchService } from '@/services/searchService';
import type { SearchResult } from '@/types';
import CouponCard from '@/components/coupons/CouponCard';
import DealCard from '@/components/deals/DealCard';
import StoreCard from '@/components/stores/StoreCard';
import BlogCard from '@/components/blogs/BlogCard';

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q') || '';
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'coupons' | 'deals' | 'stores' | 'blogs'>('all');

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    searchService.search(query).then((r) => { setResults(r); setIsLoading(false); });
  }, [query]);

  const totalResults = results ? results.stores.length + results.coupons.length + results.deals.length + results.blogs.length : 0;

  return (
    <div className="section-container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3">
          <Search className="w-7 h-7 text-brand-orange" />
          Search Results
        </h1>
        {query && <p className="text-slate-400">Showing results for "<span className="text-white font-semibold">{query}</span>" — {totalResults} results</p>}
      </div>

      {!query && (
        <div className="text-center py-20">
          <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Enter a search term to find deals, coupons, and more</p>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="glass-card p-4 space-y-3 animate-pulse">
              <div className="skeleton h-5 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-10 w-full" />
            </div>
          ))}
        </div>
      )}

      {results && !isLoading && (
        <div className="space-y-12">
          {results.stores.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <StoreIcon className="w-5 h-5 text-brand-orange" /> Stores
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {results.stores.map((s, i) => <StoreCard key={s.id} store={s} index={i} />)}
              </div>
            </div>
          )}
          {results.coupons.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <Tag className="w-5 h-5 text-brand-orange" /> Coupons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {results.coupons.map((c, i) => <CouponCard key={c.id} coupon={c} index={i} />)}
              </div>
            </div>
          )}
          {results.deals.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-orange" /> Deals
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {results.deals.map((d, i) => <DealCard key={d.id} deal={d} index={i} />)}
              </div>
            </div>
          )}
          {results.blogs.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-orange" /> Blog Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {results.blogs.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
              </div>
            </div>
          )}
          {totalResults === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">😕</p>
              <h2 className="text-xl font-bold text-white mb-2">No results found</h2>
              <p className="text-slate-400 mb-6">Try searching for a different store or category</p>
              <Link to="/" className="btn-brand px-6 py-3 text-sm inline-block"><span>Browse Deals</span></Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
