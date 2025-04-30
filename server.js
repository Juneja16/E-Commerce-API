import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./App/Config/database.js";
import userRoutes from "./App/Routes/UserRoutes.js";
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes); // Use user routes

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
