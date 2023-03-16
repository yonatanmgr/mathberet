import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { HE_TRANSLATION } from './locals/he';
import { EN_TRANSLATION } from './locals/en';
import { RU_TRANSLATION } from './locals/ru';
import { AR_TRANSLATION } from './locals/ar';

const resources = {
  en: { translation: EN_TRANSLATION },
  he: { translation: HE_TRANSLATION },
  ru: { translation: RU_TRANSLATION },
  ar: { translation: AR_TRANSLATION },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: ['en', 'he'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
