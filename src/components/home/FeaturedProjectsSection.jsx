
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent } from '@/components/ui/card';
    import { motion } from 'framer-motion';
    import { ArrowRight } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const FeaturedProjectsSection = () => {
      const { t } = useLanguage();
      const featuredProjects = [
        { id: 1, name: t('projectData.azure_towers_title'), sector: t('sectors.construction_real_estate'), imageText: 'Exterior view of modern apartment buildings at sunset' },
        { id: 2, name: t('projectData.velocity_hub_title'), sector: t('sectors.automotive'), imageText: 'Interior of a luxury car showroom with sports cars' },
        { id: 3, name: t('projectData.logistics_center_title'), sector: t('sectors.supply_chain_management'), imageText: 'High-tech automated warehouse with robotic arms' },
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
            staggerChildren: 0.2
          }
        }
      };

      return (
        <motion.section 
          className="py-12 md:py-16 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container mx-auto px-4">
            <motion.h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-800 dark:text-white mb-12" variants={fadeIn}>
              {t('homePage.featured_projects_title')}
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <motion.div key={project.id} variants={fadeIn} className="group">
                  <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-shadow duration-300 transform group-hover:-translate-y-1 dark:bg-gray-700">
                    <div className="relative h-60">
                      <img  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={project.name} src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300"></div>
                      <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {project.sector}
                      </span>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{project.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{t('homePage.featured_projects_sample_desc')}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Button asChild variant="link" className="text-blue-600 dark:text-blue-400 p-0">
                        <Link to={`/projects/${project.id}`}>{t('homePage.view_details_btn')} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <motion.div className="text-center mt-12" variants={fadeIn}>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/projects">{t('homePage.explore_all_projects_btn')}</Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      );
    };
    export default FeaturedProjectsSection;
  