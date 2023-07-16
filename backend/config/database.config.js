const mongoose = require("mongoose");

async function connectDB() {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URL);
    console.log("connected MongoDB | DATABASE:", response.connections[0].name);
  } catch (error) {
    console.error("Failed to connect to MongoDB | error:", error);
    process.exit(1);
  }
}

async function closeDB() {
  try {
    await mongoose.disconnect();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Failed to close MongoDB connection", error);
    process.exit(1);
  }
}

module.exports = { connectDB, closeDB };
