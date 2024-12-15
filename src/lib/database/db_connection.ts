import mongoose from "mongoose";

const connectToDatabase = async () => {
    if (mongoose.connection.readyState >= 1) {
        return mongoose.connection;
    }
    try {
        const connection = await mongoose.connect(
            `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.1itt6.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`, {
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