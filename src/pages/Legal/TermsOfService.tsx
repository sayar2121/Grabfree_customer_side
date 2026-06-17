import { motion, Variants } from 'framer-motion';
import { FileText } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-16 theme-bg">
      <div className="section-container max-w-4xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-orange/10 text-brand-orange mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black theme-text mb-4">Terms of Service</h1>
          <p className="text-lg theme-text-secondary">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="glass-card p-8 md:p-12 space-y-10"
        >
          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              By accessing and using GrabFree, you accept and agree to be bound by the terms and provisions of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">2</span>
              Description of Service
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              GrabFree provides users with access to a rich collection of resources, including various coupons, promo codes, deals, and shopping content. You understand and agree that the service may include advertisements and that these advertisements are necessary for GrabFree to provide the service.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">3</span>
              Coupon Validity and Accuracy
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              While we strive to keep all coupon codes and deals strictly updated, merchants may alter or cancel promotions without prior notice. GrabFree does not guarantee the success of any coupon code and cannot be held liable if a discount is not applied during your checkout process.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">4</span>
              User Conduct
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              You agree to use the service only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others, or otherwise cause damage to the site or its content.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">5</span>
              Modifications to Service
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              GrabFree reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that GrabFree shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
