const express = require("express");
const router = express.Router();

// GET /hotels/:destination
router.get("/:destination", (req, res) => {
  const { destination } = req.params;
  // Static sample data — replace with AI later
  const hotels = [
    { name: "Grand Palace Hotel", rating: 4.5, location: destination },
    { name: "Budget Inn", rating: 3.8, location: destination },
  ];
  res.json({ destination, hotels });
});

module.exports = router;
