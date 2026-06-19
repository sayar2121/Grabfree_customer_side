import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageSquare } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="section-container py-12">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black theme-text mb-3">Get in Touch</h1>
          <p className="theme-text-secondary">Have a question or want to partner with us? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h2 className="text-xl font-bold theme-text mb-6">Contact Information</h2>
              {[
                { icon: Mail, label: 'Email', value: 'hello@grabfree.in' },
                { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                { icon: MapPin, label: 'Address', value: 'Bengaluru, Karnataka, India' },
                { icon: MessageSquare, label: 'Response Time', value: 'Within 24 hours' },
              ].map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="flex items-start gap-4 p-4 glass-card mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs theme-text-muted mb-0.5">{label}</p>
                    <p className="text-sm font-semibold theme-text">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={itemVariants} className="glass-card p-8">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold theme-text mb-2">Message Sent!</h3>
                <p className="theme-text-secondary text-sm">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium theme-text-secondary mb-1.5">Name</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-theme w-full px-4 py-2.5 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium theme-text-secondary mb-1.5">Email</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input-theme w-full px-4 py-2.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-secondary mb-1.5">Subject</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="How can we help?"
                    className="input-theme w-full px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium theme-text-secondary mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more..."
                    className="input-theme w-full px-4 py-2.5 text-sm resize-none" />
                </div>
                <button type="submit" disabled={loading}
                  className="btn-brand w-full py-3 text-sm flex items-center justify-center gap-2 disabled:opacity-60">
                  <span className="flex items-center gap-2"><Send className="w-4 h-4" />{loading ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
