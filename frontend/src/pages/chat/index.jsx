import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

export default function Chat() {
  const socket = socketIOClient(`http://localhost:4000`);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    text: "",
    author: "",
  });

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("MessagesFromServer", (messagesFromServer) => {
      setMessages(messagesFromServer);
    });

    socket.on("MessageToClient", (MessageToClient) => {
      setMessages((prev) => [...prev, MessageToClient]);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => socket.disconnect();
  }, []);
  console.log(messages);
  return <>Chat Page</>;
}
