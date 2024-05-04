import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import backend from "i18next-http-backend";
import Api from "../../service/main";

// TODO: Fetch the translations from Umbraco
const initLang = function initLang(selectedLang = "en") {
  return new Promise((resolve, reject) => {
    i18next
      .use(initReactI18next)
      .use(backend)
      .init(
        {
          partialBundledLanguages: true,
          fallbackLng: false,
          load: "languageOnly",
          lng: selectedLang,
          initImmediate: false,
          saveMissing: false,
          interpolation: {
            escapeValue: false
          },
          react: {
            useSuspense: true
          },
          backend: {
            loadPath: "{{lng}}",
            request: (options, language, payload, callback) => {
              Api.translations
                .get(language)
                .then(({ translation }) => {
                  callback(null, {
                    data: JSON.stringify(translation),
                    status: 200
                  });
                })
                .catch(err => {
                  callback(err);
                });
            }
          }
        },
        err => {
          if (err) {
            return reject(err);
          }
          return resolve(i18next);
        }
      );
  });
};

export default initLang;
