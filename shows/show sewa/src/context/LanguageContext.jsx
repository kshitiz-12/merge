import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Available languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  // Translate text using free translation service
  const translateText = async (text, targetLang) => {
    if (!text || targetLang === 'en') return text;
    
    try {
      // Using a free translation service (LibreTranslate or similar)
      const response = await fetch('https://libretranslate.de/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: 'en',
          target: targetLang
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.translatedText;
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    
    return text; // Return original text if translation fails
  };

  // Translate multiple texts
  const translateMultiple = async (texts, targetLang) => {
    if (targetLang === 'en') return texts;
    
    setIsTranslating(true);
    try {
      const translatedTexts = {};
      for (const [key, text] of Object.entries(texts)) {
        if (text) {
          translatedTexts[key] = await translateText(text, targetLang);
        }
      }
      setIsTranslating(false);
      return translatedTexts;
    } catch (error) {
      console.error('Translation error:', error);
      setIsTranslating(false);
      return texts;
    }
  };

  // Change language
  const changeLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('selectedLanguage', langCode);
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const value = {
    selectedLanguage,
    changeLanguage,
    languages,
    translateText,
    translateMultiple,
    isTranslating
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 