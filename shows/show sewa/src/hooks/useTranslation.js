import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useTranslation = (originalText) => {
  const { selectedLanguage, translateText, isTranslating } = useLanguage();
  const [translatedText, setTranslatedText] = useState(originalText);

  useEffect(() => {
    const translate = async () => {
      if (selectedLanguage === 'en') {
        setTranslatedText(originalText);
        return;
      }

      if (originalText) {
        try {
          const translated = await translateText(originalText, selectedLanguage);
          setTranslatedText(translated);
        } catch (error) {
          console.error('Translation error:', error);
          setTranslatedText(originalText);
        }
      }
    };

    translate();
  }, [originalText, selectedLanguage, translateText]);

  return { translatedText, isTranslating };
}; 