import { motion } from 'framer-motion';
import { CreditCard, Clock, Info, CheckCircle, ChevronRight } from 'lucide-react';
import { MOCK_BANK_OFFERS } from '@/services/mockData';
import { formatDate } from '@/lib/utils';

export default function BankOffersPage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-2">
          <CreditCard className="w-6 h-6 text-brand-orange" />
          <span className="text-xs font-semibold text-brand-orange uppercase tracking-wider">Exclusive</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Bank & Card Offers</h1>
        <p className="text-slate-400">Stack these bank offers with coupons for maximum savings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MOCK_BANK_OFFERS.map((offer, i) => (
          <motion.div key={offer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card overflow-hidden group">
            <div className="h-1 bg-gradient-brand" />
            <div className="p-6">
              {/* Bank Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white p-2.5 shrink-0">
                  {offer.bank_logo ? <img src={offer.bank_logo} alt={offer.bank_name} className="w-full h-full object-contain" /> :
                    <CreditCard className="w-8 h-8 text-brand-orange" />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{offer.bank_name}</h3>
                  <p className="text-sm text-slate-400">{offer.card_type}</p>
                </div>
                <div className="ml-auto text-right">
                  <span className="text-2xl font-black text-gradient">{offer.discount_value}</span>
                  <p className="text-xs text-slate-400">{offer.discount_type}</p>
                </div>
              </div>

              {/* Store */}
              {offer.store && (
                <div className="flex items-center gap-2 mb-4 p-3 theme-bg-subtle rounded-xl">
                  {offer.store.logo && <img src={offer.store.logo} alt={offer.store.name} className="w-8 h-8 rounded-lg bg-white p-1 object-contain" />}
                  <span className="text-sm theme-text-secondary">Valid on <span className="font-semibold theme-text">{offer.store.name}</span></span>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {offer.max_discount && (
                  <div className="p-2.5 theme-bg-subtle rounded-lg">
                    <p className="text-xs text-slate-500 mb-0.5">Max Discount</p>
                    <p className="text-sm font-bold text-green-400">{offer.max_discount}</p>
                  </div>
                )}
                {offer.min_transaction && (
                  <div className="p-2.5 theme-bg-subtle rounded-lg">
                    <p className="text-xs text-slate-500 mb-0.5">Min Transaction</p>
                    <p className="text-sm font-bold theme-text">{offer.min_transaction}</p>
                  </div>
                )}
              </div>

              {/* Validity */}
              <div className="flex items-center gap-2 text-xs text-yellow-400 mb-4">
                <Clock className="w-3.5 h-3.5" /> Valid till {formatDate(offer.valid_till)}
              </div>

              {/* Terms */}
              <div className="space-y-1.5">
                {offer.terms.map((term, j) => (
                  <div key={j} className="flex items-start gap-2 text-xs text-slate-400">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" /> {term}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
