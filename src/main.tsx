import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/fonts.css";
import { store } from "./app/store/store.ts";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistStore(store)}>
          <Routes>
            <Route element={<App />} path="/*" />
          </Routes>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
