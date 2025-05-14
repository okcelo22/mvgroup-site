
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, BarChart, CheckCircle } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const WhyPartnerSection = () => {
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
          className="py-12 md:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12" variants={fadeIn}>
              {t('homePage.why_partner_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div variants={fadeIn} className="p-6">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('homePage.proven_expertise_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('homePage.proven_expertise_desc')}</p>
              </motion.div>
              <motion.div variants={fadeIn} className="p-6">
                <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('homePage.client_centric_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('homePage.client_centric_desc')}</p>
              </motion.div>
              <motion.div variants={fadeIn} className="p-6">
                <BarChart className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{t('homePage.sustainable_growth_title')}</h3>
                <p className="text-gray-600 dark:text-gray-300">{t('homePage.sustainable_growth_desc')}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>
      );
    };
    export default WhyPartnerSection;
  