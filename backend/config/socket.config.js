const socketIO = require("socket.io");

let io;

function connectSocketIO(server) {
  io = socketIO(server, {
    cors: { origin: [process.env.CLIENT_URL] },
  });
}

function useSocketIO() {
  return io;
}

module.exports = {
  connectSocketIO,
  useSocketIO,
};
