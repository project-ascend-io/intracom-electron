import { Routes, Route } from "react-router-dom";
import Settings from "../../pages/settings/settings";
import EmailConfiguration from "../../Components/settings-dropdown/email-configuration";
import { DirectMessages } from "../../pages/directMessages/DirectMessages";

export const ContextWindow = () => {
  return (
    <main className="flex h-full w-5/6 min-w-96">
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-configuration" element={<EmailConfiguration />} />
        <Route path="/messages" element={<DirectMessages />} />
      </Routes>
    </main>
  );
};
