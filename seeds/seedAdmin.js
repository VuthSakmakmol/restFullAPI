const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
require("dotenv").config();
const connectDB = require("../config/db");

const seedAdmin = async () => {
    await connectDB();

    // ✅ Check if admin exists
    const existingAdmin = await Admin.findOne({ role: "admin" });
    if (existingAdmin) {
        console.log("✅ Admin already exists:", existingAdmin.email);
        process.exit();
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // ✅ Create admin if not exists
    await Admin.create({
        username: "admin",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
    });

    console.log("✅ Default Admin Created - Email: admin@example.com, Password: admin123");
    process.exit();
};

seedAdmin();
