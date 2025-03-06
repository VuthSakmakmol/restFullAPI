const express = require("express");
const router = express.Router();
const DataType = require("../models/DataType");

// ✅ GET Homepage Data
router.get("/", async (req, res) => {
  try {
    const homepageData = await DataType.findOne({ type: "homepage" });
    if (!homepageData) {
      return res.status(404).json({ message: "Homepage data not found" });
    }
    res.json(homepageData);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ✅ UPDATE Homepage Data
router.put("/", async (req, res) => {
  try {
    const { title, description, image1, image2, image3 } = req.body;

    const updatedData = await DataType.findOneAndUpdate(
      { type: "homepage" },
      { content: { title, description, image1, image2, image3 } },
      { new: true, upsert: true }
    );

    res.json({ message: "Homepage updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error });
  }
});

module.exports = router;
