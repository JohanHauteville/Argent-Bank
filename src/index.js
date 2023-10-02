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
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router>
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/" element={<Connexion />} />
        <Route path="/user/" element={<User />} />
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
