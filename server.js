require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require("./routes/productRoutes");
const aboutRoutes = require("./routes/aboutRoutes");


const app = express(); // ✅ FIXED: Moved `app` initialization to the top
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" })); 

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();


// ✅ Ensure routes are correctly set
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/homepage", homeRoutes);
app.use("/api", productRoutes);
app.use("/api/about", aboutRoutes);



// Server Listening
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
