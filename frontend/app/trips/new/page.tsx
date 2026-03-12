"use client";
import { useState } from "react";

export default function NewTripPage() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState(3);
  const [budgetType, setBudgetType] = useState("medium");
  const [interests, setInterests] = useState("");
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const createTrip = async () => {
    if (!token) {
      alert("You must be logged in to create a trip.");
      return;
    }
    if (!destination.trim()) {
      alert("Destination is required.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination,
          days,
          budgetType,
          interests: interests
            .split(",")
            .map((i) => i.trim())
            .filter((i) => i.length > 0),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create trip: ${res.status} ${errText}`);
      }

      const newTrip = await res.json();
      window.location.href = `/trips/${newTrip._id}`;
    } catch (err) {
  console.error("Error creating trip:", err);
  if (err instanceof Error) {
    alert(`Could not create trip: ${err.message}`);
  } else {
    alert("Could not create trip: Unknown error");
  }
}
;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Create New Trip</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <input
          type="number"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="p-2 rounded text-black w-full"
        />
        <select
          value={budgetType}
          onChange={(e) => setBudgetType(e.target.value)}
          className="p-2 rounded text-black w-full"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="p-2 rounded text-black w-full"
        />
        <button
          onClick={createTrip}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </div>
    </div>
  );
}
