import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import germanTranslation from './de-DE/translation.json';
import englishTranslation from './en-US/translation.json';

const savedLang = localStorage.getItem('lang') || 'de';

i18n.use(initReactI18next).init({
  resources: {
    de: {
      translation: germanTranslation,
    },
    en: {
      translation: englishTranslation,
    },
  },
  lng: savedLang,
  fallbackLng: 'de',
  interpolation: {
    escapeValue: false,
  },
});

window.addEventListener('languageChanged', (e: Event) => {
  if (e instanceof CustomEvent && e.detail?.lang) {
    if (e.detail?.lang && e.detail.lang !== i18n.language) {
      i18n.changeLanguage(e.detail.lang);
    }
  }
});

const changeLanguage = (lang: string) => {
  localStorage.setItem('lang', lang);
  window.dispatchEvent(
    new CustomEvent('languageChanged', { detail: { lang } })
  );
};

export { changeLanguage };

export default i18n;
