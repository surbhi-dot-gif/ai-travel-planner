const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activity_name: { type: String, required: true },
  activity_description: { type: String, required: true },
  activity_location: { type: String, required: true },
  activity_budget: { type: String, required: true },
  activity_link: { type: String, default: "" },
});

const daySchema = new mongoose.Schema({
  day: { type: Number, required: true },   // ✅ critical for regeneration
  activities: { type: [activitySchema], default: [] },
});

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budgetType: { type: String, enum: ["low", "medium", "high"], required: true },
  interests: { type: [String], default: [] },
  itinerary: { type: [daySchema], default: [] }, // ✅ structured by day
});

module.exports = mongoose.model("Trip", tripSchema);