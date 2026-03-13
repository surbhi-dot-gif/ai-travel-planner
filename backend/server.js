const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS so frontend (localhost:3000) can call backend (localhost:5000)
app.use(
  cors({
    origin: "http://localhost:3000", // allow Next.js dev server
    credentials: true,
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const tripRoutes = require("./routes/tripRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

//Hotel and PackingList
const hotelsRouter = require("./routes/hotels");
const packingListRouter = require("./routes/packingList");

app.use("/api/hotels", hotelsRouter);
app.use("/api/packing-list", packingListRouter);

// Root route for Render
app.get("/", (req, res) => {
  res.send("AI Travel Planner Backend is live 🚀");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));