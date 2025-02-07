import mongoose from "mongoose";

const connectToDatabase = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("Please add your MongoDB URI to .env.local");
  }
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
    });
    console.log("MongoDB connected successfully");
    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to the database");
  }
};

export default connectToDatabase;
