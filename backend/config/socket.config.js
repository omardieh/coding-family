const socketIO = require("socket.io");
const ChatMessage = require("../models/ChatMessage.model");

function useSocketIO(server) {
  const io = socketIO(server, {
    cors: { origin: [process.env.CLIENT_URL] },
  });
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    ChatMessage.find()
      .populate("user")
      .then((messages) => {
        socket.emit("MessagesFromServer", messages);
      });

    socket.on("MessageToServer", ({ user, message }) => {
      ChatMessage.create({ user, message }).then((createdMessage) => {
        createdMessage
          .populate("user")
          .then((populatedMessage) =>
            io.emit("MessageToClient", populatedMessage)
          );
      });
    });
  });
}

module.exports = {
  useSocketIO,
};
