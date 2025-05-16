
    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
    import Layout from '@/components/Layout';
    import { Toaster } from '@/components/ui/toaster';
    import { motion } from 'framer-motion';
    import { useLanguage } from '@/i18n';

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const AboutPage = lazy(() => import('@/pages/AboutPage'));
    const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
    const BlogPage = lazy(() => import('@/pages/BlogPage'));
    const ContactPage = lazy(() => import('@/pages/ContactPage'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

    const PageLoader = () => (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </div>
    );

    function App() {
      const { language } = useLanguage(); 

      return (
        <Router>
          <Layout>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} /> 
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout>
          <Toaster />
        </Router>
      );
    }

    export default App;
  