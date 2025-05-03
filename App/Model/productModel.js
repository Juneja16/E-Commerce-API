import mongoose from "mongoose";

const productSchema = new mongoose.Schema({}, { strict: false });
const ProductModel = mongoose.model("products", productSchema);
export default ProductModel;
