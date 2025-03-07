import mongoose from "mongoose";

const connectDB = async () => {
    // Check if already connected to the database
    if (mongoose.connection.readyState === 1) {
        console.log("MongoDB already connected.");
        return;
    }

    if (!process.env.MONGO_URI) {
        throw new Error("MongoDB URI is not defined in environment variables.");
    }

    try {
        // Connect to MongoDB without deprecated options
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Stop the server if unable to connect
    }
    console.log("MongoDB URI:", process.env.MONGO_URI);
};

export default connectDB;