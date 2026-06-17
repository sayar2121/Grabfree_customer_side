import { motion, Variants } from 'framer-motion';
import { Briefcase, ArrowRight, Star, Heart, Zap, Coffee } from 'lucide-react';
import { APP_NAME } from '@/constants';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const PERKS = [
  { icon: Heart, title: 'Health Insurance', desc: 'Comprehensive medical coverage for you and your family.' },
  { icon: Zap, title: 'Flexible Hours', desc: 'Work-life balance is a priority. Choose hours that suit you.' },
  { icon: Coffee, title: 'Remote First', desc: 'Work from anywhere in India, or join us in our Bengaluru HQ.' },
  { icon: Star, title: 'Learning Budget', desc: 'Annual stipend for courses, books, and conferences.' },
];

const POSITIONS = [
  { role: 'Senior Frontend Engineer', type: 'Full-time', location: 'Remote / Bengaluru' },
  { role: 'Product Manager', type: 'Full-time', location: 'Bengaluru' },
  { role: 'Performance Marketer', type: 'Full-time', location: 'Remote' },
  { role: 'UI/UX Designer', type: 'Full-time', location: 'Bengaluru' },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 theme-bg">
      <div className="section-container max-w-5xl">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange mb-6">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black theme-text mb-4">Join Our Team</h1>
          <p className="text-lg theme-text-secondary max-w-2xl mx-auto">
            Help us build the ultimate savings platform for millions of Indians. At {APP_NAME}, we're always looking for passionate individuals to join our mission.
          </p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-16">
          
          {/* Perks */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-8 text-center">Why Work With Us?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERKS.map((perk, i) => (
                <div key={i} className="glass-card p-6 text-center hover:border-brand-orange/40 transition-colors">
                  <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <perk.icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <h3 className="font-bold theme-text mb-2">{perk.title}</h3>
                  <p className="text-sm theme-text-secondary">{perk.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Open Positions */}
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-8 text-center">Open Positions</h2>
            <div className="grid gap-4 max-w-3xl mx-auto">
              {POSITIONS.map((pos, i) => (
                <a key={i} href="#apply" className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between group hover:bg-white/[0.02] transition-colors">
                  <div>
                    <h3 className="font-bold theme-text text-lg mb-1 group-hover:text-brand-orange transition-colors">{pos.role}</h3>
                    <div className="flex items-center gap-3 text-sm theme-text-secondary">
                      <span>{pos.type}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span>{pos.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center gap-2 text-brand-orange font-medium text-sm">
                    Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
