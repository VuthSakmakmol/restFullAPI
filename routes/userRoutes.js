const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();  // ✅ Define router before using it
const User = require("../models/User");
const Admin = require("../models/Admin"); // ✅ Import Admin model

// ✅ User Registration Route
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // ✅ Ensure email is unique
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: "user",  // ✅ Default role is "user"
            createdAt: new Date() // ✅ Store registration timestamp
        });

        await newUser.save();

        // ✅ Return user info
        res.status(201).json({
            message: "User registered successfully",
            role: newUser.role,
            email: newUser.email,
            createdAt: newUser.createdAt  
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// ✅ Modify response in userRoutes.js
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    let role = "user"; // Default role

    if (!user) {
        user = await Admin.findOne({ email });
        role = "admin";
    }

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Only return necessary data (no full user object)
    res.json({ 
        role,
        email: user.email 
    });
});


module.exports = router;  // ✅ Ensure the router is exported
