const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  type: String,
  size: String,
  images: [String]
});

module.exports = mongoose.model("Product", ProductSchema);
