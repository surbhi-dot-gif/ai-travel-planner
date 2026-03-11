const express = require("express");
const {
  createTrip,
  getTrips,
  updateDay,
  regenerateDay,
} = require("../controllers/tripController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new trip
router.post("/", authMiddleware, createTrip);

// Get all trips for logged-in user
router.get("/", authMiddleware, getTrips);

// Update a specific day in itinerary
router.patch("/update-day", authMiddleware, updateDay);

// Regenerate a specific day in itinerary
router.post("/regenerate-day", authMiddleware, regenerateDay);

module.exports = router;
