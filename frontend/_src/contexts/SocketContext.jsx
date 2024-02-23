import { createContext, useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const SocketContext = createContext();

const useSocketContext = () => useContext(SocketContext);

function SocketProvider(props) {
  const socket = socketIOClient(import.meta.env.VITE_SERVER_URL);
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
