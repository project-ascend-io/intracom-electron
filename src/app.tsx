import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
// import EmailSettings from "./pages/email-configuration/email-configuration";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings/settings";
import SettingsIndex from "./components/settings-dropdown/setting-index";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login/login";

const HomePage = () => {
  return (
    <div className="App">
      {/* <Settings /> */}
      <Login />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/organizations/:id/settings" element={<SettingsIndex />} />
      </Routes>
    </Router>
  );
};
const root = createRoot(document.body);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
