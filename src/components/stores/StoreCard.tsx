import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import { type Store } from '@/types';

interface StoreCardProps {
  store: Store;
  index?: number;
}

export default function StoreCard({ store, index = 0 }: StoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
    >
      <Link
        to={`/stores/${store.slug}`}
        className="glass-card p-5 flex flex-col items-center text-center group block"
      >
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-2.5 mb-3 shadow-card group-hover:shadow-brand-sm transition-all duration-300">
          {store.logo ? (
            <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
          ) : (
            <Tag className="w-8 h-8 text-brand-orange" />
          )}
        </div>

        <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-brand-orange transition-colors">{store.name}</h3>

        <div className="flex items-center gap-3 mt-2">
          {store.coupon_count !== undefined && (
            <span className="text-xs text-slate-500">
              <span className="text-brand-orange font-semibold">{store.coupon_count}</span> coupons
            </span>
          )}
          {store.deal_count !== undefined && (
            <span className="text-xs text-slate-500">
              <span className="text-brand-orange font-semibold">{store.deal_count}</span> deals
            </span>
          )}
        </div>

        <div className="mt-3 flex items-center gap-1 text-xs text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
          View Offers <ArrowRight className="w-3 h-3" />
        </div>
      </Link>
    </motion.div>
  );
}
