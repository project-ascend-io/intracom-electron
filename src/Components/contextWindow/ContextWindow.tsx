import { Routes, Route } from "react-router-dom";
import Settings from "../../pages/settings/Settings";
import EmailConfiguration from "../../Components/settings-dropdown/email-configuration";

export const ContextWindow = () => {
  return (
    <main className="flex h-full w-5/6 min-w-96">
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-configuration" element={<EmailConfiguration />} />
      </Routes>
    </main>
  );
};
