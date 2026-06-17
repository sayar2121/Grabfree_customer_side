import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ExternalLink, Tag, ArrowLeft, Globe, ChevronRight } from 'lucide-react';
import { useStoreBySlug } from '@/hooks/useStores';
import { useCoupons } from '@/hooks/useCoupons';
import { useDeals } from '@/hooks/useDeals';
import CouponCard from '@/components/coupons/CouponCard';
import DealCard from '@/components/deals/DealCard';

const TABS = ['Coupons', 'Deals', 'About'];

export default function StoreDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState('Coupons');
  const { data: store, isLoading: storeLoading } = useStoreBySlug(slug!);
  const { data: couponsData } = useCoupons({ store_id: store?.id });
  const { data: dealsData } = useDeals({ store_id: store?.id });

  if (storeLoading) return (
    <div className="section-container py-12 animate-pulse space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-32 w-full rounded-2xl" />
    </div>
  );

  if (!store) return (
    <div className="section-container py-20 text-center">
      <p className="text-5xl mb-4">🏪</p>
      <h2 className="text-xl font-bold text-white mb-2">Store Not Found</h2>
      <Link to="/stores" className="text-brand-orange text-sm hover:underline">Browse all stores</Link>
    </div>
  );

  return (
    <div className="section-container py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-8">
        <Link to="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/stores" className="hover:text-brand-orange transition-colors">Stores</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-300">{store.name}</span>
      </div>

      {/* Store Header */}
      <div className="glass-card p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white p-3 shrink-0 shadow-card">
            {store.logo ? <img src={store.logo} alt={store.name} className="w-full h-full object-contain" /> :
              <Tag className="w-10 h-10 text-brand-orange" />}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{store.name}</h1>
            <p className="text-slate-400 text-sm mb-4 max-w-xl">{store.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="badge badge-brand">{store.coupon_count} Coupons</span>
              <span className="badge badge-violet">{store.deal_count} Deals</span>
              <span className="badge badge-success">Active</span>
            </div>
          </div>
          <a href={store.affiliate_url} target="_blank" rel="noopener noreferrer"
            className="btn-brand px-6 py-3 text-sm flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-2"><Globe className="w-4 h-4" /> Visit Store</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex tab-border mb-8 gap-1">
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-semibold border-b-2 transition-all -mb-px ${
              activeTab === tab ? 'border-brand-orange text-brand-orange' : 'border-transparent theme-text-muted hover:theme-text'}`}>
            {tab}
            {tab === 'Coupons' && couponsData?.data.length ? ` (${couponsData.data.length})` : ''}
            {tab === 'Deals' && dealsData?.data.length ? ` (${dealsData.data.length})` : ''}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'Coupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {couponsData?.data.map((coupon, i) => <CouponCard key={coupon.id} coupon={coupon} index={i} />)}
        </div>
      )}
      {activeTab === 'Deals' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dealsData?.data.map((deal, i) => <DealCard key={deal.id} deal={deal} index={i} />)}
        </div>
      )}
      {activeTab === 'About' && (
        <div className="glass-card p-8 max-w-2xl">
          <h3 className="font-bold text-white text-lg mb-4">About {store.name}</h3>
          <p className="text-slate-400 leading-relaxed">{store.description}</p>
          <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
            <Globe className="w-4 h-4 text-brand-orange" />
            <a href={store.website_url} target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">{store.website_url}</a>
          </div>
        </div>
      )}
    </div>
  );
}
