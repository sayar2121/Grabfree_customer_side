import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, MessageCircle, Globe, Share2, AtSign } from 'lucide-react';
import { APP_NAME, FOOTER_LINKS } from '@/constants';
import { newsletterService } from '@/services/newsletterService';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await newsletterService.subscribe(email);
      if (res.success) { setStatus('success'); setMessage(res.message); setEmail(''); }
      else { setStatus('error'); setMessage(res.message); }
    } catch {
      setStatus('error'); setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="theme-bg-footer border-t theme-border-subtle mt-16">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-brand-orange/10 via-brand-red/5 to-brand-violet/10 border-b border-white/[0.06]">
        <div className="section-container py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Get Exclusive Deals in Your Inbox 🎉
              </h3>
              <p className="text-slate-400 text-sm">Join 200,000+ smart shoppers who save big with GrabFree.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-orange/50 transition-all bg-white/[0.1] border border-white/[0.15]"
                />
              </div>
              <button
                type="submit" disabled={status === 'loading'}
                className="btn-brand px-6 py-3 text-sm whitespace-nowrap disabled:opacity-60"
              >
                <span className="flex items-center gap-2">
                  {status === 'loading' ? 'Subscribing...' : <><Send className="w-4 h-4" /> Subscribe</>}
                </span>
              </button>
            </form>
          </div>
          {status !== 'idle' && status !== 'loading' && (
            <div className={`mt-4 flex items-center gap-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {status === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
              {message}
            </div>
          )}
        </div>
      </div>

      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6 inline-block">
              <img src="/Dark%20Mode%20Logo_NOBG.png" alt={APP_NAME} className="w-56 lg:w-64 h-auto object-contain dark:block hidden" />
              <img src="/Light%20Mode%20Logo_NOBG.png" alt={APP_NAME} className="w-56 lg:w-64 h-auto object-contain dark:hidden block" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most trusted coupon and deal aggregation platform. Save money on every purchase with verified promo codes.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: AtSign, url: 'https://twitter.com' },
                { icon: MessageCircle, url: 'https://instagram.com' },
                { icon: Globe, url: 'https://facebook.com' },
                { icon: Send, url: 'https://t.me' },
              ].map(({ icon: Icon, url }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-orange/40 hover:bg-brand-orange/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 text-sm hover:text-brand-orange transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.quick.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 text-sm hover:text-brand-orange transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" /> hello@grabfree.in
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" /> +91 98765 43210
              </li>
              <li className="flex items-start gap-2.5 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-brand-orange shrink-0" /> Bengaluru, Karnataka, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.legal.map((link) => (
              <Link key={link.path} to={link.path} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
