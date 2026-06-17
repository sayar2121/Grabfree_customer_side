import { motion, Variants } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

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

export default function PrivacyPolicy() {
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
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black theme-text mb-4">Privacy Policy</h1>
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
              Information We Collect
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              When you use GrabFree, we may collect personal information that you provide to us directly, such as your name, email address, and account preferences. We also automatically collect certain information about your device and usage patterns to improve our services and offer you better deals.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">2</span>
              How We Use Your Information
            </h2>
            <p className="theme-text-secondary leading-relaxed mb-4">
              The information we collect is used in various ways to enhance your experience:
            </p>
            <ul className="list-disc pl-6 theme-text-secondary space-y-2">
              <li>To provide, operate, and maintain our website.</li>
              <li>To personalize and expand our coupon offerings.</li>
              <li>To understand and analyze how you use GrabFree.</li>
              <li>To communicate with you regarding updates, offers, and support.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">3</span>
              Data Security
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">4</span>
              Third-Party Links
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              Our website contains links to affiliate stores (like Amazon, Flipkart, etc.). These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">5</span>
              Contact Us
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              If you have any questions regarding this Privacy Policy, you may contact us using the information on our Contact page. We are committed to resolving any privacy concerns swiftly and transparently.
            </p>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
