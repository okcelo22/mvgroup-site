
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Award, Eye, Users, Zap, CheckCircle } from 'lucide-react';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { useLanguage } from '@/i18n';

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
    
    const AboutPage = () => {
      const { t } = useLanguage();

      const teamMembers = [
        { name: t('aboutPage.team_member_ceo_name'), title: t('aboutPage.team_member_ceo_title'), imageText: "Professional headshot of CEO", bio: t('aboutPage.team_member_ceo_bio') },
        { name: t('aboutPage.team_member_coo_name'), title: t('aboutPage.team_member_coo_title'), imageText: "Professional headshot of COO", bio: t('aboutPage.team_member_coo_bio') },
        { name: t('aboutPage.team_member_cto_name'), title: t('aboutPage.team_member_cto_title'), imageText: "Professional headshot of CTO", bio: t('aboutPage.team_member_cto_bio') },
      ];

      const journeyItems = [
        { year: "2010", title: t('aboutPage.journey_2010_title'), description: t('aboutPage.journey_2010_desc') },
        { year: "2015", title: t('aboutPage.journey_2015_title'), description: t('aboutPage.journey_2015_desc') },
        { year: "2020", title: t('aboutPage.journey_2020_title'), description: t('aboutPage.journey_2020_desc') },
        { year: t('aboutPage.journey_present_title'), title: t('aboutPage.journey_present_title'), description: t('aboutPage.journey_present_desc') },
      ];

      const renderRichText = (translationKey) => {
        const rawText = t(translationKey);
        if (typeof rawText !== 'string') return rawText;

        const parts = rawText.split(/(<\d+>.*?<\/\d+>)/g).filter(part => part);
        
        return parts.map((part, index) => {
          const match = part.match(/<(\d+)>(.*?)<\/(\d+)>/);
          if (match && match[1] === match[3]) {
            if (match[2] === 'MV Group') { // Specific handling for MV Group gradient text
              return <span key={index} className="gradient-text">{match[2]}</span>;
            }
            return <span key={index}>{match[2]}</span>; 
          }
          return part;
        });
      };


      return (
        <div className="space-y-16 md:space-y-24">
          {/* Company Introduction Section */}
          <motion.section
            className="py-12 md:py-16 text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="container mx-auto px-4">
              <motion.h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6" variants={fadeIn}>
                {renderRichText('aboutPage.title')}
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto" variants={fadeIn}>
                {t('aboutPage.intro_text')}
              </motion.p>
            </div>
          </motion.section>

          {/* Mission, Vision, Values Section */}
          <motion.section 
            className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-medium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                <motion.div variants={fadeIn} className="p-6">
                  <Eye className="h-12 w-12 text-blue-500 mb-4 mx-auto md:mx-0" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{t('aboutPage.vision_title')}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t('aboutPage.vision_text')}</p>
                </motion.div>
                <motion.div variants={fadeIn} className="p-6">
                  <Award className="h-12 w-12 text-green-500 mb-4 mx-auto md:mx-0" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{t('aboutPage.mission_title')}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{t('aboutPage.mission_text')}</p>
                </motion.div>
                <motion.div variants={fadeIn} className="p-6">
                  <Zap className="h-12 w-12 text-purple-500 mb-4 mx-auto md:mx-0" />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{t('aboutPage.values_title')}</h2>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    <li className="flex items-center justify-center md:justify-start"><CheckCircle className="h-5 w-5 text-purple-500 mr-2" /> {t('aboutPage.value_integrity')}</li>
                    <li className="flex items-center justify-center md:justify-start"><CheckCircle className="h-5 w-5 text-purple-500 mr-2" /> {t('aboutPage.value_innovation')}</li>
                    <li className="flex items-center justify-center md:justify-start"><CheckCircle className="h-5 w-5 text-purple-500 mr-2" /> {t('aboutPage.value_customer_centric')}</li>
                    <li className="flex items-center justify-center md:justify-start"><CheckCircle className="h-5 w-5 text-purple-500 mr-2" /> {t('aboutPage.value_sustainability')}</li>
                    <li className="flex items-center justify-center md:justify-start"><CheckCircle className="h-5 w-5 text-purple-500 mr-2" /> {t('aboutPage.value_collaboration')}</li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.section>
          
          {/* Our Journey / History (Optional but good for About) */}
          <motion.section
            className="py-12 md:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="container mx-auto px-4">
              <motion.h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12" variants={fadeIn}>
                {t('aboutPage.journey_title')}
              </motion.h2>
              <div className="relative">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>
                
                {journeyItems.map((item, index) => (
                  <motion.div 
                    key={index} 
                    className={`mb-8 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    variants={fadeIn}
                  >
                    <div className="hidden md:block w-1/2"></div>
                    <div className="hidden md:block relative">
                      <div className="absolute w-4 h-4 bg-blue-500 rounded-full top-1/2 -mt-2 left-1/2 transform -translate-x-1/2"></div>
                    </div>
                    <Card className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} dark:bg-gray-800`}>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-blue-600 dark:text-blue-400">{item.year === t('aboutPage.journey_present_title') ? item.title : `${item.year} - ${item.title}`}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Management Team Section (Optional) */}
          <motion.section 
            className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-medium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <div className="container mx-auto px-4">
              <motion.h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12" variants={fadeIn}>
                {t('aboutPage.leadership_title')}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div key={index} variants={fadeIn}>
                    <Card className="text-center h-full flex flex-col hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 dark:bg-gray-700">
                      <CardHeader className="items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-500">
                          <img  className="w-full h-full object-cover" alt={member.name} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</CardTitle>
                        <p className="text-sm text-blue-600 dark:text-blue-400">{member.title}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      );
    };

    export default AboutPage;
  