import { IDatabaseConfig } from "@/types";
import colors from "colors";
import mongoose from "mongoose";

export class DatabaseConfig implements IDatabaseConfig {
  public async connectDB() {
    try {
      const response = await mongoose.connect(`${process.env.MONGODB_URL}`);
      console.info(
        [
          "🗃️ ",
          colors.bgBlack.bold(` DATABASE `),
          ` Atlas is connected, database name: `,
          colors.blue(`${response.connections[0].name}`),
        ].join("")
      );
    } catch (error) {
      console.error("Failed to connect to MongoDB | error:", error);
      process.exit(1);
    }
  }
  public async closeDB() {
    try {
      await mongoose.disconnect();
      console.info("disconnected MongoDB");
    } catch (error) {
      console.error("Failed to close MongoDB connection", error);
      process.exit(1);
    }
  }
}
