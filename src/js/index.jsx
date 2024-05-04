import React from "react";
import { hydrate } from "react-dom";
import App from "./containers/app/index";
import initLang from "./i18n";
import { I18nextProvider } from "react-i18next";

initLang().then(i18n => {
  return hydrate(
    <I18nextProvider t={i18n.t} i18n={i18n}>
      <App />
    </I18nextProvider>,
    document.getElementById("root")
  );
});
