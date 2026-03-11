const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: { type: String, required: true },
  days: { type: Number, required: true },
  budgetType: { type: String, enum: ["low", "medium", "high"], required: true },
  interests: [{ type: String }],
  itinerary: [
    {
      day: Number,
      activities: [String],
      budgetBreakdown: String,
    },
  ],
});

module.exports = mongoose.model("Trip", tripSchema);