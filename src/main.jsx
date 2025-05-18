// File: /src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import store, { persistor } from "./store/store";
import { injectStore } from "./utils/axiosInstance";
import Loader from "./components/Loader";
import { UIProvider } from "./context/UIContext"

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // for collapsible behavior

// Inject store into axios instance before rendering app
injectStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <UIProvider>
          <Router>
            <App />
          </Router>
        </UIProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
