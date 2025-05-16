
    import React, { useEffect } from 'react';
    import { useLocation } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { User, Target, Eye, Zap, Users, CheckCircle, Landmark, TrendingUp, Zap as ZapIcon, Users as UsersIcon, Award } from 'lucide-react';
    import { useLanguage } from '@/i18n';
    import { Separator } from '@/components/ui/separator';

    const AboutPage = () => {
      const { t, language } = useLanguage();
      const location = useLocation();

      useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
      }, [location.pathname, language]);

      const MUZAFFER_VURGUN_IMAGE_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/fb3259d9-1449-4d66-aa17-dd265cdacdd0/0e6e2faeffb3ea7ec15f56d587cb4f38.jpg";

      const teamMembers = [
        {
          nameKey: 'aboutPage.team_member_ceo_name',
          titleKey: 'aboutPage.team_member_ceo_title',
          bioKey: 'aboutPage.team_member_ceo_bio',
          image: MUZAFFER_VURGUN_IMAGE_URL,
          Icon: User,
        }
      ];

      const values = [
        { titleKey: 'aboutPage.value_integrity', Icon: CheckCircle, color: 'text-green-500' },
        { titleKey: 'aboutPage.value_innovation', Icon: Zap, color: 'text-blue-500' },
        { titleKey: 'aboutPage.value_customer_centric', Icon: Users, color: 'text-purple-500' },
        { titleKey: 'aboutPage.value_sustainability', Icon: Landmark, color: 'text-teal-500' },
        { titleKey: 'aboutPage.value_collaboration', Icon: UsersIcon, color: 'text-yellow-500' },
      ];

      const journeyPoints = [
        { yearKey: 'aboutPage.journey_2010_title', eventKey: 'aboutPage.journey_2010_desc', Icon: Award },
        { yearKey: 'aboutPage.journey_2015_title', eventKey: 'aboutPage.journey_2015_desc', Icon: TrendingUp },
        { yearKey: 'aboutPage.journey_2020_title', eventKey: 'aboutPage.journey_2020_desc', Icon: ZapIcon },
        { yearKey: 'aboutPage.journey_present_title', eventKey: 'aboutPage.journey_present_desc', Icon: Landmark },
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
      
      const renderRichText = (translationKey) => {
        const rawText = t(translationKey);
        if (typeof rawText !== 'string') return rawText;

        const parts = rawText.split(/(<\d+>.*?<\/\d+>)/g).filter(part => part);
        
        return parts.map((part, index) => {
          const match = part.match(/<(\d+)>(.*?)<\/(\d+)>/);
          if (match && match[1] === match[3]) {
             if (match[2] === 'MV Group') { 
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
              {renderRichText('aboutPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('aboutPage.intro_text')}
            </p>
          </motion.section>

          <motion.section 
            className="container mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div variants={fadeIn} className="space-y-6 p-8 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-subtle">
                <div className="flex items-center">
                  <Eye className="h-10 w-10 text-blue-500 mr-4" />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{t('aboutPage.vision_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{t('aboutPage.vision_text')}</p>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={fadeIn} className="space-y-6 p-8 bg-white dark:bg-gray-800/50 rounded-xl shadow-subtle">
                <div className="flex items-center">
                  <Target className="h-10 w-10 text-green-500 mr-4" />
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{t('aboutPage.mission_title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{t('aboutPage.mission_text')}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section 
            className="container mx-auto px-4 text-center"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-10">{t('aboutPage.values_title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div 
                  key={index} 
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={fadeIn}
                >
                  <value.Icon className={`h-12 w-12 ${value.color} mx-auto mb-4`} />
                  <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">{t(value.titleKey)}</h3>
                </motion.div>
              ))}
            </div>
          </motion.section>
          
          <motion.section 
            className="container mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12">{t('aboutPage.journey_title')}</h2>
            <div className="relative">
              <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 transform -translate-x-1/2"></div>
              {journeyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className={`flex md:items-center mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  variants={fadeIn}
                >
                  <div className="flex-shrink-0 md:w-1/2 md:pr-8 md:pl-0 text-center md:text-left relative">
                    <div className="md:absolute md:right-0 md:transform md:translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10">
                      <div className="mx-auto md:mx-0 bg-blue-500 dark:bg-blue-400 text-white p-3 rounded-full shadow-lg w-16 h-16 flex items-center justify-center">
                        <point.Icon className="h-8 w-8" />
                      </div>
                    </div>
                  </div>
                  <div className={`w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg ${index % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                    <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{t(point.yearKey)}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{t(point.eventKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section 
            className="py-12 bg-gray-50 dark:bg-gray-800/30"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12">{t('aboutPage.leadership_title')}</h2>
              <div className="flex flex-wrap justify-center gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-sm text-center p-6 transform hover:scale-105 transition-transform duration-300"
                    variants={fadeIn}
                  >
                    <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-500 dark:border-blue-400">
                      <img  
                        src={member.image} 
                        alt={t(member.nameKey)} 
                        className="w-full h-full object-cover"
                       />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{t(member.nameKey)}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{t(member.titleKey)}</p>
                    <Separator className="my-3 bg-gray-200 dark:bg-gray-700" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{t(member.bioKey)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      );
    };

    export default AboutPage;
  