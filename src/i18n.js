import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './translations/en.json';
import lv from './translations/lv.json';
import lt from './translations/lt.json';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  lng: 'en',
  debug: false,
  resources: {
      en: {
          translation: en,
      },
      lv: {
          translation: lv,
      },
      lt: {
        translation: lt,
    },
  },
});

export { i18n };
