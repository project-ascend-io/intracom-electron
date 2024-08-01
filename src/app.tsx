import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import Settings from "./pages/settings/settings";

const HomePage = () => {
  return (
    <div className="App">
      <Settings />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};
const root = createRoot(document.body);
root.render(<App />);
