import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/main.css";

import { Provider } from "react-redux"; // Import Provider
import store from "./store/store"; // Import Redux store

import { I18nextProvider } from "react-i18next";
import i18n from "i18next";

import translationEN from "./locales/en/translation.json";
import translationKA from "./locales/ka/translation.json";

i18n.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "en", // language to use by default
  resources: {
    en: {
      translation: translationEN,
    },
    ka: {
      translation: translationKA,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);
