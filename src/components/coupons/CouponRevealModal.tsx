import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, ExternalLink, Tag, AlertCircle, ThumbsUp, ThumbsDown, Share2 } from 'lucide-react';
import { useModalStore } from '@/store/modalStore';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import CountdownTimer from '@/components/ui/CountdownTimer';

export default function CouponRevealModal() {
  const { isOpen, activeCoupon, closeModal } = useModalStore();
  const { copied, copy } = useCopyToClipboard();

  if (!activeCoupon) return null;

  const successRate = activeCoupon.click_count
    ? Math.round((activeCoupon.success_count / activeCoupon.click_count) * 100)
    : 0;

  const handleCopy = () => {
    copy(activeCoupon.coupon_code);
  };

  const handleGoToStore = () => {
    if (activeCoupon.store?.affiliate_url) {
      window.open(activeCoupon.store.affiliate_url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md border theme-border-strong rounded-2xl overflow-hidden shadow-2xl"
            style={{ backgroundColor: 'var(--modal-bg)' }}
          >
            {/* Header gradient */}
            <div className="h-1 bg-gradient-brand" />

            {/* Close */}
            <button onClick={closeModal} className="absolute top-4 right-4 w-8 h-8 rounded-lg icon-btn-theme flex items-center justify-center z-10">
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              {/* Store info */}
              <div className="flex items-center gap-3 mb-5">
                {activeCoupon.store?.logo ? (
                  <img src={activeCoupon.store.logo} alt={activeCoupon.store.name} className="w-12 h-12 rounded-xl object-contain bg-white p-1.5" />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">{activeCoupon.store?.name}</p>
                  <h3 className="font-bold text-white text-base leading-tight">{activeCoupon.title}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">{activeCoupon.description}</p>

              {/* Expiry */}
              <div className="mb-5">
                <CountdownTimer expiryDate={activeCoupon.expiry_date} />
              </div>

              {/* Coupon Code Box */}
              <div className="coupon-divider relative border border-dashed border-brand-orange/40 rounded-xl p-4 mb-5" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Coupon Code</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl font-black text-brand-orange tracking-wider font-mono">
                      {activeCoupon.coupon_code}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        copied
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-brand-orange/15 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange/25'
                      }`}
                    >
                      {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                  {activeCoupon.min_purchase && (
                    <p className="text-xs text-slate-500 mt-2">Min. purchase: ₹{activeCoupon.min_purchase.toLocaleString()}</p>
                  )}
                </div>
              </div>

              {/* Success Rate */}
                <div className="flex items-center gap-4 mb-5 p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-subtle)' }}>
                <div className="flex items-center gap-1.5 text-xs text-green-400">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{activeCoupon.success_count} worked</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>{activeCoupon.failure_count} didn't</span>
                </div>
                <div className="ml-auto text-xs text-slate-400">
                  <span className="text-green-400 font-semibold">{successRate}%</span> success rate
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={handleGoToStore}
                className="btn-brand w-full py-3 flex items-center justify-center gap-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Go to {activeCoupon.store?.name}
                </span>
              </button>

              <div className="flex items-center gap-2 mt-3">
                <AlertCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <p className="text-xs text-slate-600">Copy the code before visiting the store. Apply at checkout.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
