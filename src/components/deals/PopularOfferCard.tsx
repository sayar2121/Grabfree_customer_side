import { motion } from 'framer-motion';

interface PopularOffer {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  storeLogo: string;
  storeName: string;
  color: string;
}

interface PopularOfferCardProps {
  offer: PopularOffer;
  index?: number;
}

export default function PopularOfferCard({ offer, index = 0 }: PopularOfferCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="popular-offer-card rounded-2xl border theme-border-subtle cursor-pointer"
      style={{ backgroundColor: 'var(--bg-card)' }}
    >

      {/* ── Image — shrinks on hover ── */}
      <div className="popular-offer-img relative w-full overflow-hidden rounded-t-2xl">
        <img
          src={offer.coverImage}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* ── Content ── */}
      <div className="px-3 sm:px-5 pt-8 sm:pt-10 pb-4 sm:pb-5 relative" style={{ backgroundColor: 'var(--bg-card)' }}>

        {/* Store Logo: absolutely positioned to float perfectly on the boundary */}
        <div
          className="absolute left-3 sm:left-5 -top-6 sm:-top-8 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center p-1.5 sm:p-2 shadow-md bg-white"
        >
          <img src={offer.storeLogo} alt={offer.storeName} className="w-full h-full object-contain" />
        </div>

        {/* Title & Description */}
        <h3 className="text-[13px] sm:text-lg font-bold mb-1 sm:mb-1.5 line-clamp-1" style={{ color: offer.color }}>
          {offer.title}
        </h3>
        <p className="theme-text-secondary text-[11px] sm:text-sm leading-relaxed line-clamp-2">
          {offer.description}
        </p>

        {/* REDEEM NOW — expands smoothly on hover */}
        <div className="popular-offer-btn-wrap">
          <div className="overflow-hidden">
            <div className="border-t border-dashed theme-border-subtle pt-3 sm:pt-4 mt-3 sm:mt-4">
              <button
                className="w-full py-2 sm:py-2.5 text-white text-xs sm:text-sm font-bold rounded-lg hover:opacity-90 active:scale-95 transition-opacity shadow-md"
                style={{ backgroundColor: offer.color }}
              >
                REDEEM NOW
              </button>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
