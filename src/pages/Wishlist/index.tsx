import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack, Trash2, Tag, Gift, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '@/store/wishlistStore';
import DealCard from '@/components/deals/DealCard';
import CouponCard from '@/components/coupons/CouponCard';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();
  const [activeTab, setActiveTab] = useState<'coupons' | 'deals'>('coupons');

  const savedCoupons = items.filter((i) => i.type === 'coupon').map(i => i.item as any);
  const savedDeals = items.filter((i) => i.type === 'deal').map(i => i.item as any);

  const hasItems = items.length > 0;
  const currentItems = activeTab === 'coupons' ? savedCoupons : savedDeals;

  return (
    <div className="min-h-screen pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b theme-border-subtle">
          <div>
            <h1 className="text-3xl md:text-4xl font-black theme-text mb-2">My Wishlist</h1>
            <p className="theme-text-secondary font-medium">
              You have {items.length} saved {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {hasItems && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/30"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {hasItems ? (
          <>
            {/* Tabs */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => setActiveTab('coupons')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'coupons'
                    ? 'bg-gradient-brand text-white shadow-brand-sm'
                    : 'bg-transparent border theme-border-strong theme-text-secondary hover:theme-text hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Tag className="w-4 h-4" />
                Saved Coupons ({savedCoupons.length})
              </button>
              <button
                onClick={() => setActiveTab('deals')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === 'deals'
                    ? 'bg-gradient-brand text-white shadow-brand-sm'
                    : 'bg-transparent border theme-border-strong theme-text-secondary hover:theme-text hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <Gift className="w-4 h-4" />
                Saved Deals ({savedDeals.length})
              </button>
            </div>

            {/* Grid */}
            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentItems.length > 0 ? (
                    <div className={`grid gap-6 ${activeTab === 'coupons' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
                      {currentItems.map((item: any, i: number) => (
                        activeTab === 'coupons' 
                          ? <CouponCard key={item.id} coupon={item} index={i} />
                          : <DealCard key={item.id} deal={item} index={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 glass-card">
                      <Search className="w-12 h-12 theme-text-secondary opacity-50 mx-auto mb-4" />
                      <h3 className="text-lg font-bold theme-text mb-2">No {activeTab} saved yet</h3>
                      <p className="theme-text-secondary text-sm">
                        Browse the site and click the heart icon to save {activeTab} here!
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div className="text-center py-32 glass-card">
            <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartCrack className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold theme-text mb-3">Your Wishlist is Empty</h2>
            <p className="theme-text-secondary max-w-md mx-auto mb-8">
              Looks like you haven't saved any deals or coupons yet. Browse our best offers and click the heart icon to save your favorites!
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link to="/coupons" className="btn-brand px-6 py-3">
                Browse Coupons
              </Link>
              <Link to="/deals" className="px-6 py-3 rounded-xl border theme-border-strong theme-text font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Browse Deals
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
