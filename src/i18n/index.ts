import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import germanTranslation from './de-DE/translation.json';
import englishTranslation from './en-US/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    de: {
      translation: germanTranslation,
    },
    en: {
      translation: englishTranslation,
    },
  },
  lng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
