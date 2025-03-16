import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import {IntlProvider} from 'react-intl';
import localeEnMessages from './locales/en';
import localeEsMessages from './locales/es';



let initLocale = "es-Es";
if (navigator.language === "en"){
    initLocale = "en"
}

function loadMessages(initLocale){
  switch (initLocale){
      case "en":
          return localeEnMessages;
      case "es-ES":
          return localeEsMessages;
      default:
          return localeEsMessages;
  }

}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <IntlProvider locale={initLocale} messages={loadMessages(initLocale)}>
    <Container className="mt-3">
      <App/>
    </Container>       
  </IntlProvider>, document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
