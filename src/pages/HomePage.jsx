
    import React from 'react';
    import { motion } from 'framer-motion';
    import HeroSection from '@/components/home/HeroSection';
    import AboutPreviewSection from '@/components/home/AboutPreviewSection';
    import ServicesHighlightSection from '@/components/home/ServicesHighlightSection';
    import WhyPartnerSection from '@/components/home/WhyPartnerSection';
    import ContactCtaSection from '@/components/home/ContactCtaSection';
    import TestimonialsSection from '@/components/home/TestimonialsSection'; 
    import StatsSection from '@/components/home/StatsSection';

    const HomePage = () => {
      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };
      
      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2
          }
        }
      };

      return (
        <div className="space-y-16 md:space-y-24">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeIn}><HeroSection /></motion.div>
            <motion.div variants={fadeIn}><AboutPreviewSection /></motion.div>
            <motion.div variants={fadeIn}><ServicesHighlightSection displayAll={false} /></motion.div>
            <motion.div variants={fadeIn}><StatsSection /></motion.div>
            <motion.div variants={fadeIn}><WhyPartnerSection /></motion.div>
            <motion.div variants={fadeIn}><TestimonialsSection /></motion.div>
            <motion.div variants={fadeIn}><ContactCtaSection /></motion.div>
          </motion.div>
        </div>
      );
    };

    export default HomePage;
  