
    import React, { useState, useEffect } from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Menu, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { cn } from '@/lib/utils';
    import { useLanguage } from '@/i18n';

    const LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/fb3259d9-1449-4d66-aa17-dd265cdacdd0/3ff8cac098d1bd5a3d2034c39d7e9912.png";

    const Header = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { language, setLanguage, t } = useLanguage();
      const location = useLocation();
      const navigate = useNavigate();

      const navLinks = [
        { name: t('header.home'), path: '/' },
        { name: t('header.about'), path: '/about' },
        { name: t('header.services'), path: '/services' },
        { name: t('header.blog'), path: '/blog' },
        { name: t('header.contact'), path: '/contact' },
      ];

      useEffect(() => {
        if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }
        } else {
          window.scrollTo(0, 0);
        }
        setIsMobileMenuOpen(false); 
      }, [location.pathname, location.hash, language]);


      const handleNavClick = (path) => {
        if (path.includes('#')) {
          navigate(path);
        } else {
          navigate(path);
        }
        setIsMobileMenuOpen(false);
      };
      
      const NavItem = ({ path, children }) => (
        <button
          onClick={() => handleNavClick(path)}
          className={cn(
            "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
            location.pathname === path && !path.includes('#') ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          )}
        >
          {children}
        </button>
      );
      
      const MobileNavItem = ({ path, children }) => (
         <button
          onClick={() => handleNavClick(path)}
          className={cn(
            "block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
            location.pathname === path && !path.includes('#') ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          )}
        >
          {children}
        </button>
      );

      const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsMobileMenuOpen(false); 
      };

      return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center" onClick={() => handleNavClick('/')}>
                <img  className="h-14 w-auto sm:h-16" alt="MV Group Logo" src={LOGO_URL} />
              </Link>
              
              <nav className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <NavItem key={link.name} path={link.path}>{link.name}</NavItem>
                ))}
                <div className="ml-3 pl-3 border-l border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span 
                    onClick={() => handleLanguageChange('en')} 
                    className={`cursor-pointer hover:text-blue-500 ${language === 'en' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                  >
                    {t('header.lang_en')}
                  </span> | <span 
                    onClick={() => handleLanguageChange('tr')}
                    className={`cursor-pointer hover:text-blue-500 ${language === 'tr' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                  >
                    {t('header.lang_tr')}
                  </span>
                </div>
              </nav>

              <div className="md:hidden flex items-center">
                 <div className="mr-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <span 
                    onClick={() => handleLanguageChange('en')} 
                    className={`cursor-pointer hover:text-blue-500 ${language === 'en' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                  >
                    {t('header.lang_en')}
                  </span> | <span 
                    onClick={() => handleLanguageChange('tr')}
                    className={`cursor-pointer hover:text-blue-500 ${language === 'tr' ? 'text-blue-600 dark:text-blue-400 font-semibold' : ''}`}
                  >
                    {t('header.lang_tr')}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg pb-4"
            >
              <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                  <MobileNavItem key={link.name} path={link.path}>{link.name}</MobileNavItem>
                ))}
              </nav>
            </motion.div>
          )}
        </header>
      );
    };

    export default Header;
  