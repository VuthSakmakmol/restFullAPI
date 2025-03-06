const mongoose = require('mongoose');
const DataType = require('../models/DataType');
require('dotenv').config();
const connectDB = require('../config/db');

const seedData = async () => {
    await connectDB();

    // Delete existing data (optional, only if you want a fresh start)
    await DataType.deleteMany();

    // Define your data
    const dataTypes = [
        { type: "homepage", content: { 
            title: "Welcome", 
            image1: "https://i.pinimg.com/736x/3f/da/3b/3fda3b2ef33aad8b4bff418027d0aadf.jpg", 
            image2: "https://i.pinimg.com/736x/9f/5f/64/9f5f642ae7427a0454193834b0e7cfe9.jpg", 
            image3: "https://i.pinimg.com/736x/37/a6/9d/37a69d43758aef0a2efe1646866262cd.jpg", 
            description: "This is the homepage."
        }},
        { type: "about", content: { title: "About Us", description: "Learn more about us." }},
        { type: "services", content: { serviceList: ["Web Development", "SEO", "Marketing"] }},
        { type: "contact", content: { email: "info@example.com", phone: "+123456789" }},
        { type: "projects", content: { recentProjects: ["Project A", "Project B"] }},
        { type: "blog", content: { articles: ["Article 1", "Article 2"] }},
        { type: "faq", content: { faqs: [{ question: "What is this?", answer: "A demo" }] }},
        { type: "testimonials", content: { reviews: ["Great service!", "Highly recommended"] }},
        { type: "team", content: { members: ["Alice", "Bob", "Charlie"] }},
        { type: "portfolio", content: { images: ["image1.jpg", "image2.jpg"] }},
    ];

    // Insert data
    await DataType.insertMany(dataTypes);

    console.log("✅ Default API Data Seeded.");
    process.exit();
};

seedData();
