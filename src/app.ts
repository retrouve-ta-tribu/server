import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

export default app;
