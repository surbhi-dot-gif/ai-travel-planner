const express = require("express");
const router = express.Router();
const { createTrip, getTrips, getTripById, updateDay, regenerateDay } = require("../controllers/tripController");
const authMiddleware = require("../middleware/authMiddleware");

// Correct routes
router.post("/", authMiddleware, createTrip);          // POST /api/trips
router.get("/", authMiddleware, getTrips);             // GET /api/trips
router.get("/:id", authMiddleware, getTripById);       // GET /api/trips/:id
router.patch("/:id/day", authMiddleware, updateDay);   // PATCH /api/trips/:id/day
router.post("/regenerate-day", authMiddleware, regenerateDay);

module.exports = router;