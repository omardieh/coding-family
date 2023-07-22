require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/database.config");

connectDB().then(connectServer);

function connectServer() {
  app.listen(process.env.SEVER_PORT, (e) => {
    if (e) {
      console.error("app.listen:", e);
    }
    console.info(`connected Server  | PORT : ${process.env.SEVER_PORT}`);
  });
}
