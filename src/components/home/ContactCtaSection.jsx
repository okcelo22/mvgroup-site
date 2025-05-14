
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { useLanguage } from '@/i18n';

    const ContactCtaSection = () => {
      const { t } = useLanguage();
      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

      return (
        <motion.section 
          className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-sky-500 text-white rounded-xl shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('homePage.contact_cta_title')}
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 opacity-90">
              {t('homePage.contact_cta_desc')}
            </p>
            <Button asChild size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 border-transparent shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Link to="/contact">{t('homePage.get_started_btn')}</Link>
            </Button>
          </div>
        </motion.section>
      );
    };
    export default ContactCtaSection;
  