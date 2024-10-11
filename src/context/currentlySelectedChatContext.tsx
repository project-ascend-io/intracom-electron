import { createContext, useContext, useState, FC, useEffect } from "react";

import { Chat } from "../Components/connection/Connection.types";
import { Message } from "../Components/message/Message";
import { fetchMessages } from "../services/messagesService";

interface CurrentlySelectedChatContextType {
  currentlySelectedChat: Chat;
  setCurrentlySelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
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
    useState<Chat>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (currentlySelectedChat && currentlySelectedChat._id) {
      fetchMessages(currentlySelectedChat._id).then((data) => {
        setMessages(data.responseObject);
      });
    } else {
      setMessages([]);
    }
  }, [currentlySelectedChat]);

  return (
    <CurrentlySelectedChatContext.Provider
      value={{
        currentlySelectedChat,
        setCurrentlySelectedChat,
        messages,
        setMessages,
      }}
    >
      {children}
    </CurrentlySelectedChatContext.Provider>
  );
};
