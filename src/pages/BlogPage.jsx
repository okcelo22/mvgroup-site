
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { ArrowRight, CalendarDays, UserCircle } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const BlogPage = () => {
      const { t, language } = useLanguage();

      const blogPosts = [
        { id: 1, titleKey: 'blogData.sustainable_construction_title', date: '2025-04-20', authorKey: 'blogData.sustainable_construction_author', imageText: 'Modern eco-friendly building with solar panels and green roof', excerptKey: 'blogData.sustainable_construction_excerpt' },
        { id: 2, titleKey: 'blogData.automotive_landscape_title', date: '2025-04-15', authorKey: 'blogData.automotive_landscape_author', imageText: 'Concept electric car charging at a futuristic station', excerptKey: 'blogData.automotive_landscape_excerpt' },
        { id: 3, titleKey: 'blogData.supply_chain_optimization_title', date: '2025-04-10', authorKey: 'blogData.supply_chain_optimization_author', imageText: 'Global map with interconnected logistics routes highlighted', excerptKey: 'blogData.supply_chain_optimization_excerpt' },
        { id: 4, titleKey: 'blogData.culinary_trends_title', date: '2025-04-05', authorKey: 'blogData.culinary_trends_author', imageText: 'Artistically plated gourmet dish with vibrant colors', excerptKey: 'blogData.culinary_trends_excerpt' },
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
            staggerChildren: 0.15
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
             if (match[2] === t('header.blog')) { 
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
              {renderRichText('blogPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('blogPage.intro_text')}
            </p>
          </motion.section>

          <motion.section 
            className="container mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                  <motion.div key={post.id} variants={fadeIn} className="h-full">
                    <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 dark:bg-gray-800">
                      <div className="relative h-56">
                        <img  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={t(post.titleKey)} src="https://images.unsplash.com/photo-1675270714610-11a5cadcc7b3" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          <Link to={`/blog/${post.id}`}>{t(post.titleKey)}</Link>
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center"><CalendarDays className="h-4 w-4 mr-1" /> {new Date(post.date).toLocaleDateString(language)}</span>
                          <span className="flex items-center"><UserCircle className="h-4 w-4 mr-1" /> {t(post.authorKey)}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{t(post.excerptKey)}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="link" className="text-blue-600 dark:text-blue-400 p-0">
                          <Link to={`/blog/${post.id}`}>{t('blogPage.read_more_btn')} <ArrowRight className="ml-1 h-4 w-4" /></Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.p 
                className="text-center text-gray-500 dark:text-gray-400 py-10 text-lg"
                variants={fadeIn}
              >
                {t('blogPage.no_posts_found')}
              </motion.p>
            )}
             <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
                {t('blogPage.detail_page_note')}
             </div>
          </motion.section>
        </div>
      );
    };

    export default BlogPage;
  