import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import groupRoutes from "./routes/groupRoutes";
import pointOfInterestRoutes from "./routes/pointOfInterestRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/points', pointOfInterestRoutes);

export default app;
