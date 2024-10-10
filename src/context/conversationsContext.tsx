import { createContext, useContext, useState, useEffect, FC } from "react";

import { Chat } from "../Components/connection/Connection.types";
import { fetchConversations } from "../services/conversations";
import { useAuth } from "./auth-context";

interface ConversationsContextType {
  conversations: Chat[];
  setConversations: React.Dispatch<React.SetStateAction<Chat[]>>;
}

const ConversationsContext = createContext<
  ConversationsContextType | undefined
>(undefined);

export const useConversationsContext = (): ConversationsContextType => {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw new Error(
      "useConversationsContext must be used within a ConversationsProvider",
    );
  }

  return context;
};

export const ConversationsProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [conversations, setConversations] = useState<Chat[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    fetchConversations(user._id).then((data) =>
      setConversations(data.responseObject),
    );
  }, []);

  return (
    <ConversationsContext.Provider value={{ conversations, setConversations }}>
      {children}
    </ConversationsContext.Provider>
  );
};
