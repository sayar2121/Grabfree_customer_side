import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import CouponRevealModal from '@/components/coupons/CouponRevealModal';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only force scroll to top if there is no specific section hash being targeted.
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col theme-bg-primary">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CouponRevealModal />
    </div>
  );
}

