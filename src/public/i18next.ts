import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import englishlanguage from './en/translation.json'
import frenshlanguage from './fr/translation.json'
i18n
    .use(initReactI18next)
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: englishlanguage
            },
            fr: {
                translation: frenshlanguage
            },
        }
    });

export default i18n;