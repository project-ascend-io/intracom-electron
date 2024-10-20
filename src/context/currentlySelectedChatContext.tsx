import { createContext, useContext, useState, FC, useEffect } from "react";

import { Chat } from "../Components/connection/Connection.types";
import { Message } from "../Components/message/Message.types";
import { fetchMessages } from "../services/messagesService";

interface CurrentlySelectedChatContextType {
  currentlySelectedChat: Chat;
  setCurrentlySelectedChat: React.Dispatch<React.SetStateAction<Chat | null>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  userIsTypingInCurrentChat: boolean;
  setUserIsTypingInCurrentChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentlySelectedChatContext = createContext<
  CurrentlySelectedChatContextType | undefined
>(undefined);

export const useCurrentlySelectedChatContext =
  (): CurrentlySelectedChatContextType => {
    const context = useContext(CurrentlySelectedChatContext);

    if (!context) {
      throw new Error(
        "useCurrentlySelectedChatContext must be used within a CurrentlySelectedChatProvider",
      );
    }

    return context;
  };

export const CurrentlySelectedChatProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [currentlySelectedChat, setCurrentlySelectedChat] =
    useState<Chat | null>(() => {
      const chat = sessionStorage.getItem("currentlySelectedChat");
      return chat ? JSON.parse(chat) : null;
    });

  const [userIsTypingInCurrentChat, setUserIsTypingInCurrentChat] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Handles updating fetching messages for the current chat whenever a new conversation is selected
  useEffect(() => {
    if (currentlySelectedChat && currentlySelectedChat._id) {
      setLoading(true);
      fetchMessages(currentlySelectedChat._id).then((data) => {
        setMessages(data.responseObject);
        setLoading(false);
      });
    } else {
      setMessages([]);
    }
  }, [currentlySelectedChat]);

  // Stores the currentlySelectedChat in sessionStorage to handle app refreshes/reloads
  useEffect(() => {
    if (currentlySelectedChat !== null) {
      sessionStorage.setItem(
        "currentlySelectedChat",
        JSON.stringify(currentlySelectedChat),
      );
    } else {
      sessionStorage.removeItem("currentlySelectedChat");
    }
  }, [currentlySelectedChat]);

  return (
    <CurrentlySelectedChatContext.Provider
      value={{
        currentlySelectedChat,
        setCurrentlySelectedChat,
        messages,
        setMessages,
        loading,
        setLoading,
        userIsTypingInCurrentChat,
        setUserIsTypingInCurrentChat,
      }}
    >
      {children}
    </CurrentlySelectedChatContext.Provider>
  );
};
