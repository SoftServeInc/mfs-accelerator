import { i18nCreateInstanceSync } from "./utils/i18nCreateInstance";
import { TRANSLATIONS as COMMON_TRANSLATIONS } from "./consts/Translations/en/Common";

export const i18nnextCommonDashboard = i18nCreateInstanceSync({
  lng: "en",
  contextSeparator: "#",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: COMMON_TRANSLATIONS,
    },
  },
});
