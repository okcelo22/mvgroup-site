
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { useLanguage } from '@/i18n';

    const HeroSection = () => {
      const { t } = useLanguage();

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
        <motion.section 
          className="relative text-center py-20 md:py-32 rounded-xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="absolute inset-0 -z-10">
            <img  className="object-cover w-full h-full opacity-30" alt="Abstract background representing innovation and growth" src="https://images.unsplash.com/photo-1664391111996-0a27daaa8a3b" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-white dark:from-gray-900/50 dark:to-gray-900"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-gray-800 dark:text-white"
              variants={fadeIn}
            >
              <span className="gradient-text">{t('homePage.hero_slogan').split(',')[0]}</span>, {t('homePage.hero_slogan').split(',')[1]} & <span className="gradient-text">{t('homePage.hero_slogan').split(',')[2]}</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10"
              variants={fadeIn}
            >
              {t('homePage.hero_desc')}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
              variants={staggerContainer}
            >
              <motion.div variants={fadeIn}>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Link to="/contact">{t('homePage.contact_us_btn')}</Link>
                </Button>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Button asChild variant="outline" size="lg" className="shadow-lg transform hover:scale-105 transition-transform duration-300 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800">
                  <Link to="/about">{t('homePage.discover_more_btn')}</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      );
    };
    export default HeroSection;
  