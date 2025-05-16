
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Star, UserCircle } from 'lucide-react';
    import { Card, CardContent } from '@/components/ui/card';
    import { useLanguage } from '@/i18n';

    const TestimonialsSection = () => {
      const { t } = useLanguage();

      const testimonials = [
        {
          textKey: 'homePage.testimonial_1_text',
          authorKey: 'homePage.testimonial_1_author',
          companyKey: 'homePage.testimonial_1_company',
        },
        {
          textKey: 'homePage.testimonial_2_text',
          authorKey: 'homePage.testimonial_2_author',
          companyKey: 'homePage.testimonial_2_company',
        },
        {
          textKey: 'homePage.testimonial_3_text',
          authorKey: 'homePage.testimonial_3_author',
          companyKey: 'homePage.testimonial_3_company',
        },
      ];

      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      };

      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      };

      return (
        <motion.section 
          className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800/30"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12"
              variants={fadeIn}
            >
              {t('homePage.testimonials_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full flex flex-col bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <UserCircle className="h-16 w-16 text-blue-500 mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 italic mb-4 flex-grow">"{t(testimonial.textKey)}"</p>
                      <div className="flex mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <h4 className="font-semibold text-gray-800 dark:text-white">{t(testimonial.authorKey)}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t(testimonial.companyKey)}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
    };

    export default TestimonialsSection;
  