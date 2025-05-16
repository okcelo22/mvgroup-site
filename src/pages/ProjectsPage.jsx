
    import React, { useState, useEffect } from 'react';
    import { Link, useLocation } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Tag, Search, ArrowRight } from 'lucide-react';
    import { Input } from '@/components/ui/input';
    import { useLanguage } from '@/i18n';

    const ProjectsPage = () => {
      const { t, language } = useLanguage();
      const location = useLocation();

      const allProjects = [
        { id: 1, titleKey: 'projectData.azure_towers_title', sectorKey: 'sectors.construction_real_estate', date: '2023-05-15', imageText: 'Tall modern residential towers with blue glass facade', descriptionKey: 'projectData.azure_towers_desc' },
        { id: 2, titleKey: 'projectData.velocity_hub_title', sectorKey: 'sectors.automotive', date: '2022-11-20', imageText: 'Spacious and modern car dealership showroom interior', descriptionKey: 'projectData.velocity_hub_desc' },
        { id: 4, titleKey: 'projectData.gourmet_table_title', sectorKey: 'sectors.food_restaurant_management', date: '2023-09-05', imageText: 'Elegant fine dining restaurant interior with well-set tables', descriptionKey: 'projectData.gourmet_table_desc' },
        { id: 5, titleKey: 'projectData.elysian_jewels_title', sectorKey: 'sectors.jewelry', date: '2023-12-01', imageText: 'Display case with exquisite diamond and gemstone jewelry pieces', descriptionKey: 'projectData.elysian_jewels_desc' },
        { id: 6, titleKey: 'projectData.greentech_office_title', sectorKey: 'sectors.construction_real_estate', date: '2022-08-20', imageText: 'Modern office buildings surrounded by green landscaping', descriptionKey: 'projectData.greentech_office_desc'},
        { id: 7, titleKey: 'projectData.artisan_bakery_title', sectorKey: 'sectors.food_restaurant_management', date: '2024-02-15', imageText: 'Interior of a cozy artisan bakery with fresh bread display', descriptionKey: 'projectData.artisan_bakery_desc'},
        { id: 8, titleKey: 'projectData.precision_parts_title', sectorKey: 'sectors.automotive', date: '2023-03-30', imageText: 'Advanced manufacturing facility with robotic arms assembling car parts', descriptionKey: 'projectData.precision_parts_desc'}
      ];
      
      const sectors = [
        { key: 'All', label: t('projectsPage.filter_all') },
        ...Array.from(new Set(allProjects.map(p => p.sectorKey))) 
          .map(sectorKey => ({ key: sectorKey, label: t(sectorKey) }))
      ];


      const [filter, setFilter] = useState('All');
      const [searchTerm, setSearchTerm] = useState('');

      useEffect(() => {
        if (!location.hash) {
          window.scrollTo(0, 0);
        }
      }, [location.pathname, language, location.hash]);

      const filteredProjects = allProjects.filter(project => {
        const projectTitle = t(project.titleKey);
        const projectDescription = t(project.descriptionKey);

        const matchesSector = filter === 'All' || project.sectorKey === filter;
        const matchesSearch = projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) || projectDescription.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSector && matchesSearch;
      });

      const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
      };
      
      const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
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
             if (match[2] === t('header.projects')) { 
              return <span key={index} className="gradient-text">{match[2]}</span>;
            }
            return <span key={index}>{match[2]}</span>; 
          }
          return part;
        });
      };


      return (
        <div className="space-y-12 md:space-y-16">
          <motion.section
            className="py-12 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
              {renderRichText('projectsPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('projectsPage.intro_text')}
            </p>
          </motion.section>

          <motion.div 
            className="container mx-auto px-4 sticky top-[calc(theme(spacing.20)_-_1px)] z-40 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-lg shadow-sm -mt-4"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full md:w-auto">
                <Input 
                  type="text"
                  placeholder={t('projectsPage.search_placeholder')}
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label={t('projectsPage.search_placeholder')}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2">
                {sectors.map(sector => (
                  <Button
                    key={sector.key}
                    variant={filter === sector.key ? 'default' : 'outline'}
                    onClick={() => setFilter(sector.key)}
                    className={`transition-all duration-200 ${filter === sector.key ? 'bg-blue-600 text-white' : 'border-gray-300 dark:border-gray-600'}`}
                  >
                    {sector.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.section 
            className="container mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(project => (
                  <motion.div key={project.id} variants={fadeIn} className="h-full">
                    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 dark:bg-gray-800">
                      <div className="relative h-56">
                        <img  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={t(project.titleKey)} src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded flex items-center">
                          <Tag className="h-3 w-3 mr-1" /> {t(project.sectorKey)}
                        </span>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">{t(project.titleKey)}</CardTitle>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{t('projectsPage.completed_on', { date: new Date(project.date).toLocaleDateString(language) })}</p>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{t(project.descriptionKey)}</p>
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
            ) : (
              <motion.p 
                className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg"
                variants={fadeIn}
              >
                {t('projectsPage.no_projects_found')}
              </motion.p>
            )}
          </motion.section>
        </div>
      );
    };

    export default ProjectsPage;
  