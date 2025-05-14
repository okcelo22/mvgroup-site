
    import React, { useState } from 'react';
    import { Link, NavLink } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Menu, X, ChevronDown, Building2, Car, Truck, Utensils, Gem } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuItem,
      DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu"
    import { cn } from '@/lib/utils';
    import { useLanguage } from '@/i18n';

    const Header = () => {
      const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
      const { language, setLanguage, t } = useLanguage();

      const navLinks = [
        { name: t('header.home'), path: '/' },
        { name: t('header.about'), path: '/about' },
        { 
          name: t('header.services'), 
          path: '/services', 
          dropdown: true,
          items: [
            { name: t('header.services_dropdown.construction'), path: '/services#construction', Icon: Building2 },
            { name: t('header.services_dropdown.automotive'), path: '/services#automotive', Icon: Car },
            { name: t('header.services_dropdown.supply_chain'), path: '/services#supply-chain', Icon: Truck },
            { name: t('header.services_dropdown.food_restaurant'), path: '/services#food-restaurant', Icon: Utensils },
            { name: t('header.services_dropdown.jewelry'), path: '/services#jewelry', Icon: Gem },
          ] 
        },
        { name: t('header.projects'), path: '/projects' },
        { name: t('header.blog'), path: '/blog' },
        { name: t('header.contact'), path: '/contact' },
      ];

      const NavItem = ({ to, children, onClick }) => (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            cn(
              "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
              isActive ? "bg-blue-500 text-white shadow-md" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            )
          }
        >
          {children}
        </NavLink>
      );
      
      const MobileNavItem = ({ to, children, onClick }) => (
        <NavLink
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            cn(
              "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
              isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            )
          }
        >
          {children}
        </NavLink>
      );

      const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setIsMobileMenuOpen(false); 
      };

      return (
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-subtle">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center">
                <img  className="h-10 w-auto" alt="MV Group Logo" src="https://images.unsplash.com/photo-1579765939576-75c26af73cf8" />
                <span className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">MV Group</span>
              </Link>
              
              <nav className="hidden md:flex items-center space-x-2">
                {navLinks.map((link) => (
                  link.dropdown ? (
                    <DropdownMenu key={link.name}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">
                          {link.name}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        {link.items.map((item) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <Link to={item.path} className="flex items-center w-full">
                              <item.Icon className="mr-2 h-4 w-4" />
                              {item.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <NavItem key={link.name} to={link.path}>{link.name}</NavItem>
                  )
                ))}
                <div className="ml-4 text-sm font-medium text-gray-500 dark:text-gray-400">
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
                  link.dropdown ? (
                    <div key={link.name}>
                       <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400">{link.name}</h3>
                       {link.items.map(item => (
                         <MobileNavItem key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                           <item.Icon className="inline-block mr-2 h-5 w-5" /> {item.name}
                         </MobileNavItem>
                       ))}
                    </div>
                  ) : (
                    <MobileNavItem key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)}>{link.name}</MobileNavItem>
                  )
                ))}
              </nav>
            </motion.div>
          )}
        </header>
      );
    };

    export default Header;
  