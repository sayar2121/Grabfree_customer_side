import { motion } from 'framer-motion';
import { Tag, Shield, Zap, Heart } from 'lucide-react';
import { type Coupon } from '@/types';
import { useModalStore } from '@/store/modalStore';
import { useWishlistStore } from '@/store/wishlistStore';
import CountdownTimer from '@/components/ui/CountdownTimer';
import { cn } from '@/lib/utils';

interface CouponCardProps {
  coupon: Coupon;
  index?: number;
}

export default function CouponCard({ coupon, index = 0 }: CouponCardProps) {
  const { openModal } = useModalStore();
  const { addCoupon, removeItem, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(coupon.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    inWishlist ? removeItem(coupon.id) : addCoupon(coupon);
  };

  const successRate = coupon.click_count
    ? Math.round((coupon.success_count / coupon.click_count) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      className="glass-card overflow-hidden group cursor-pointer"
    >
      {/* Top Section */}
      <div className="p-4 border-b border-white/[0.05]">
        <div className="flex items-start gap-3">
          {/* Store Logo */}
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0">
            {coupon.store?.logo ? (
              <img src={coupon.store.logo} alt={coupon.store.name} className="w-full h-full object-contain" />
            ) : (
              <Tag className="w-6 h-6 text-brand-orange" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {coupon.is_exclusive && (
                <span className="badge badge-brand text-[10px] px-2 py-0.5">⚡ Exclusive</span>
              )}
              {coupon.is_verified && (
                <span className="badge badge-success text-[10px] px-2 py-0.5 flex items-center gap-0.5">
                  <Shield className="w-2.5 h-2.5" /> Verified
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{coupon.store?.name}</p>
            <h3 className="text-sm font-semibold text-white leading-tight mt-0.5 line-clamp-2">{coupon.title}</h3>
          </div>

          {/* Wishlist */}
          <button onClick={toggleWishlist} className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all">
            <Heart className={cn('w-4 h-4 transition-colors', inWishlist ? 'fill-red-500 text-red-500' : 'text-slate-500 hover:text-red-400')} />
          </button>
        </div>

        {/* Discount Badge */}
        {coupon.discount_value && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-card border border-brand-orange/20">
            <Zap className="w-3.5 h-3.5 text-brand-orange" />
            <span className="text-brand-orange font-bold text-sm">{coupon.discount_value} Off</span>
          </div>
        )}
      </div>

      {/* Code Section */}
      <div className="p-4" style={{ backgroundColor: 'var(--bg-subtle)' }}>
        {/* Masked Code */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 border border-dashed border-brand-orange/30 rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--code-box-bg)' }}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-brand-orange tracking-wider">
                {coupon.coupon_code ? `${coupon.coupon_code.slice(0, 4)}••••` : 'DEAL••••'}
              </span>
              <span className="text-xs text-slate-600">{coupon.coupon_code ? coupon.coupon_code.length : 0} chars</span>
            </div>
          </div>
          <button
            onClick={() => openModal(coupon)}
            className="btn-brand px-4 py-2 text-xs whitespace-nowrap"
          >
            <span>Get Code</span>
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between">
          <CountdownTimer expiryDate={coupon.expiry_date} compact />
          <span className="text-xs text-slate-500">
            <span className="text-green-400 font-semibold">{successRate}%</span> success
          </span>
        </div>
      </div>
    </motion.div>
  );
}
