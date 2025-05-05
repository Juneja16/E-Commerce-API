import express from "express";
import dotenv from "dotenv";
import connectDB from "./App/Config/database.js";
import userRoutes from "./App/Routes/UserRoutes.js";
import productRoutes from "./App/Routes/productRoute.js";
import cartRoutes from "./App/Routes/cartRoute.js";
import cookieParser from "cookie-parser";
const app = express();

// Load environment variables from .env file
dotenv.config();

app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes); // Use user routes
app.use("/api/product", productRoutes); // Use product routes
app.use("/api/cart", cartRoutes); // Use cart routes

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
