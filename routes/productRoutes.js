const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product"); // ✅ Ensure Product model is used

// ✅ Fetch All Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find(); // ✅ Fetch from Product model
    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }
    res.json(products);
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Fetch Single Product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Multer Storage Setup
const storage = multer.diskStorage({
  destination: "uploads/", // Folder to store images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });


// ✅ Update Product (Fix for 500 Error)
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // ✅ Ensure `id` is valid
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // ✅ Update product in MongoDB
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "✅ Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

module.exports = router;
