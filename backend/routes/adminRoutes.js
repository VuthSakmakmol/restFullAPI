const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const Admin = require("../models/Admin");

// ✅ Admin Login (Using Email)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // ✅ Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            email: admin.email,
            role: admin.role,
            createdAt: admin.createdAt
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
