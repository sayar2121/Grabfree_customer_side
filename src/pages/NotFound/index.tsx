import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center section-container">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        {/* 404 */}
        <div className="text-[120px] md:text-[180px] font-black leading-none mb-4"
          style={{ background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,59,107,0.1) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          404
        </div>
        <div className="text-6xl mb-6">😕</div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-10 max-w-md mx-auto">
          Oops! The page you're looking for has either been moved, deleted, or doesn't exist. But don't worry — there are plenty of deals to explore!
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="btn-brand px-8 py-3 text-sm flex items-center gap-2">
            <span className="flex items-center gap-2"><Home className="w-4 h-4" /> Back to Home</span>
          </Link>
          <Link to="/" className="btn-ghost px-8 py-3 text-sm flex items-center gap-2">
            <Search className="w-4 h-4" /> Browse Deals
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
