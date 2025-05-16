
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { ArrowRight, Building2, Car, Utensils, Gem } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const ServicesHighlightSection = ({ displayAll = true }) => {
      const { t } = useLanguage();
      const allServices = [
        { id: 'construction', title: t('sectors.construction_real_estate'), description: t('homePage.services_highlights.construction_desc'), Icon: Building2, link: '/services#construction' },
        { id: 'automotive', title: t('sectors.automotive'), description: t('homePage.services_highlights.automotive_desc'), Icon: Car, link: '/services#automotive' },
        { id: 'food-restaurant', title: t('sectors.food_restaurant_management'), description: t('homePage.services_highlights.food_restaurant_desc'), Icon: Utensils, link: '/services#food-restaurant' },
        { id: 'jewelry', title: t('sectors.jewelry'), description: t('homePage.services_highlights.jewelry_desc'), Icon: Gem, link: '/services#jewelry' },
      ];

      const servicesToDisplay = displayAll ? allServices : allServices.slice(0, 3);

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
          className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800/50 rounded-xl shadow-subtle"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12" variants={fadeIn}>
              {displayAll ? t('homePage.core_services_title') : t('homePage.featured_services_title')}
            </motion.h2>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${displayAll ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-8`}>
              {servicesToDisplay.map((service, index) => ( 
                <motion.div key={service.id} variants={fadeIn} className="h-full">
                  <Card className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 dark:bg-gray-800">
                    <CardHeader className="items-center text-center">
                      <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-full mb-4 shadow-sm">
                         <service.Icon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center flex-grow">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0 text-center">
                      <Button asChild variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-blue-300">
                        <Link to={service.link}>{t('homePage.learn_more_btn')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            {displayAll && (
              <motion.div className="text-center mt-12" variants={fadeIn}>
                <Button asChild size="lg" className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-colors duration-300">
                  <Link to="/services">{t('homePage.view_all_services_btn')}</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.section>
      );
    };
    export default ServicesHighlightSection;
  