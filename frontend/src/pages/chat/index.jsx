import React, { useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import { useAuthContext } from "../../contexts/AuthContext";
import ChatScreen from "../../components/ChatScreen";
import ScreenMessages from "../../components/ChatScreen/ScreenMessages";
import SubmitBar from "../../components/ChatScreen/SubmitBar";

export default function Chat() {
  const { user } = useAuthContext();
  const { socket, isConnected } = useSocketContext();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("MessagesFromServer", (messagesFromServer) => {
      setMessages(messagesFromServer);
    });
    socket.on("MessageToClient", (MessageToClient) => {
      setMessages((prev) => [...prev, MessageToClient]);
    });

    return () => socket.disconnect();
  }, [socket, isConnected]);

  const submitNewMessage = () => {
    socket.emit("MessageToServer", { user: user._id, message });
    setMessage("");
  };

  return (
    <>
      <ChatScreen user={user.username || ""}>
        <ScreenMessages messages={messages} />
        <SubmitBar
          inputValue={message}
          onClick={submitNewMessage}
          onChange={(e) => setMessage(e.target.value)}
        />
      </ChatScreen>
    </>
  );
}
