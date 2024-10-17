import { createContext, useContext, useState, useEffect, FC } from "react";

import { Chat } from "../Components/connection/Connection.types";
import { fetchConversations } from "../services/conversationsService";
import { useAuth } from "./auth-context";

interface ConversationsContextType {
  conversations: Chat[];
  setConversations: React.Dispatch<React.SetStateAction<Chat[]>>;
  filteredConversations: Chat[];
  setFilteredConversations: React.Dispatch<React.SetStateAction<Chat[]>>;
  checkCurrentConversations: (id: string) => boolean;
  updateCurrentConversations: (chat: Chat) => void;
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
  const [filteredConversations, setFilteredConversations] =
    useState<Chat[]>(null);

  const { user } = useAuth();

  useEffect(() => {
    fetchConversations(user._id).then((data) =>
      setConversations(data.responseObject),
    );
  }, []);

  const checkCurrentConversations = (id: string): boolean => {
    return conversations.some((conversation) =>
      conversation.users.some((user) => user._id === id),
    );
  };

  const updateCurrentConversations = (chat: Chat) => {
    console.log(chat);
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        filteredConversations,
        setFilteredConversations,
        checkCurrentConversations,
        updateCurrentConversations,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
