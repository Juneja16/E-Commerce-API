import jwt from "jsonwebtoken"; // Import the jsonwebtoken library for token verification
import dotenv from "dotenv";
import { UserModel } from "../App/Model/UserModel.js";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token2s; // Get the token from cookies
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
