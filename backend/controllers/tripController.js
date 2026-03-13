const Trip = require("../models/Trip");
const fetch = require("node-fetch");

// Gemini API call
async function geminiGenerate(prompt) {
  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // Gemini returns text inside candidates[0].content.parts[0].text
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  } catch (err) {
    console.error("Gemini call failed:", err);
    return "[]"; // fallback empty JSON
  }
}

// Generate itinerary
async function generateItinerary(destination, days, budgetType, interests) {
  const prompt = `Create a ${days}-day travel itinerary for ${destination}.
Budget: ${budgetType}.
Interests: ${interests.join(", ")}.
Return ONLY valid JSON array with objects containing: activity_name, activity_description, activity_location, activity_budget, activity_link.`;

  const itineraryText = await geminiGenerate(prompt);

  if (!itineraryText || itineraryText.trim().length === 0) {
    console.error("Empty response from Gemini");
    return [];
  }

  try {
    return JSON.parse(itineraryText);
  } catch (err) {
    console.error("Parse error:", err, "Raw text:", itineraryText);
    return [];
  }
}

// Create trip
const createTrip = async (req, res) => {
  try {
    const { destination, days, budgetType, interests } = req.body;

    const rawItinerary = await generateItinerary(destination, days, budgetType, interests);

    const itinerary = [];
    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        activities: rawItinerary[i - 1]
          ? [rawItinerary[i - 1]]
          : [{
              activity_name: "Explore local sights",
              activity_description: "Fallback activity when AI fails",
              activity_location: destination,
              activity_budget: budgetType,
              activity_link: "",
            }],
      });
    }

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
    console.error("Error creating trip:", err);
    res.status(500).json({ error: "Error creating trip", details: err.message });
  }
};

// Get all trips
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id });
    res.json(trips);
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ error: "Error fetching trips" });
  }
};

// Get single trip
const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });
    res.json(trip);
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({ error: "Error fetching trip" });
  }
};

// Update day
const updateDay = async (req, res) => {
  try {
    const { id, day, activities } = req.body;
    const trip = await Trip.findOne({ _id: id, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const dayIndex = trip.itinerary.findIndex((d) => d.day === day);
    if (dayIndex === -1) return res.status(404).json({ error: "Day not found" });

    trip.itinerary[dayIndex].activities = activities;
    await trip.save();
    res.json(trip);
  } catch (err) {
    console.error("Error updating itinerary:", err);
    res.status(500).json({ error: "Error updating itinerary" });
  }
};

// Regenerate day
const regenerateDay = async (req, res) => {
  try {
    const { id, day } = req.body;
    const trip = await Trip.findOne({ _id: id, userId: req.user.id });
    if (!trip) return res.status(404).json({ error: "Trip not found" });

    const prompt = `Regenerate activities for Day ${day} of a trip to ${trip.destination}.
Budget: ${trip.budgetType}.
Interests: ${trip.interests.join(", ")}.
Provide a fresh variation.
Return ONLY valid JSON array of activities with fields: activity_name, activity_description, activity_location, activity_budget, activity_link.`;

    const activitiesText = await geminiGenerate(prompt);

    let newActivities;
    try {
      newActivities = JSON.parse(activitiesText);
    } catch {
      console.error("Parse error regenerating day:", activitiesText);
      newActivities = [
        {
          activity_name: "Fallback activity",
          activity_description: "Explore something new",
          activity_location: trip.destination,
          activity_budget: trip.budgetType,
          activity_link: "",
        },
      ];
    }

    const dayIndex = trip.itinerary.findIndex((d) => d.day === day);
    if (dayIndex === -1) return res.status(404).json({ error: "Day not found" });

    trip.itinerary[dayIndex].activities = newActivities;
    await trip.save();

    res.json(trip);
  } catch (err) {
    console.error("Error regenerating itinerary:", err);
    res.status(500).json({ error: "Error regenerating itinerary" });
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateDay,
  regenerateDay,
};
