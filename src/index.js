import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./styles.scss";

import Home from "./pages/Home";
import Connexion from "./pages/Connexion";
import User from "./pages/User";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import store from "./store/store";
import { APP_ROUTES } from "./utils/constants";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Banner />
      <Routes>
        <Route path={APP_ROUTES.HOME} element={<Home />} />
        <Route path={APP_ROUTES.SIGN_IN} element={<Connexion />} />
        <Route path={APP_ROUTES.PROFILE} element={<User />} />
      </Routes>
      <Footer />
    </Router>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
