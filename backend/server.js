const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

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

//Routes
app.use("/api/auth", authRoutes);

//MongoDB Connection
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

const tripRoutes = require("./routes/tripRoutes");
app.use("/api/trips", tripRoutes);

