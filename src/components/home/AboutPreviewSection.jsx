
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const AboutPreviewSection = () => {
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
          className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-6" variants={fadeIn}>
              {t('homePage.about_preview_title')}
            </motion.h2>
            <motion.p className="text-md md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8" variants={fadeIn}>
              {t('homePage.about_preview_text')}
            </motion.p>
            <motion.div variants={fadeIn}>
              <Button asChild variant="link" className="text-blue-600 dark:text-blue-400 hover:underline text-lg">
                <Link to="/about">{t('homePage.learn_more_about_us_link')} <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      );
    };
    export default AboutPreviewSection;
  