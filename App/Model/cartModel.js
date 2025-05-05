import mongoose from "mongoose";

// Define the cart item schema
// This schema represents each item in the cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Define the cart schema
// This schema represents the entire cart for a user
// It contains an array of cart items and a reference to the user
// ref tells that userId is a reference to the User model
// and it will be used to populate the user information when needed
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [cartItemSchema],
});

const CartModel = mongoose.model("carts", cartSchema);
export default CartModel;
