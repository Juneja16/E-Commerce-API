import mongoose from "mongoose";
import CartModel from "../Model/cartModel.js";

// Function to add an item to the cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, title, price } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Check if the cart already exists for the user
    let cart = await CartModel.findOne({ userId });

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = new CartModel({
        userId,
        items: [],
      });
    }

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If the item exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = price * quantity; // Update the price if needed
    } else {
      // If the item doesn't exist, add it to the cart
      cart.items.push({ productId, quantity, title, price });
    }

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get the cart for a user
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the cart for the user
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to remove an item from the cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the cart for the user
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item removed from cart successfully", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to clear the cart
export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the cart for the user
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear the items in the cart
    cart.items = [];

    // Save the updated cart to the database
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to update the quantity of an item in the cart
export const updateItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Find the cart for the user
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Update the item's quantity
    cart.items[itemIndex].quantity = quantity;

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item quantity updated successfully", cart });
  } catch (error) {
    console.error("Error updating item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Decrease the quantity of an item in the cart
export const decreaseItemQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Decrease the item's quantity by 1
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      // If quantity is 1, remove the item from the cart
      cart.items.splice(itemIndex, 1);
    }

    // Save the updated cart to the database
    await cart.save();

    res
      .status(200)
      .json({ message: "Item quantity decreased successfully", cart });
  } catch (error) {
    console.error("Error decreasing item quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
