const express = require("express");
const router = express.Router();

// GET /packing-list?season=summer
router.get("/", (req, res) => {
  const { season } = req.query;
  // Static sample list — replace with AI later
  const items = [
    "Passport",
    "Travel adapter",
    season === "summer" ? "Sunscreen" : "Warm jacket",
    "Comfortable shoes",
  ];
  res.json({ season: season || "general", items });
});

module.exports = router;
