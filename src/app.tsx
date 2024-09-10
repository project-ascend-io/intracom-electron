import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings/settings";
import SettingsIndex from "./Components/settings-dropdown/setting-index";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login/login";
import AuthRequired from "./Components/auth-required/auth-required";
//TODO: Remove this later
import { useAuth } from "./context/auth-context";
import { checkUser, logoutUser } from "./services/auth";
import EmailConfiguration from "./Components/settings-dropdown/email-configuration";

const HomePage = () => {
  const { setUser } = useAuth();
  const logout = async () => {
    const res = await logoutUser();
    if (res.success) setUser(null);
  };
  return (
    <div className="">
      <Link to="/settings">Go to settings</Link>
      <button onClick={logout}>Log out</button>
      <button onClick={checkUser}>Check User</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRequired />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/setting-index" element={<SettingsIndex />} />

          <Route path="/email-configuration" element={<EmailConfiguration />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};
const root = createRoot(document.body);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
