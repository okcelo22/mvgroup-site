
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import { AlertTriangle, Home } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const NotFoundPage = () => {
      const { t } = useLanguage();
      return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
          >
            <AlertTriangle className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-4">{t('notFoundPage.title')}</h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-200 mb-6">{t('notFoundPage.subtitle')}</h2>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto">
              {t('notFoundPage.description')}
            </p>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white"><Link to="/">
                <Home className="mr-2 h-5 w-5" /> {t('notFoundPage.go_home_btn')}
              </Link>
            </Button>
          </motion.div>
          <div className="mt-12">
            <img  className="max-w-xs md:max-w-sm mx-auto opacity-80" alt="Confused robot or character looking at a map" src="https://images.unsplash.com/photo-1672789210128-c9ac59de248f" />
          </div>
        </div>
      );
    };

    export default NotFoundPage;
  