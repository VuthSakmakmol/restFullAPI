const mongoose = require("mongoose");
const Product = require("../models/Product"); // New product model
const connectDB = require("../config/db");

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();

    // Insert new products
    const products = await Product.insertMany([
      {
        name: "Modern Elegance",
        description: "A modern architectural style with a focus on minimalism.",
        type: "modern",
        size: "10 x 20 m",
        images: [
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-1.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-2.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-4.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-6.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-5.jpg",
        ]
      },
      {
        name: "Classic Mansion",
        description: "Timeless elegance with intricate detailing.",
        type: "classic",
        size: "15 x 25 m",
        images: [
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-4.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-1.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-5.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-2.jpg",
          "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-6.jpg",
        ]
      }
    ]);

    console.log("✅ Products Seeded Successfully:", products);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
