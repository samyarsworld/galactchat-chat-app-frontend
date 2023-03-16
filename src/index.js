import React from "react";
import ReactDOM from "react-dom/client";
import "./main.scss";

import { Provider } from "react-redux";
import store from "./store/store.js";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import alertTemplate from "react-alert-template-basic";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AlertProvider template={alertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
);

reportWebVitals();
