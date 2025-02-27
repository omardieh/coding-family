import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

function SocketProvider(props) {
  const socket = socketIOClient(import.meta.env.VITE_WEBSOCKET_SERVER_URL, {
    transports: ["polling", "websocket"],
    withCredentials: true,
    autoConnect: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 60000,
    forceNew: true,
    path: "/socket.io", // Make sure this matches your backend path if custom
  });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export { SocketProvider, useSocketContext };
