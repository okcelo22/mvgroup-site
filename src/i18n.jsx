
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
        let currentTranslationBranch = translations[language] || translations['en'];
        let text;

        try {
          text = keys.reduce((acc, currentKey) => {
            if (acc && acc[currentKey] !== undefined) {
              return acc[currentKey];
            }
            throw new Error(`Translation key segment "${currentKey}" not found in "${key}" for language "${language}"`);
          }, currentTranslationBranch);

          if (typeof text === 'string') {
            Object.keys(replacements).forEach(placeholder => {
              const replacementValue = replacements[placeholder];
              if (typeof replacementValue === 'function') {
                 console.warn(`Replacement for {{${placeholder}}} is a function. This might not be intended for simple string replacement.`);
                 text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), `[Function: ${placeholder}]`);
              } else {
                text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacementValue);
              }
            });
          } else if (typeof text === 'object' && text !== null && replacements && typeof replacements['1'] === 'function') {
             // This handles cases like <1>MV Group</1> where '1' is a function to render a span
             // It assumes the structure is like "About <1>MV Group</1>" -> "About {{1}}"
             // And the replacement is { '1': () => <span className="gradient-text">MV Group</span> }
             // This part might need more robust handling depending on the complexity of such translations.
             // For now, we'll assume the key itself is the string with placeholders like {{1}}
             // This is a simplification. A more robust solution would involve a proper parsing mechanism for such rich text translations.
             // The current JSON structure doesn't directly support this well for nested components.
             // A common pattern is to return an array of strings and components.
             // For simplicity, if 'text' is an object, we'll return the key, expecting the component to handle it.
             console.warn(`Translation for key "${key}" is an object. Rich text handling might be required.`);
             return key;
          }
          
          return text;

        } catch (error) {
          console.warn(error.message);
          
          // Fallback logic
          if (language !== 'en') {
            try {
              let fallbackBranch = translations['en'];
              text = keys.reduce((acc, currentKey) => {
                if (acc && acc[currentKey] !== undefined) {
                  return acc[currentKey];
                }
                throw new Error(`Fallback translation key segment "${currentKey}" not found in "${key}" for language "en"`);
              }, fallbackBranch);

              if (typeof text === 'string') {
                Object.keys(replacements).forEach(placeholder => {
                  const replacementValue = replacements[placeholder];
                   if (typeof replacementValue === 'function') {
                     text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), `[Function: ${placeholder}]`);
                  } else {
                    text = text.replace(new RegExp(`{{${placeholder}}}`, 'g'), replacementValue);
                  }
                });
              } else if (typeof text === 'object' && text !== null) {
                 console.warn(`Fallback translation for key "${key}" is an object.`);
                 return key;
              }
              return text;
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
  