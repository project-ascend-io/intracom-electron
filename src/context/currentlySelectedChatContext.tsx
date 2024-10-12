import { createContext, useContext, useState, FC, useEffect } from "react";

import { Chat } from "../Components/connection/Connection.types";
import { Message } from "../Components/message/Message.types";
import { fetchMessages } from "../services/messagesService";

interface CurrentlySelectedChatContextType {
  currentlySelectedChat: Chat;
  setCurrentlySelectedChat: React.Dispatch<React.SetStateAction<Chat>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [currentlySelectedChat, setCurrentlySelectedChat] = useState<Chat>(
    () => {
      const savedChat = sessionStorage.getItem("currentlySelectedChat");
      return savedChat ? JSON.parse(savedChat) : null;
    },
  );

  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = sessionStorage.getItem("messages");
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    if (currentlySelectedChat) {
      sessionStorage.setItem(
        "currentlySelectedChat",
        JSON.stringify(currentlySelectedChat),
      );
    } else {
      sessionStorage.removeItem("currentlySelectedChat");
    }
  }, [currentlySelectedChat]);

  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("messages", JSON.stringify(messages));
    } else {
      sessionStorage.removeItem("messages");
    }
  }, [messages]);

  return (
    <CurrentlySelectedChatContext.Provider
      value={{
        currentlySelectedChat,
        setCurrentlySelectedChat,
        messages,
        setMessages,
        loading,
        setLoading,
      }}
    >
      {children}
    </CurrentlySelectedChatContext.Provider>
  );
};
