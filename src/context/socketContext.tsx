import { createContext, useContext, useEffect, useState, FC } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth-context";
import { useCurrentlySelectedChatContext } from "./currentlySelectedChatContext";
import { useConversationsContext } from "./conversationsContext";
import { useCurrentUsersContext } from "./currentUsersContext";
import { useNavigate } from "react-router-dom";

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const navigate = useNavigate();

  const { user } = useAuth();
  const { setCurrentlySelectedChat, setMessages } =
    useCurrentlySelectedChatContext();
  const { setConversations, setFilteredConversations } =
    useConversationsContext();
  const { setCurrentUsers, setFilteredCurrentUsers } = useCurrentUsersContext();

  useEffect(() => {
    const socketInstance = io(process.env.API_URL);

    socketInstance.on("connect", () => {
      socketInstance.emit("setup", user);
    });

    socketInstance.on("connected", () => {
      setSocket(socketInstance);
    });

    socketInstance.on("disconnect", () => {
      setSocket(null);
    });

    socketInstance.on("chats change", (chat) => {
      setFilteredConversations(null);
      setConversations((prevConversations) => [...prevConversations, chat]);
    });

    socketInstance.on("chats delete", (deletedChatId) => {
      setConversations((prevConversations) =>
        prevConversations.filter(
          (conversation) => conversation._id !== deletedChatId,
        ),
      );
      const currentChatId = sessionStorage.getItem("currentlySelectedChat");
      if (JSON.parse(currentChatId)._id === deletedChatId) {
        setCurrentlySelectedChat(null);
        navigate("/messages");
      }
    });

    socketInstance.on("users change", (user) =>
      setCurrentUsers((prevUsers) => [...prevUsers, user]),
    );

    socketInstance.on("users delete", (deletedUserId) => {
      setCurrentUsers((prevUsers) => {
        return prevUsers.filter((user) => user._id !== deletedUserId);
      });
      setFilteredCurrentUsers(null);
    });

    socketInstance.on("messages change", (message) => {
      const currentChatId = sessionStorage.getItem("currentlySelectedChat");
      if (JSON.parse(currentChatId)._id === message.chat) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    socketInstance.on("messages delete", (deletedMessageId) =>
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== deletedMessageId),
      ),
    );

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
