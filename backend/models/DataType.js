const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  name: String,
  description: String,
  type: String,
  size: String,
  images: [String]
});

const DataTypeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  content: {
    title: String,
    card_description: String,
    products: [ProductSchema] // Make sure this is an array of subdocuments
  }
});

module.exports = mongoose.model("DataType", DataTypeSchema);
