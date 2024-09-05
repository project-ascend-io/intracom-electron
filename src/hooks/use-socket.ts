import { useEffect, useRef } from "react";
import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";

export const useSocket = (
  uri: string,
  opts?: Partial<ManagerOptions & SocketOptions>,
): Socket => {
  // io defines how to connect to the server socket
  // useref creates a reference for this object that can be used throughout the react app
  const { current: socket } = useRef(io(uri, opts));

  useEffect(() => {
    //clean up function to close socket when webpage is closed
    return () => {
      if (socket) socket.close();
    };
  }, [socket]);

  return socket;
};
