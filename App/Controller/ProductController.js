import mongoose from "mongoose";
import ProductModel from "../Model/productModel.js";
import dotenv from "dotenv";
dotenv.config();

// Add a Product
export const addProduct = async (req, res) => {
  let addProductResponse = await ProductModel.create(req.body);
  res
    .status(201)
    .json({ message: "Product added successfully!", data: addProductResponse });
};

// Get All Products
export const getAllProducts = async (req, res) => {
  let getAllProductsResponse = await ProductModel.find({});
  res.status(200).json(getAllProductsResponse);
};

//update a Product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res
    .status(200)
    .json({ message: "Product updated successfully!", data: updatedProduct });
};

// Delete a Product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await ProductModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted successfully!" });
};

// Get a Product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found!" });
  }
  res.status(200).json(product);
};
