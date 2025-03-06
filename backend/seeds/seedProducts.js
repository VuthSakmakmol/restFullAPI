const mongoose = require('mongoose');
const DataType = require('../models/DataType');
require('dotenv').config();
const connectDB = require('../config/db');

const seedProducts = async () => {
    try {
        await connectDB();

        // Delete existing product data
        await DataType.deleteMany({ type: 'product' });

        // Define structured product data
        const productData = {
            type: "product",
            content: {
                title: "Product",
                card_description: "Description will be added next time",
                products: [
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
                            "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-5.jpg"
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
                            "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-6.jpg"
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
                            "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-6.jpg"
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
                            "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-m-6.jpg"
                        ]
                    },
                ]
            }
        };

        // Insert product data
        await DataType.create(productData);
        console.log("✅ Product Data Seeded Successfully.");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding product data:", error);
        process.exit(1);
    }
};

seedProducts();