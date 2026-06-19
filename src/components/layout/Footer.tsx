import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Headphones } from 'lucide-react';
import { FaWhatsapp, FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaPinterestP, FaTelegram } from 'react-icons/fa6';
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
    <footer className="theme-bg-footer border-t theme-border-subtle mt-8">
      {/* Newsletter Banner */}
      <div className="bg-gradient-to-r from-brand-orange/10 via-brand-red/5 to-brand-violet/10 border-b border-white/[0.06]">
        <div className="section-container py-8">
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

      <div className="section-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Brand & Socials */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="flex items-center mb-4 inline-block">
              <img src="/Dark%20Mode%20Logo_NOBG.png" alt={APP_NAME} className="w-40 lg:w-48 h-auto object-contain dark:block hidden" />
              <img src="/Light%20Mode%20Logo_NOBG.png" alt={APP_NAME} className="w-40 lg:w-48 h-auto object-contain dark:hidden block" />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-[250px]">
              Striving towards making the world a better place to shop with great savings!
            </p>
            
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: FaWhatsapp, url: '#', bg: 'bg-[#25D366]' },
                { icon: FaFacebookF, url: '#', bg: 'bg-[#1877F2]' },
                { icon: FaXTwitter, url: '#', bg: 'bg-black text-white' },
                { icon: FaLinkedinIn, url: '#', bg: 'bg-[#0A66C2]' },
                { icon: FaInstagram, url: '#', bg: 'bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]' },
                { icon: FaYoutube, url: '#', bg: 'bg-[#FF0000]' },
                { icon: FaPinterestP, url: '#', bg: 'bg-[#E60023]' },
                { icon: FaTelegram, url: '#', bg: 'bg-[#229ED9]' },
              ].map(({ icon: Icon, url, bg }, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity ${bg}`}>
                  <Icon className="w-4 h-4" strokeWidth={2} />
                </a>
              ))}
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-[250px]">
              We may earn a commission if you buy through links on GrabFree. For more details refer to our <Link to="/terms" className="text-brand-orange hover:underline">terms of use</Link>.
            </p>
          </div>

          {/* Speciality Pages */}
          <div className="lg:ml-8">
            <h4 className="text-brand-orange text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-brand-orange"></span>
              Speciality Pages
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.speciality.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-300 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Offers */}
          <div>
            <h4 className="text-brand-orange text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-brand-orange"></span>
              Offers
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.offers.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-300 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-brand-orange text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-brand-orange"></span>
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-300 text-sm hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-brand-orange text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="w-4 h-[1px] bg-brand-orange"></span>
              Contact Us
            </h4>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" /> contact@grabfree.in
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" /> +91-9945129062
              </li>
              <li className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                <MapPin className="w-4 h-4 mt-0.5 text-slate-400 shrink-0" /> 
                <span>GrabFree<br/>1st Cross Street, Near Bright Way School, Bellandur</span>
              </li>
            </ul>
            <a href="mailto:contact@grabfree.in" className="inline-flex items-center gap-2 bg-[#4279D1] hover:bg-[#3462a8] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-colors">
              <Headphones className="w-4 h-4" /> Contact Us
            </a>
          </div>
        </div>

        {/* Bottom Hash Banner & Copyright */}
        <div className="mt-6 pt-6 border-t border-dashed border-slate-700/50 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">#GrabMorePayLess</h2>
          <p className="text-slate-300 text-sm md:text-base mb-8">We Help You Save On Everything</p>
          
          <p className="text-slate-500 text-xs text-center max-w-2xl mx-auto">
            © Copyright {new Date().getFullYear()} Grabfree. All Rights Reserved. Designed With Care By Grabfree Team.
          </p>
        </div>
      </div>
    </footer>
  );
}
