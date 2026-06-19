import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Sparkles, TrendingUp, Store, Zap, ChevronRight } from 'lucide-react';
import { CATEGORIES, STATS } from '@/constants';
import { MOCK_CATEGORIES, MOCK_POPULAR_OFFERS, MOCK_BANK_OFFERS, MOCK_HERO_BANNERS, MOCK_SIDE_BANNERS } from '@/services/mockData';
import { useFeaturedStores } from '@/hooks/useStores';
import { useLatestCoupons } from '@/hooks/useCoupons';
import { useTrendingDeals } from '@/hooks/useDeals';
import { useLatestBlogs } from '@/hooks/useBlogs';
import CouponCard from '@/components/coupons/CouponCard';
import DealCard from '@/components/deals/DealCard';
import PopularOfferCard from '@/components/deals/PopularOfferCard';
import StoreCard from '@/components/stores/StoreCard';
import BlogCard from '@/components/blogs/BlogCard';
import { Link } from 'react-router-dom';

// Skeleton loaders
const CardSkeleton = () => (
  <div className="glass-card p-4 space-y-3">
    <div className="skeleton h-5 w-3/4" />
    <div className="skeleton h-4 w-1/2" />
    <div className="skeleton h-10 w-full" />
    <div className="skeleton h-8 w-2/3" />
  </div>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [activeHeroBanner, setActiveHeroBanner] = useState(MOCK_HERO_BANNERS[0]);
  const [activeSideBanner, setActiveSideBanner] = useState(MOCK_SIDE_BANNERS[0]);

  // Handle hash scrolling on page load (e.g. arriving from another page via mobile menu)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  // Auto-cycle main banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroBanner(current => {
        const currentIndex = MOCK_HERO_BANNERS.findIndex(b => b.id === current.id);
        const nextIndex = (currentIndex + 1) % MOCK_HERO_BANNERS.length;
        return MOCK_HERO_BANNERS[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { data: featuredStores, isLoading: storesLoading } = useFeaturedStores();
  const { data: latestCoupons, isLoading: couponsLoading } = useLatestCoupons(8);
  const { data: trendingDeals, isLoading: dealsLoading } = useTrendingDeals(8);
  const { data: latestBlogs, isLoading: blogsLoading } = useLatestBlogs(3);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO BANNER SLIDER ── */}
      <section className="relative w-full pt-4 pb-2 section-container overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Main Hero Banner (75%) */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            <Link to={activeHeroBanner.link} className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative shadow-md bg-brand-blue group cursor-pointer block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeHeroBanner.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  src={activeHeroBanner.src}
                  alt={activeHeroBanner.alt}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
            </Link>
            {/* Tabs */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide px-2">
              {MOCK_HERO_BANNERS.map(banner => (
                <button
                  key={banner.id}
                  onClick={() => setActiveHeroBanner(banner)}
                  className={`whitespace-nowrap px-1 py-2 text-[13px] md:text-sm font-semibold border-b-2 transition-colors ${activeHeroBanner.id === banner.id ? 'border-brand-orange text-brand-orange' : 'border-transparent theme-text-secondary hover:text-brand-orange'}`}
                >
                  {banner.tabName}
                </button>
              ))}
            </div>
          </div>

          {/* Side Banner (25%) - Hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-2">
            <Link to={activeSideBanner.link} className="w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative shadow-md bg-white group cursor-pointer border theme-border-subtle block">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeSideBanner.id}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  src={activeSideBanner.src}
                  alt={activeSideBanner.alt}
                  className="w-full h-full object-cover absolute inset-0"
                />
              </AnimatePresence>
            </Link>
            {/* Tabs */}
            <div className="flex items-center justify-center gap-6 overflow-x-auto pb-2 scrollbar-hide">
              {MOCK_SIDE_BANNERS.map(banner => (
                <button
                  key={banner.id}
                  onClick={() => setActiveSideBanner(banner)}
                  className={`whitespace-nowrap px-1 py-2 text-[13px] md:text-sm font-semibold border-b-2 transition-colors ${activeSideBanner.id === banner.id ? 'border-brand-orange text-brand-orange' : 'border-transparent theme-text-secondary hover:text-brand-orange'}`}
                >
                  {banner.tabName}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <section className="section-container flex items-center justify-center gap-4 pt-0 pb-2 mb-2">
        <div className="h-px bg-yellow-400 flex-1 max-w-[30px] sm:max-w-[50px]"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
        <span className="text-xs sm:text-sm md:text-base font-medium theme-text">India's Leading Coupons & Deals Marketplace</span>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
        <div className="h-px bg-yellow-400 flex-1 max-w-[30px] sm:max-w-[50px]"></div>
      </section>

      {/* ── STATS MARQUEE ── */}
      <section className="bg-gradient-to-r from-brand-orange/10 via-brand-red/5 to-brand-violet/10 border-y theme-border-subtle py-5 overflow-hidden">
        <div className="marquee-track">
          {[...STATS, ...STATS].map((stat, i) => (
            <div key={i} className="flex items-center gap-2 mx-10 shrink-0">
              <span className="text-2xl font-black text-gradient">{stat.value}</span>
              <span className="theme-text-secondary font-medium text-sm">{stat.label}</span>
              <span className="text-brand-orange mx-4">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRENDING DEALS ── */}
      <section id="deals" className="section-container py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Hot Right Now</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Trending Deals</h2>
          </div>
          <Link to="/deals" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {dealsLoading ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />) :
            trendingDeals?.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
        </div>
      </section>

      {/* ── CATEGORY GRID ── */}
      <section id="categories" className="section-container py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Browse by Category</h2>
            <p className="theme-text-secondary text-sm mt-1">Find deals in your favourite category</p>
          </div>
          <Link to="/categories" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {MOCK_CATEGORIES.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 }}>
              <Link to={`/categories/${cat.slug}`}
                className="glass-card p-4 flex flex-col items-center text-center group"
                style={{ '--cat-color': cat.color } as React.CSSProperties}>
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <span className="text-xs font-semibold theme-text-secondary group-hover:theme-text transition-colors">{cat.name}</span>
                {cat.count && <span className="text-[10px] theme-text-muted mt-0.5">{cat.count} deals</span>}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── POPULAR OFFERS ── */}
      <section className="section-container py-12 lg:py-16">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Popular Offers of the Day</h2>
          </div>
          <Link to="/deals" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {MOCK_POPULAR_OFFERS.map((offer, i) => (
            <PopularOfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </section>

      {/* ── LATEST COUPONS ── */}
      <section id="coupons" className="section-container py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Verified & Working</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Latest Coupons</h2>
          </div>
          <Link to="/coupons" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {couponsLoading ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />) :
            latestCoupons?.map((coupon, i) => <CouponCard key={coupon.id} coupon={coupon} index={i} />)}
        </div>
      </section>

      {/* ── TOP STORES ── */}
      <section id="stores" className="theme-bg-secondary border-y theme-border-subtle py-12 lg:py-16 scroll-mt-24">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-5 h-5 text-brand-orange" />
                <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Partner Stores</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black theme-text">Top Stores</h2>
            </div>
            <Link to="/stores" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
              All Stores <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {storesLoading ? Array(8).fill(0).map((_, i) => <CardSkeleton key={i} />) :
              featuredStores?.slice(0, 8).map((store, i) => <StoreCard key={store.id} store={store} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHY GRABFREE ── */}
      <section className="section-container py-16 lg:py-20">
        <div className="text-center mb-10 lg:mb-12">
          <h2 className="text-2xl md:text-3xl font-black theme-text mb-3">Why Choose GrabFree?</h2>
          <p className="theme-text-secondary max-w-xl mx-auto">We verify every coupon before listing. No more fake codes or expired deals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🔒', title: 'Verified Coupons', desc: 'Every coupon is manually tested and verified by our team before going live.' },
            { icon: '⚡', title: 'Real-time Updates', desc: 'We update deals multiple times a day so you always get the freshest offers.' },
            { icon: '💰', title: 'Maximum Savings', desc: 'Stack coupons with bank offers and cashback for the highest possible savings.' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              className="glass-card p-8 text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-lg font-bold theme-text mb-2">{item.title}</h3>
              <p className="theme-text-secondary text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── BANK OFFERS ── */}
      <section id="bank-offers" className="section-container py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Extra Savings</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Bank & Wallet Offers</h2>
          </div>
          <Link to="/bank-offers" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {MOCK_BANK_OFFERS.map((offer, i) => (
            <CouponCard key={offer.id} coupon={offer as any} index={i} />
          ))}
        </div>
      </section>

      {/* ── BANK OFFERS ── */}
      <section id="bank-offers" className="section-container py-12 lg:py-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Extra Savings</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black theme-text">Bank & Wallet Offers</h2>
          </div>
          <Link to="/bank-offers" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {MOCK_BANK_OFFERS.slice(0, 4).map((offer, i) => (
            <CouponCard
              key={offer.id}
              coupon={{
                id: offer.id,
                coupon_code: offer.code || 'APPLY',
                title: `${offer.discount_value} ${offer.discount_type} on ${offer.bank_name}`,
                description: offer.terms?.[0] || `Max discount: ${offer.max_discount}`,
                store_id: offer.store_id,
                store: { ...offer.store, logo: offer.bank_logo, name: offer.bank_name }, // Show bank logo instead of store
                discount_value: offer.discount_value,
                type: offer.discount_type.toLowerCase().includes('cashback') ? 'deal' : 'code',
                category: 'Bank Offers',
                is_verified: true,
                is_exclusive: offer.isExclusive || false,
                click_count: Math.floor(Math.random() * 500) + 100,
                success_count: Math.floor(Math.random() * 400) + 50,
                expiry_date: offer.valid_till,
              } as any}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── LATEST BLOGS ── */}
      <section id="blogs" className="theme-bg-secondary border-y theme-border-subtle py-12 lg:py-16 scroll-mt-24">
        <div className="section-container">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-black theme-text">Shopping Tips & News</h2>
              <p className="theme-text-secondary text-sm mt-1">Expert advice to save more on every purchase</p>
            </div>
            <Link to="/blogs" className="flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:gap-2.5 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogsLoading ? Array(3).fill(0).map((_, i) => <CardSkeleton key={i} />) :
              latestBlogs?.map((blog, i) => <BlogCard key={blog.id} blog={blog} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
