
    import React from 'react';
    import { motion } from 'framer-motion';
    import { Input } from '@/components/ui/input';
    import { Textarea } from '@/components/ui/textarea';
    import { Button } from '@/components/ui/button';
    import { Label } from '@/components/ui/label';
    import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
    import { useToast } from "@/components/ui/use-toast"
    import { useLanguage } from '@/i18n';

    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };
    
    const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.2,
        }
      }
    };

    const ContactPage = () => {
      const { toast } = useToast();
      const { t } = useLanguage();

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        
        toast({
          title: t('contactPage.toast_title_success'),
          description: t('contactPage.toast_desc_success', { name: name || 'friend', email: email || 'your email' }),
          variant: "default",
        });
        e.target.reset();
      };

      const contactInfo = [
        { Icon: Mail, text: 'mvgrup.net@gmail.com', href: 'mailto:mvgrup.net@gmail.com' },
        { Icon: Phone, text: '+90 532 511 6263', href: 'tel:+905325116263' },
        { Icon: Phone, text: '+1 802 777 7377', href: 'tel:+18027777377' },
        { Icon: MapPin, text: '123 Business Avenue, Innovation City, Global', href: '#' }, 
      ];

      const socialLinks = [
        { Icon: Facebook, href: '#', name: 'Facebook' },
        { Icon: Twitter, href: '#', name: 'Twitter' },
        { Icon: Instagram, href: '#', name: 'Instagram' },
        { Icon: Linkedin, href: '#', name: 'LinkedIn' },
      ];

      const renderRichText = (translationKey) => {
        const rawText = t(translationKey);
        if (typeof rawText !== 'string') return rawText;

        const parts = rawText.split(/(<\d+>.*?<\/\d+>)/g).filter(part => part);
        
        return parts.map((part, index) => {
          const match = part.match(/<(\d+)>(.*?)<\/(\d+)>/);
          if (match && match[1] === match[3]) {
             if (match[2] === t('header.contact')) { 
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
              {renderRichText('contactPage.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('contactPage.intro_text')}
            </p>
          </motion.section>

          <motion.section 
            className="container mx-auto px-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div variants={fadeIn} className="p-6 md:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-medium">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">{t('contactPage.form_title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">{t('contactPage.name_label')}</Label>
                    <Input type="text" id="name" name="name" placeholder={t('contactPage.name_placeholder')} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">{t('contactPage.email_label')}</Label>
                    <Input type="email" id="email" name="email" placeholder={t('contactPage.email_placeholder')} required className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">{t('contactPage.phone_label')}</Label>
                    <Input type="tel" id="phone" name="phone" placeholder={t('contactPage.phone_placeholder')} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-200">{t('contactPage.message_label')}</Label>
                    <Textarea id="message" name="message" placeholder={t('contactPage.message_placeholder')} rows={5} required className="mt-1" />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Send className="mr-2 h-5 w-5" /> {t('contactPage.send_btn')}
                  </Button>
                </form>
              </motion.div>

              <motion.div variants={fadeIn} className="space-y-8">
                <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl shadow-medium">
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-6">{t('contactPage.info_title')}</h2>
                  <ul className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <li key={index} className="flex items-start">
                        <info.Icon className="h-6 w-6 text-blue-500 mr-4 mt-1 flex-shrink-0" />
                        <a href={info.href} className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all">
                          {info.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{t('contactPage.follow_us_title')}</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map(social => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}
                           className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-colors">
                          <social.Icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="rounded-xl shadow-medium overflow-hidden aspect-video">
                  <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=28.9732,41.0070,28.9832,41.0170&layer=mapnik&marker=41.0120,28.9782"
                    width="100%"
                    height="100%"
                    style={{ border:0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MV Group Location on OpenStreetMap"
                  ></iframe>
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400 p-1">
                    {t('contactPage.map_note')}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>
        </div>
      );
    };

    export default ContactPage;
  