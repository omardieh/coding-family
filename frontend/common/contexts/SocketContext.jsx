import { createContext, useContext, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = (props) => {
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(socketRef?.current?.connected);

  useEffect(() => {
    socketRef.current = socketIOClient(
      import.meta.env.VITE_WEBSOCKET_SERVER_URL,
      {
        transports: ["polling", "websocket", "flashsocket"],
        withCredentials: true,
        autoConnect: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 60000,
        forceNew: true,
        path: "/socket.io",
      }
    );

    const socket = socketRef.current;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {props.children}
    </SocketContext.Provider>
  );
};
