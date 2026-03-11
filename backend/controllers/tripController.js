const Trip = require("../models/Trip");

// Create trip
const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    // Simple placeholder itinerary (later replaced with AI call)
    const itinerary = Array.from({ length: days }, (_, i) => ({
      day: i + 1,
      activities: ["Explore city", "Try local food"],
      budgetBreakdown: budgetType,
    }));

    const trip = new Trip({
      userId: req.user.id,
      destination,
      days,
      budgetType,
      interests,
      itinerary,
    });

    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Error creating trip" });
  }
};

// Get trips for logged-in user
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: "Error fetching trips" });
  }
};

module.exports = { createTrip, getTrips };

// Update a specific day in itinerary
const updateDay = async (req, res) => {
  try {
    const { id, day, activities } = req.body;
    const trip = await Trip.findOne({ _id: id, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const dayPlan = trip.itinerary.find((d) => d.day === day);
    if (!dayPlan) return res.status(404).json({ error: "Day not found" });

    dayPlan.activities = activities;
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Error updating itinerary" });
  }
};

// Regenerate a day (later with AI)
const regenerateDay = async (req, res) => {
  try {
    const { id, day } = req.body;
    const trip = await Trip.findOne({ _id: id, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const dayPlan = trip.itinerary.find((d) => d.day === day);
    if (!dayPlan) return res.status(404).json({ error: "Day not found" });

    // Placeholder regeneration (AI integration next)
    dayPlan.activities = ["Visit museum", "Dinner at local restaurant"];
    await trip.save();
    res.json(trip);
  } catch (err) {
    res.status(500).json({ error: "Error regenerating itinerary" });
  }
};

module.exports = { createTrip, getTrips, updateDay, regenerateDay };

