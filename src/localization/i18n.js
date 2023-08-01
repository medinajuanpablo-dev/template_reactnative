import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { format as formatDate, formatRelative, formatDistance, isDate } from 'date-fns';
import { enUS as en, es } from 'date-fns/locale'; // import all locales we need
import config from '../config';

const locales = { en, es }; // used to look up the required locale

i18next
  .use(initReactI18next)
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    lng: config.DEFAULT_LANGUAGE,
    fallbackLng: config.DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
      format: (value, format, lng) => {
        if (isDate(value)) {
            const locale = locales[lng];
            if (format === "short")
                return formatDate(value, "P", { locale });
            if (format === "long")
                return formatDate(value, "PPPP", { locale });
            if (format === "relative")
                return formatRelative(value, new Date(), { locale });
            if (format === "ago")
                return formatDistance(value, new Date(), {
                    locale,
                    addSuffix: true
                });
            return formatDate(value, format, { locale });
        }
      }      
    },
    debut: true,
    supportedLngs: config.SUPPORTED_LANGUAGES,
    ns: ['translation'],
    defaultNS: 'translation',    
    preload: [config.DEFAULT_LANGUAGE],
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: config.BASE_API_URL + '/internal/locales/{{lng}}/{{ns}}.json'
    }    
  });

i18next.on('languageChanged', function(lng) {
  console.log('i18next:: LANGUAGE CHANGED TO', lng );
})

export default i18next;
