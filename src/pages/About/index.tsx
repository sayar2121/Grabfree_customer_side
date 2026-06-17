import { motion } from 'framer-motion';
import { Tag, Users, Shield, TrendingUp, Star } from 'lucide-react';
import { STATS, APP_NAME } from '@/constants';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="hero-orb w-[400px] h-[400px] bg-brand-orange top-[-100px] left-[-100px]" />
        <div className="hero-orb w-[300px] h-[300px] bg-brand-violet bottom-0 right-0" />
        <div className="section-container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border theme-border-strong theme-bg-subtle text-sm text-brand-orange font-medium mb-6">
            <Tag className="w-4 h-4" /> About {APP_NAME}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mb-6">
            India's Most Trusted<br /><span className="text-gradient">Deals Platform</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto">
            GrabFree was founded with one mission: help every Indian shopper save money on every online purchase through verified coupons and exclusive deals.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="section-container pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="glass-card p-6 text-center">
              <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="theme-bg-secondary border-y theme-border-subtle py-20">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                We believe every Indian deserves to shop smart. GrabFree aggregates the best coupons, promo codes, and deals from 500+ top online stores — all verified by our dedicated team.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our platform saves Indians an average of ₹2,000 per month through strategic use of coupons, cashback offers, and bank deals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Shield, label: 'Verified Codes', desc: 'Every coupon is tested before listing' },
                { icon: TrendingUp, label: 'Daily Updates', desc: 'Fresh deals added multiple times daily' },
                { icon: Users, label: '2M+ Users', desc: 'Trusted by millions of smart shoppers' },
                { icon: Star, label: 'Top Rated', desc: '4.8★ rated by our users' },
              ].map(({ icon: Icon, label, desc }, i) => (
                <div key={i} className="glass-card p-4">
                  <Icon className="w-6 h-6 text-brand-orange mb-2" />
                  <h4 className="font-bold text-white text-sm mb-1">{label}</h4>
                  <p className="text-slate-500 text-xs">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container py-20 text-center">
        <h2 className="text-3xl font-black text-white mb-4">Start Saving Today</h2>
        <p className="text-slate-400 mb-8">Join 2 million+ smart shoppers already saving with GrabFree.</p>
        <Link to="/" className="btn-brand px-8 py-4 text-base inline-block"><span>Browse Deals</span></Link>
      </section>
    </div>
  );
}
