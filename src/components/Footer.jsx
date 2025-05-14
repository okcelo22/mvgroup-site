
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
    import { useLanguage } from '@/i18n';

    const Footer = () => {
      const { t } = useLanguage();
      const currentYear = new Date().getFullYear();

      const quickLinks = [
        { name: t('header.home'), path: '/' },
        { name: t('header.about'), path: '/about' },
        { name: t('header.services'), path: '/services' },
        { name: t('header.projects'), path: '/projects' },
        { name: t('header.contact'), path: '/contact' },
      ];

      const socialLinks = [
        { Icon: Facebook, href: '#', name: 'Facebook' },
        { Icon: Twitter, href: '#', name: 'Twitter' },
        { Icon: Instagram, href: '#', name: 'Instagram' },
        { Icon: Linkedin, href: '#', name: 'LinkedIn' },
        { Icon: Youtube, href: '#', name: 'YouTube' },
      ];

      return (
        <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <Link to="/" className="flex items-center mb-4">
                  <img  className="h-8 w-auto" alt="MV Group Logo Small" src="https://images.unsplash.com/photo-1694718891501-99ab366bac75" />
                  <span className="ml-2 text-xl font-semibold text-gray-800 dark:text-white">MV Group</span>
                </Link>
                <p className="text-sm">{t('footer.logo_text')}</p>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('footer.quick_links')}</h5>
                <ul className="space-y-2">
                  {quickLinks.map(link => (
                    <li key={link.name}>
                      <Link to={link.path} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('footer.newsletter')}</h5>
                <p className="text-sm mb-3">{t('footer.newsletter_desc')}</p>
                <form className="flex space-x-2">
                  <Input type="email" placeholder={t('footer.newsletter_placeholder')} className="flex-grow" aria-label="Email for newsletter"/>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">{t('footer.subscribe')}</Button>
                </form>
              </div>
              
              <div>
                <h5 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">{t('footer.follow_us')}</h5>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                       className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                      <social.Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
                 <div className="mt-6">
                    <p className="text-sm">mvgrup.net@gmail.com</p>
                    <p className="text-sm">+90 532 511 6263</p>
                    <p className="text-sm">+1 802 777 7377</p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 text-center">
              <p className="text-sm">{t('footer.copyright', { year: currentYear })}</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  