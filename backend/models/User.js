const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }, // Default role to user
}, { timestamps: true });  // ✅ This automatically adds `createdAt` and `updatedAt`

module.exports = mongoose.model('User', userSchema);
