const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // ✅ Ensure email is unique
    password: { type: String, required: true },
    role: { type: String, default: "admin" }, // ✅ Set default role to "admin"
    createdAt: { type: Date, default: Date.now } // ✅ Add created timestamp
});

module.exports = mongoose.model("Admin", adminSchema);
