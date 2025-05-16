
    import React, { useEffect, useRef } from 'react';
    import { useLocation } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Building2, Car, Utensils, Gem, ArrowRight } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useLanguage } from '@/i18n';

    const ServicesPage = () => {
      const location = useLocation();
      const { t, language } = useLanguage();
      const sectionRefs = useRef({});

      const servicesData = [
        {
          id: 'construction',
          title: t('servicesPage.construction_title'),
          Icon: Building2,
          description: t('servicesPage.construction_desc'),
          imageText: "Modern architectural building with glass facade",
          details: [
            t('servicesPage.construction_detail1'),
            t('servicesPage.construction_detail2'),
            t('servicesPage.construction_detail3'),
            t('servicesPage.construction_detail4'),
            t('servicesPage.construction_detail5')
          ]
        },
        {
          id: 'automotive',
          title: t('servicesPage.automotive_title'),
          Icon: Car,
          description: t('servicesPage.automotive_desc'),
          imageText: "Sleek sports car on a winding road",
          details: [
            t('servicesPage.automotive_detail1'),
            t('servicesPage.automotive_detail2'),
            t('servicesPage.automotive_detail3'),
            t('servicesPage.automotive_detail4'),
            t('servicesPage.automotive_detail5')
          ]
        },
        {
          id: 'food-restaurant',
          title: t('servicesPage.food_restaurant_title'),
          Icon: Utensils,
          description: t('servicesPage.food_restaurant_desc'),
          imageText: "Gourmet dish prepared by a chef",
          details: [
            t('servicesPage.food_restaurant_detail1'),
            t('servicesPage.food_restaurant_detail2'),
            t('servicesPage.food_restaurant_detail3'),
            t('servicesPage.food_restaurant_detail4'),
            t('servicesPage.food_restaurant_detail5')
          ]
        },
        {
          id: 'jewelry',
          title: t('servicesPage.jewelry_title'),
          Icon: Gem,
          description: t('servicesPage.jewelry_desc'),
          imageText: "Close-up of a sparkling diamond necklace",
          details: [
            t('servicesPage.jewelry_detail1'),
            t('servicesPage.jewelry_detail2'),
            t('servicesPage.jewelry_detail3'),
            t('servicesPage.jewelry_detail4'),
            t('servicesPage.jewelry_detail5')
          ]
        },
      ];

      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
          }
        }
      };

      useEffect(() => {
        const hash = location.hash;
        if (hash) {
          const elementId = hash.substring(1);
          const element = sectionRefs.current[elementId];
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150); 
          }
        } else {
          window.scrollTo(0,0);
        }
      }, [location.pathname, location.hash, language, t]); 
      
      const renderRichText = (translationKey, replacements) => {
        const rawText = t(translationKey, replacements);
        if (typeof rawText !== 'string') return rawText;

        const parts = rawText.split(/(<\d+>.*?<\/\d+>)/g).filter(part => part);
        
        return parts.map((part, index) => {
          const match = part.match(/<(\d+)>(.*?)<\/(\d+)>/);
          if (match && match[1] === match[3]) {
             if (match[2] === t('header.services')) { 
              return <span key={index} className="gradient-text">{match[2]}</span>;
            }
            return <span key={index}>{match[2]}</span>; 
          }
          return part;
        });
      };

      return (
        <div className="space-y-16 md:space-y-24">
          <motion.section
            className="py-12 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {renderRichText('servicesPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('servicesPage.intro_text')}
            </p>
          </motion.section>

          <motion.div 
            className="space-y-16 md:space-y-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {servicesData.map((service, index) => (
              <motion.section
                key={service.id}
                id={service.id}
                ref={el => sectionRefs.current[service.id] = el}
                className={`py-12 md:py-16 rounded-xl shadow-medium overflow-hidden ${index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}`}
                variants={fadeIn}
              >
                <div className="container mx-auto px-4">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
                    <motion.div 
                      className="md:w-1/2"
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7 }}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                        <img  className="w-full h-full object-cover" alt={service.imageText} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 p-2 bg-black/50 rounded">
                           <service.Icon className="h-10 w-10 text-white" />
                        </div>
                      </div>
                    </motion.div>
                    <motion.div 
                      className="md:w-1/2"
                      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.7, delay:0.2 }}
                    >
                      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-4">{service.title}</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{service.description}</p>
                      <ul className="space-y-2 mb-6">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-gray-700 dark:text-gray-200">
                            <ArrowRight className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        {t('servicesPage.inquire_btn', { serviceName: service.title.split(' ')[0] })}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.section>
            ))}
          </motion.div>
        </div>
      );
    };

    export default ServicesPage;
  