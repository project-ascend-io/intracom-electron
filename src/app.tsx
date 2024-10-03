import { createRoot } from "react-dom/client";
import "./app.css";

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import Login from "./pages/login/login";
import AuthRequired from "./Components/auth-required/auth-required";
import { Home } from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRequired />}>
          <Route path="*" element={<Home />} />
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
