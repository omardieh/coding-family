const socketIO = require("socket.io");

function useSocketIO(server) {
  const io = socketIO(server, {
    cors: { origin: [process.env.CLIENT_URL] },
  });
  io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
    const messages = [
      {
        author: "server",
        message:
          "welcome to the webSocket chat app! mad with Node, React and socket.io",
      },
    ];
    socket.emit("MessagesFromServer", messages);
    socket.on("MessageToServer", (message) => {
      messages.push(message);
      io.emit("MessageToClient", message);
    });
  });
}

module.exports = {
  useSocketIO,
};
