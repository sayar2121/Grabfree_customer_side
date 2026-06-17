import { motion, Variants } from 'framer-motion';
import { Cookie } from 'lucide-react';

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

export default function CookiePolicy() {
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
            <Cookie className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black theme-text mb-4">Cookie Policy</h1>
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
              What Are Cookies
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows GrabFree or a third party to recognize you and make your next visit easier and our service more useful to you.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">2</span>
              How GrabFree Uses Cookies
            </h2>
            <p className="theme-text-secondary leading-relaxed mb-4">
              When you use and access our service, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 theme-text-secondary space-y-2">
              <li>To enable certain functions of the website, such as remembering your theme preference (Dark/Light mode).</li>
              <li>To provide analytics and understand how users interact with our deals.</li>
              <li>To store your preferences, such as your favorite stores or saved coupons.</li>
              <li>To track affiliate links to ensure you get the best discounts and we get credited by our partner stores.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">3</span>
              Third-Party Cookies
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. These third parties include Google Analytics and our affiliate network partners.
            </p>
          </motion.section>

          <motion.section variants={itemVariants}>
            <h2 className="text-2xl font-bold theme-text mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center text-sm">4</span>
              What Are Your Choices Regarding Cookies
            </h2>
            <p className="theme-text-secondary leading-relaxed">
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
