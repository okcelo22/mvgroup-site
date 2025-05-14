
    import React from 'react';
    import { useParams, Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { ArrowLeft, CalendarDays, Tag, Users, CheckCircle } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const ProjectDetailPage = () => {
      const { projectId } = useParams();
      const { t, language } = useLanguage();

      // This data should ideally come from a centralized place or API, matching ProjectsPage
      const allProjectsData = {
        "1": { titleKey: 'projectData.azure_towers_title', sectorKey: 'sectors.construction_real_estate', date: '2023-05-15', imageText: 'Wide shot of Azure Residential Towers against a clear sky', descriptionKey: 'projectData.azure_towers_detail_desc', clientKey: 'projectData.azure_towers_client', featuresKeys: ['projectData.azure_towers_feature1', 'projectData.azure_towers_feature2', 'projectData.azure_towers_feature3', 'projectData.azure_towers_feature4'], gallery: ["Detailed view of Azure Towers balcony", "Lobby interior of Azure Towers", "Rooftop pool at Azure Towers"] },
        "2": { titleKey: 'projectData.velocity_hub_title', sectorKey: 'sectors.automotive', date: '2022-11-20', imageText: 'Interior of Velocity Auto Hub showroom with luxury cars', descriptionKey: 'projectData.velocity_hub_detail_desc', clientKey: 'projectData.velocity_hub_client', featuresKeys: ['projectData.velocity_hub_feature1', 'projectData.velocity_hub_feature2', 'projectData.velocity_hub_feature3', 'projectData.velocity_hub_feature4'], gallery: ["Service bay at Velocity Auto Hub", "Customer lounge at Velocity Auto Hub", "Exterior of Velocity Auto Hub at night"] },
      };
      
      const projectData = allProjectsData[projectId];

      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };

      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.15
          }
        }
      };

      if (!projectData) {
        return (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold mb-4">{t('projectDetailPage.project_not_found_title')}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{t('projectDetailPage.project_not_found_desc')}</p>
            <Button asChild>
              <Link to="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('projectDetailPage.back_to_projects_btn')}
              </Link>
            </Button>
          </div>
        );
      }
      
      const project = {
        title: t(projectData.titleKey),
        sector: t(projectData.sectorKey),
        date: projectData.date,
        imageText: projectData.imageText, // This might need translation if it's user-facing
        description: t(projectData.descriptionKey),
        client: projectData.clientKey ? t(projectData.clientKey) : null,
        features: projectData.featuresKeys ? projectData.featuresKeys.map(key => t(key)) : [],
        gallery: projectData.gallery || []
      };


      return (
        <motion.div 
          className="space-y-12 md:space-y-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.section className="relative py-20 md:py-32 rounded-xl overflow-hidden" variants={fadeIn}>
            <div className="absolute inset-0 -z-10">
              <img  className="object-cover w-full h-full opacity-40" alt={`Image for ${project.title}`} src="https://images.unsplash.com/photo-1694388001616-1176f534d72f" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent"></div>
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center">
              <motion.h1 className="text-4xl md:text-6xl font-bold text-white mb-4" variants={fadeIn}>{project.title}</motion.h1>
              <motion.div className="flex justify-center items-center space-x-4 text-gray-200" variants={fadeIn}>
                <span className="flex items-center"><Tag className="h-5 w-5 mr-2" /> {project.sector}</span>
                <span className="flex items-center"><CalendarDays className="h-5 w-5 mr-2" /> {new Date(project.date).toLocaleDateString(language)}</span>
              </motion.div>
            </div>
          </motion.section>
          
          <div className="container mx-auto px-4">
            <motion.div className="mb-8" variants={fadeIn}>
              <Button asChild variant="outline">
                <Link to="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" /> {t('projectDetailPage.back_to_projects_btn')}
                </Link>
              </Button>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div className="md:col-span-2 space-y-8" variants={fadeIn}>
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">{t('projectDetailPage.overview_title')}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
                </div>
                
                {project.features && project.features.length > 0 && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">{t('projectDetailPage.features_title')}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <li key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>

              <motion.aside className="md:col-span-1 space-y-6" variants={fadeIn}>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{t('projectDetailPage.details_title')}</h3>
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700 dark:text-gray-200">
                      <Tag className="h-5 w-5 mr-3 text-blue-500" />
                      <strong>{t('projectDetailPage.sector_label')}</strong>&nbsp;{project.sector}
                    </p>
                    <p className="flex items-center text-gray-700 dark:text-gray-200">
                      <CalendarDays className="h-5 w-5 mr-3 text-blue-500" />
                      <strong>{t('projectDetailPage.completion_label')}</strong>&nbsp;{new Date(project.date).toLocaleDateString(language)}
                    </p>
                    {project.client && (
                      <p className="flex items-center text-gray-700 dark:text-gray-200">
                        <Users className="h-5 w-5 mr-3 text-blue-500" />
                        <strong>{t('projectDetailPage.client_label')}</strong>&nbsp;{project.client}
                      </p>
                    )}
                  </div>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg shadow-sm">
                   <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-3">{t('projectDetailPage.feedback_title')}</h3>
                   <blockquote className="italic text-gray-600 dark:text-gray-300">
                     {t('projectDetailPage.feedback_text')}
                   </blockquote>
                   <p className="text-right mt-2 font-medium text-sm text-blue-600 dark:text-blue-400">{t('projectDetailPage.feedback_client')}</p>
                </div>
              </motion.aside>
            </div>

            {project.gallery && project.gallery.length > 0 && (
              <motion.section className="mt-12 md:mt-16" variants={fadeIn}>
                <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white mb-8">{t('projectDetailPage.gallery_title')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.gallery.map((imageDesc, index) => (
                    <motion.div 
                      key={index} 
                      className="aspect-square rounded-lg overflow-hidden shadow-lg group"
                      variants={fadeIn}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img  className="w-full h-full object-cover" alt={`${project.title} - Gallery Image ${index + 1}`} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </motion.div>
      );
    };

    export default ProjectDetailPage;
  