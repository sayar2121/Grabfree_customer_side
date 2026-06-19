import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Tag, Link as LinkIcon, FileText, Calendar, CheckCircle2, ArrowRight, ShieldCheck, TicketPercent } from 'lucide-react';
import { APP_NAME } from '@/constants';
import { Link } from 'react-router-dom';

export default function SubmitCoupon() {
  const [formData, setFormData] = useState({
    storeName: '',
    offerType: 'coupon', // 'coupon' | 'deal'
    codeOrUrl: '',
    title: '',
    description: '',
    expiryDate: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Mock API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        storeName: '',
        offerType: 'coupon',
        codeOrUrl: '',
        title: '',
        description: '',
        expiryDate: '',
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen py-10 lg:py-16">
      <div className="section-container max-w-4xl">
        
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-orange/10 text-brand-orange text-sm font-semibold mb-4"
          >
            <TicketPercent className="w-4 h-4" /> Share & Save
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-5xl font-black mb-4"
          >
            Submit a <span className="text-gradient">Coupon</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Help the {APP_NAME} community save more. Found a great deal or coupon code? Share it below and help thousands of shoppers!
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 glass-card p-6 md:p-8"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You for Sharing!</h3>
                  <p className="text-slate-400 mb-8 max-w-md">
                    Your submission has been received. Our team will verify it shortly before making it live on {APP_NAME}.
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setStatus('idle')}
                      className="btn-ghost"
                    >
                      Submit Another
                    </button>
                    <Link to="/" className="btn-brand">
                      <span>Back to Home <ArrowRight className="w-4 h-4" /></span>
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Store Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium theme-text flex items-center gap-2">
                        <Store className="w-4 h-4 text-brand-orange" /> Store Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        name="storeName"
                        required
                        value={formData.storeName}
                        onChange={handleChange}
                        placeholder="e.g. Amazon, Myntra"
                        className="w-full input-theme px-4 py-3"
                      />
                    </div>

                    {/* Offer Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium theme-text flex items-center gap-2">
                        <Tag className="w-4 h-4 text-brand-orange" /> Offer Type <span className="text-brand-red">*</span>
                      </label>
                      <select
                        name="offerType"
                        value={formData.offerType}
                        onChange={handleChange}
                        className="w-full select-theme px-4 py-3"
                      >
                        <option value="coupon">Coupon Code</option>
                        <option value="deal">Deal / Offer Link</option>
                      </select>
                    </div>
                  </div>

                  {/* Code or URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium theme-text flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-brand-orange" /> 
                      {formData.offerType === 'coupon' ? 'Coupon Code' : 'Deal URL'} <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="codeOrUrl"
                      required
                      value={formData.codeOrUrl}
                      onChange={handleChange}
                      placeholder={formData.offerType === 'coupon' ? 'e.g. SAVE50' : 'https://...'}
                      className="w-full input-theme px-4 py-3 font-mono"
                    />
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium theme-text flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-orange" /> Offer Title <span className="text-brand-red">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Flat 50% OFF on Electronics"
                      className="w-full input-theme px-4 py-3"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium theme-text flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-orange" /> Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Any specific details, minimum purchase amount, etc."
                      className="w-full input-theme px-4 py-3 resize-none"
                    ></textarea>
                  </div>

                  {/* Expiry Date */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium theme-text flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-orange" /> Expiry Date
                    </label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="w-full input-theme px-4 py-3 color-scheme-dark"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-brand py-3.5 text-lg"
                  >
                    <span>{status === 'submitting' ? 'Submitting...' : 'Submit Coupon'}</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar Guidelines */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-card p-6 bg-brand-orange/5 border-brand-orange/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-orange/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-brand-orange" />
                </div>
                <h3 className="font-bold text-lg">Submission Guidelines</h3>
              </div>
              <ul className="space-y-3 text-sm theme-text-secondary">
                <li className="flex gap-2">
                  <span className="text-brand-orange">•</span> Verify the coupon code works before submitting.
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-orange">•</span> Include clear titles (e.g. "20% OFF", not just "Discount").
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-orange">•</span> Mention any minimum purchase requirements in the description.
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-orange">•</span> Avoid submitting referral links or personal affiliate codes.
                </li>
              </ul>
            </div>

            <div className="glass-card p-6">
              <h3 className="font-bold mb-2">What happens next?</h3>
              <p className="text-sm theme-text-secondary leading-relaxed mb-4">
                Our moderation team reviews all submitted coupons to ensure quality and validity. Approved coupons usually go live within 2-4 hours.
              </p>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-orange w-1/3 rounded-full"></div>
              </div>
              <div className="flex justify-between text-xs mt-2 text-slate-500 font-medium">
                <span>Submit</span>
                <span>Review</span>
                <span>Live</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
