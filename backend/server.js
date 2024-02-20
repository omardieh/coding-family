const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

const app = require("./app");
const { connectDB } = require("./config/database.config");
const { useSocketIO } = require("./config/socket.config");

function connectServer() {
  const server = app.listen(process.env.SEVER_PORT, (e) => {
    if (e) {
      console.error("app.listen:", e);
    }
    console.info(`connected Server  | PORT : ${process.env.SEVER_PORT}`);
  });
  useSocketIO(server);
}

connectDB().then(connectServer);
