
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Users, Briefcase, Users2, Calendar } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const StatsSection = () => {
      const { t } = useLanguage();

      const stats = [
        {
          icon: <Users className="h-10 w-10 text-blue-500" />,
          value: t('homePage.stat_clients_served_value'),
          label: t('homePage.stat_clients_served_label'),
        },
        {
          icon: <Briefcase className="h-10 w-10 text-green-500" />,
          value: t('homePage.stat_projects_completed_value'),
          label: t('homePage.stat_projects_completed_label'),
        },
        {
          icon: <Users2 className="h-10 w-10 text-purple-500" />,
          value: t('homePage.stat_team_members_value'),
          label: t('homePage.stat_team_members_label'),
        },
        {
          icon: <Calendar className="h-10 w-10 text-yellow-500" />,
          value: t('homePage.stat_years_experience_value'),
          label: t('homePage.stat_years_experience_label'),
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
          className="py-12 md:py-16 bg-white dark:bg-gray-800"
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
              {t('homePage.stats_section_title')}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  variants={fadeIn}
                >
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      );
    };

    export default StatsSection;
  