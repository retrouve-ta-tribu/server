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
      const mongoURI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
      await mongoose.connect(mongoURI);
      console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
