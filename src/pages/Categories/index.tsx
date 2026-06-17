import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MOCK_CATEGORIES } from '@/services/mockData';

export default function CategoriesPage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">All Categories</h1>
        <p className="text-slate-400">Browse deals and coupons by your favourite category</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {MOCK_CATEGORIES.map((cat, i) => (
          <motion.div key={cat.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>
            <Link to={`/categories/${cat.slug}`} className="glass-card p-6 flex flex-col items-center text-center group">
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
              <h3 className="text-sm font-bold text-white mb-1 group-hover:text-brand-orange transition-colors">{cat.name}</h3>
              <span className="text-xs text-slate-500">{cat.count} deals</span>
              <div className="w-8 h-1 rounded-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: cat.color }} />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
