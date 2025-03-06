const express = require("express");
const router = express.Router();
const DataType = require("../models/DataType");

// ✅ FIXED: Correct route for homepage data
router.get("/homepage", async (req, res) => {
  try {
    const homepageData = await DataType.findOne({ type: "homepage" });
    if (!homepageData) {
      return res.status(404).json({ message: "Homepage data not found" });
    }
    res.json(homepageData); // ✅ Ensure it sends JSON
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
