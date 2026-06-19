import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageLoader from '@/components/ui/PageLoader';

// Lazy-loaded pages
const HomePage = lazy(() => import('@/pages/Home'));
const StoresPage = lazy(() => import('@/pages/Stores'));
const StoreDetailsPage = lazy(() => import('@/pages/StoreDetails'));
const CouponsPage = lazy(() => import('@/pages/Coupons'));
const DealsPage = lazy(() => import('@/pages/Deals'));
const CategoriesPage = lazy(() => import('@/pages/Categories'));
const BlogsPage = lazy(() => import('@/pages/Blogs'));
const BlogDetailsPage = lazy(() => import('@/pages/BlogDetails'));
const SearchPage = lazy(() => import('@/pages/Search'));
const BankOffersPage = lazy(() => import('@/pages/BankOffers'));
const AboutPage = lazy(() => import('@/pages/About'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const CareersPage = lazy(() => import('@/pages/Careers'));
const SubmitCouponPage = lazy(() => import('@/pages/SubmitCoupon'));
const ProfilePage = lazy(() => import('@/pages/Profile'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

// Legal Pages
const PrivacyPolicyPage = lazy(() => import('@/pages/Legal/PrivacyPolicy'));
const TermsOfServicePage = lazy(() => import('@/pages/Legal/TermsOfService'));
const CookiePolicyPage = lazy(() => import('@/pages/Legal/CookiePolicy'));

// No inline PageLoader here anymore, using the imported one.

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Suspense fallback={<PageLoader />}><HomePage /></Suspense> },
      { path: 'stores', element: <Suspense fallback={<PageLoader />}><StoresPage /></Suspense> },
      { path: 'stores/:slug', element: <Suspense fallback={<PageLoader />}><StoreDetailsPage /></Suspense> },
      { path: 'coupons', element: <Suspense fallback={<PageLoader />}><CouponsPage /></Suspense> },
      { path: 'deals', element: <Suspense fallback={<PageLoader />}><DealsPage /></Suspense> },
      { path: 'categories', element: <Suspense fallback={<PageLoader />}><CategoriesPage /></Suspense> },
      { path: 'categories/:slug', element: <Suspense fallback={<PageLoader />}><CouponsPage /></Suspense> },
      { path: 'blogs', element: <Suspense fallback={<PageLoader />}><BlogsPage /></Suspense> },
      { path: 'blogs/:slug', element: <Suspense fallback={<PageLoader />}><BlogDetailsPage /></Suspense> },
      { path: 'search', element: <Suspense fallback={<PageLoader />}><SearchPage /></Suspense> },
      { path: 'bank-offers', element: <Suspense fallback={<PageLoader />}><BankOffersPage /></Suspense> },
      { path: 'about', element: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense> },
      { path: 'careers', element: <Suspense fallback={<PageLoader />}><CareersPage /></Suspense> },
      { path: 'submit', element: <Suspense fallback={<PageLoader />}><SubmitCouponPage /></Suspense> },
      { path: 'profile', element: <Suspense fallback={<PageLoader />}><ProfilePage /></Suspense> },
      
      // Legal routes
      { path: 'privacy', element: <Suspense fallback={<PageLoader />}><PrivacyPolicyPage /></Suspense> },
      { path: 'terms', element: <Suspense fallback={<PageLoader />}><TermsOfServicePage /></Suspense> },
      { path: 'cookies', element: <Suspense fallback={<PageLoader />}><CookiePolicyPage /></Suspense> },

      { path: '*', element: <Suspense fallback={<PageLoader />}><NotFoundPage /></Suspense> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
