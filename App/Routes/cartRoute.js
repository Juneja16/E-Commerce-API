import express from "express";
import { addToCart } from "../Controller/CartController.js";
import { isAuthenticated } from "../../Middleware/Authentication.js";

const router = express.Router();

router.post("/add-to-cart", isAuthenticated, addToCart);
export default router;
export { router as cartRoute };
