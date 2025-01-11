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

  // Handles fetching conversations for the current users upon initial render
  useEffect(() => {
    fetchConversations(user._id).then((data) =>
      setConversations(data.responseObject),
    );
  }, []);

  /*
   * Helper function to check if the conversation already exists so a new one does not get created
   * Checks if a conversation with the given user id already exists in the list of conversations
   * Returns a boolean indicating whether the conversation already exists
   */
  const checkCurrentConversations = (id: string): boolean => {
    return conversations.some((conversation) =>
      conversation.users.some((user) => user._id === id),
    );
  };

  return (
    <ConversationsContext.Provider
      value={{
        conversations,
        setConversations,
        filteredConversations,
        setFilteredConversations,
        checkCurrentConversations,
      }}
    >
      {children}
    </ConversationsContext.Provider>
  );
};
