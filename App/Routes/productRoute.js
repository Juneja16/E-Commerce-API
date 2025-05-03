import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../Controller/ProductController.js";

let router = express.Router();

router.post("/add", addProduct);
router.get("/getAll", getAllProducts);
router.get("/get/:id", getProductById);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;
export { router as productRoutes };
