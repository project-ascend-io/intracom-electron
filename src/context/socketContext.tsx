import { createContext, useContext, useEffect, useState, FC } from "react";
import io, { Socket } from "socket.io-client";
import { useAuth } from "./auth-context";
import { useCurrentlySelectedChatContext } from "./currentlySelectedChatContext";
import { useConversationsContext } from "./conversationsContext";
import { useCurrentUsersContext } from "./currentUsersContext";

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

  const { user } = useAuth();
  const {
    currentlySelectedChat,
    setUserIsTypingInCurrentChat,
    updateMessages,
  } = useCurrentlySelectedChatContext();
  const { updateCurrentConversations } = useConversationsContext();
  const { updateCurrentUsers } = useCurrentUsersContext();

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

    socketInstance.on("chatUpdated", (chat) =>
      updateCurrentConversations(chat),
    );

    socketInstance.on("userUpdated", (user) => updateCurrentUsers(user));

    socketInstance.on("message received", (message) => updateMessages(message));

    socketInstance.on("typing", (roomId) => {
      if (currentlySelectedChat._id === roomId)
        setUserIsTypingInCurrentChat(true);
    });

    socketInstance.on("stop typing", (roomId) => {
      if (currentlySelectedChat._id === roomId)
        setUserIsTypingInCurrentChat(false);
    });

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
