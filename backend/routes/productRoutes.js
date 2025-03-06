const express = require('express');
const router = express.Router();
const DataType = require('../models/DataType');

// GET route to fetch product data
router.get('/products', async (req, res) => {
  try {
      const productData = await DataType.findOne({ type: 'product' });
      if (!productData) {
          return res.status(404).json({ message: "No product data found" });
      }

      // Filter out any base64 images before sending response
      const filteredProducts = productData.content.products.map(product => ({
          ...product,
          images: product.images.filter(img => !img.startsWith("data:image"))
      }));

      res.json(filteredProducts);
  } catch (error) {
      console.error("❌ Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
  }
});


// **PUT: Update a product by name**
router.put('/products/:name', async (req, res) => {
    try {
        const { name } = req.params; // Get product name from URL
        const { description, type, size, images } = req.body; // Get updated data from request body

        // Find the product document
        const productData = await DataType.findOne({ type: 'product' });
        if (!productData) {
            return res.status(404).json({ message: "No product data found" });
        }

        // Find the specific product inside the array
        const productIndex = productData.content.products.findIndex(p => p.name === name);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product details
        if (description) productData.content.products[productIndex].description = description;
        if (type) productData.content.products[productIndex].type = type;
        if (size) productData.content.products[productIndex].size = size;
        if (images) productData.content.products[productIndex].images = images;

        // Save changes to database
        await productData.save();

        res.json({ message: "✅ Product updated successfully", product: productData.content.products[productIndex] });
    } catch (error) {
        console.error("❌ Error updating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
