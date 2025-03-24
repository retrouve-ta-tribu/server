import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const {
            MONGO_USERNAME,
            MONGO_PASSWORD,
            MONGO_PORT = 27017,
            MONGO_HOST = "localhost",
            MONGO_DATABASE,
        } = process.env;

        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, {
            maxPoolSize: 10,
            authSource: "admin",
            user: MONGO_USERNAME,
            pass: MONGO_PASSWORD,
        });
        
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;
