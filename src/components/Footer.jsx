
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
    import { useLanguage } from '@/i18n';
    import { useToast } from "@/components/ui/use-toast";

    const LOGO_URL = "https://storage.googleapis.com/hostinger-horizons-assets-prod/fb3259d9-1449-4d66-aa17-dd265cdacdd0/3ff8cac098d1bd5a3d2034c39d7e9912.png";

    const Footer = () => {
      const { t } = useLanguage();
      const { toast } = useToast();
      const currentYear = new Date().getFullYear();

      const quickLinks = [
        { name: t('header.home'), path: '/' },
        { name: t('header.about'), path: '/about' },
        { name: t('header.services'), path: '/services' },
        { name: t('header.projects'), path: '/projects' },
        { name: t('header.contact'), path: '/contact' },
      ];

      const socialLinks = [
        { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
        { Icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
        { Icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
      ];

      const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        toast({
          title: t('footer.newsletter_success_title'),
          description: t('footer.newsletter_success_desc', { email }),
        });
        e.target.reset();
      };

      return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 pt-16 pb-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              <div>
                <Link to="/" className="flex items-center mb-4">
                  <img  className="h-12 w-auto" alt="MV Group Logo" src={LOGO_URL} />
                </Link>
                <p className="text-sm leading-relaxed">{t('footer.logo_text')}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-4">{t('footer.quick_links')}</p>
                <ul className="space-y-2">
                  {quickLinks.map(link => (
                    <li key={link.name}>
                      <Link to={link.path} className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 text-sm">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-4">{t('footer.newsletter')}</p>
                <p className="text-sm mb-3">{t('footer.newsletter_desc')}</p>
                <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                  <Input type="email" name="email" placeholder={t('footer.newsletter_placeholder')} className="flex-grow dark:bg-gray-700 dark:border-gray-600" required aria-label={t('footer.newsletter_placeholder')} />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">{t('footer.subscribe')}</Button>
                </form>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-4">{t('footer.follow_us')}</p>
                <div className="flex space-x-4">
                  {socialLinks.map(social => (
                    <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300">
                      <social.Icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-700 pt-8 text-center text-sm">
              <p>&copy; {currentYear} MV Group. {t('footer.copyright', { year: currentYear })}</p>
            </div>
          </div>
        </footer>
      );
    };

    export default Footer;
  