import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      monday: "monday",
      tuesday: "tuesday",
      wednesday: "wednesday",
      thursday: "thursday",
      friday: "friday",
      saturday: "saturday",
      sunday: "sunday",
      "Open - Closed at": "Open - Closed at",
      "Closed - Open at": "Closed - Open at",
      "Explore this shope": "Explore This Shop",
      "use-my-location": "Use my location",
      "location": "location",
      "Store Locator": "Store Locator",
      "All Stores": "All Stores",
      "Other Stores": "Other Stores",
      "Hours": "Hours",
      "store hours": "store hours",
      "Closed": "Closed",
      "All Week": "All Week",
      "Closed All Week ": "Closed All Week",
      "Store Types":"Store Types",
      "Products":"Services",
      'Call': "Call",
      'Email': "Email",
      "WhatsApp": "WhatsApp",
      "Filter By": "Filter By",
      'Stores within': "Stores within",
      "kilometers at": "kilometers at",
      "nolocation1" : "Sorry, there are no locations near ",
      "nolocation2" : ", satisfying the selected filters. Please modify your search and try again or browse our directory.",
    },
  },
  fr: {
    translation: {
      monday: "Lundi",
      tuesday: "mardi",
      wednesday: "mercredi",
      thursday: "jeudi",
      friday: "vendredi",
      saturday: "samedi",
      sunday: "dimanche",
      "Open - Closed at": "Aktuell geöffnet - Schließt um",
      "Closed - Open at": "Geschlossen - öffnet um",
      "Explore this shope": "Découvrir Cette Boutique",
      "use-my-location": "Meinen Standort verwenden",
      "location": "verwenden",
      "Store Locator": "Store Suchen",
      "All Stores": "Alle Standorte",
      "Other Stores": "Andere Stores",
      "Hours": "Öffnungszeiten",
      "store hours": "Store Öffnungszeiten",
      "Closed": "Fermée",
      "All Week": "Toute la semaine",
      "Closed All Week ": "Fermé toute la semaine",
      "Store Types":"Types de Magasin",
      "Products":"Dienstleistungen",
      'Call': "Par téléphone",
      'Email': "Par e-mail",
      "WhatsApp": "WhatsApp",
      "Filter By": "Filtrer Par",
      'Stores within': "Magasins à moins de",
      "kilometers at": "kilomètres de",
      "nolocation1" : "Désolé, aucun lieu à proximité de ",
      "nolocation2" : ", ne satisfait les filtres sélectionnés. Veuillez modifier votre recherche et réessayer ou parcourir notre répertoire.",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });
export default i18n;
