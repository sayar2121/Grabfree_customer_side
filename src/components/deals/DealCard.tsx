import { motion } from 'framer-motion';
import { ExternalLink, Heart, Clock, Tag, TrendingUp } from 'lucide-react';
import { type Deal } from '@/types';
import { useWishlistStore } from '@/store/wishlistStore';
import { formatPrice } from '@/lib/utils';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { cn } from '@/lib/utils';

interface DealCardProps {
  deal: Deal;
  index?: number;
}

export default function DealCard({ deal, index = 0 }: DealCardProps) {
  const { addDeal, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(deal.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    inWishlist ? removeItem(deal.id) : addDeal(deal);
  };

  const handleGetDeal = () => {
    window.open(deal.deal_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      className="glass-card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-32 sm:h-44">
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-gradient-brand text-white text-xs font-black px-2.5 py-1 rounded-lg shadow-brand-sm">
          {deal.discount_percent}% OFF
        </div>

        {/* Trending Badge */}
        {deal.is_trending && (
          <div className="absolute top-3 right-12 badge badge-violet text-[10px] flex items-center gap-1">
            <TrendingUp className="w-2.5 h-2.5" /> Hot
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-black/60"
        >
          <Heart className={cn('w-4 h-4 transition-colors', inWishlist ? 'fill-red-500 text-red-500' : 'text-white')} />
        </button>

        {/* Store Logo */}
        {deal.store?.logo && (
          <div className="absolute bottom-3 left-3 w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1">
            <img src={deal.store.logo} alt={deal.store.name} className="w-full h-full object-contain" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-slate-500 mb-1">{deal.store?.name}</p>
        <h3 className="text-sm font-semibold text-white leading-tight line-clamp-2 mb-3 group-hover:text-brand-orange transition-colors">
          {deal.title}
        </h3>

        {/* Price */}
        <div className="flex flex-wrap items-baseline gap-1.5 sm:gap-2 mb-3">
          <span className="text-base sm:text-lg font-black text-gradient">{formatPrice(deal.new_price)}</span>
          <span className="text-[11px] sm:text-sm text-slate-500 line-through">{formatPrice(deal.old_price)}</span>
          <span className="text-[10px] sm:text-xs text-green-500 font-semibold w-full sm:w-auto mt-0.5 sm:mt-0 sm:ml-auto">
            Save {formatPrice(deal.old_price - deal.new_price)}
          </span>
        </div>

        {/* Expiry */}
        <div className="mb-4">
          <CountdownTimer expiryDate={deal.expiry_date} compact />
        </div>

        {/* CTA */}
        <button
          onClick={handleGetDeal}
          className="btn-brand w-full py-2.5 text-sm flex items-center justify-center gap-2"
        >
          <span className="flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4" /> Get Deal
          </span>
        </button>
      </div>
    </motion.div>
  );
}
