import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import languageDetector from 'i18next-browser-languagedetector';
import en from "./en.json";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en
  }
};

const options = {
  order: ['querystring', 'navigator', 'localStorage']
}

i18n
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: options,
    resources,
    keySeparator: false, // we do not use keys in form messages.welcome

    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;