import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

type Tab = 'overview' | 'stores' | 'categories' | 'coupons' | 'submissions';

export default function Profile() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'stores', label: 'Stores' },
    { id: 'categories', label: 'Categories' },
    { id: 'coupons', label: 'Saved Coupons' },
    { id: 'submissions', label: 'Coupon Submissions' },
  ];

  const renderOverview = () => (
    <div className="space-y-12">
      
      {/* Saved Coupons Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold theme-text text-brand-orange">Saved Coupons (0)</h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1">
              <div className="w-4 h-1 rounded-full bg-brand-orange"></div>
              <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            </div>
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-32 border border-dashed theme-border-strong rounded-2xl flex items-center justify-center theme-bg-subtle">
          <p className="theme-text-secondary text-sm">No saved coupons yet.</p>
        </div>
      </section>

      {/* Saved Stores Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold theme-text text-brand-orange">Saved Stores (0)</h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <button className="w-64 h-32 border border-dashed theme-border-strong rounded-2xl flex items-center justify-center gap-2 theme-text-secondary hover:text-brand-orange hover:border-brand-orange transition-all theme-bg-subtle hover:bg-brand-orange/5 group">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Store</span>
        </button>
      </section>

      {/* Following Categories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold theme-text text-brand-orange">Following Categories (0)</h2>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 rounded-full border theme-border-subtle flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors opacity-50 cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="h-32 border border-dashed theme-border-strong rounded-2xl flex items-center justify-center theme-bg-subtle">
          <p className="theme-text-secondary text-sm">No categories followed yet.</p>
        </div>
      </section>

    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          
          <div className="relative shrink-0">
            <img 
              src="https://i.pravatar.cc/150?img=11" 
              alt="User" 
              className="w-24 h-24 rounded-2xl object-cover shadow-lg border-2 border-white dark:border-slate-800"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-800 shadow-sm cursor-pointer hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 w-full text-center md:text-left flex flex-col items-center md:items-start">
            
            <div className="w-full flex flex-col md:flex-row md:justify-between items-center md:items-start gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold theme-text">
                Welcome, Demo
              </h1>
              <button 
                onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border theme-border-strong theme-text-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/30 transition-all font-medium text-sm"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            <div className="flex items-center gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-xl font-bold text-brand-orange mb-1">0</div>
                <div className="text-xs font-medium theme-text-secondary uppercase tracking-wider">Stores Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-orange mb-1">0</div>
                <div className="text-xs font-medium theme-text-secondary uppercase tracking-wider">Categories Following</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-brand-orange mb-1">0</div>
                <div className="text-xs font-medium theme-text-secondary uppercase tracking-wider">Coupons Saved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-wrap gap-3 mb-10 pb-4 border-b theme-border-subtle overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-brand text-white shadow-brand-sm'
                  : 'bg-transparent border theme-border-strong theme-text-secondary hover:theme-text hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' ? (
                renderOverview()
              ) : (
                <div className="h-64 border border-dashed theme-border-strong rounded-2xl flex items-center justify-center theme-bg-subtle">
                  <p className="theme-text-secondary text-sm">
                    {tabs.find(t => t.id === activeTab)?.label} content will appear here.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
