import { Routes, Route, Navigate } from "react-router-dom";
import Settings from "../../pages/settings/settings";
import { DirectMessages } from "../../pages/directMessages/DirectMessages";
import { NewDirectMessage } from "../../pages/newDirectMessage/NewDirectMessage";
import { Conversation } from "../../pages/conversation/Conversation";
import EmailConfiguration from "../../pages/emailConfigurations/email-configuration";

export const ContextWindow = () => {
  return (
    <main className="flex h-full w-5/6 min-w-96">
      <Routes>
        <Route path="/" element={<Navigate to="/messages" />} />
        <Route path="/messages" element={<DirectMessages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/email-configuration" element={<EmailConfiguration />} />
        <Route path="/new-direct-message" element={<NewDirectMessage />} />
        <Route path="/conversation" element={<Conversation />} />
      </Routes>
    </main>
  );
};
