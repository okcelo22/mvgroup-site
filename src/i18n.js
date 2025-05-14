
    import React, { createContext, useContext, useState, useEffect } from 'react';
    import enTranslations from '@/locales/en.json';
    import trTranslations from '@/locales/tr.json';

    const translations = {
      en: enTranslations,
      tr: trTranslations,
    };

    const LanguageContext = createContext();

    export const LanguageProvider = ({ children }) => {
      const [language, setLanguage] = useState(() => {
        const storedLang = localStorage.getItem('mvgroup-lang');
        return storedLang || 'en'; 
      });

      useEffect(() => {
        localStorage.setItem('mvgroup-lang', language);
        document.documentElement.lang = language;
      }, [language]);

      const t = (key, replacements = {}) => {
        const keys = key.split('.');
        let text = translations[language];
        try {
          for (const k of keys) {
            text = text[k];
            if (text === undefined) throw new Error(`Translation key "${key}" not found for language "${language}"`);
          }
          if (typeof text === 'string') {
            Object.keys(replacements).forEach(placeholder => {
              text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacements[placeholder]);
            });
          } else if (typeof text === 'function') {
            return text(replacements);
          }
          return text;
        } catch (error) {
          console.warn(error.message);
          if (language !== 'en') {
            try {
              let fallbackText = translations['en'];
              for (const k of keys) {
                fallbackText = fallbackText[k];
                if (fallbackText === undefined) throw new Error(`Fallback translation key "${key}" not found for language "en"`);
              }
              if (typeof fallbackText === 'string') {
                Object.keys(replacements).forEach(placeholder => {
                  fallbackText = fallbackText.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacements[placeholder]);
                });
              } else if (typeof fallbackText === 'function') {
                return fallbackText(replacements);
              }
              return fallbackText;
            } catch (fallbackError) {
              console.warn(fallbackError.message);
              return key; 
            }
          }
          return key; 
        }
      };
      

      return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
          {children}
        </LanguageContext.Provider>
      );
    };

    export const useLanguage = () => {
      const context = useContext(LanguageContext);
      if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
      }
      return context;
    };
  