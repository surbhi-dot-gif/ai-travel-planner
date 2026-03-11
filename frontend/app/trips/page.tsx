"use client";
import { useEffect, useState } from "react";

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    fetch("http://localhost:5000/api/trips", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTrips(data));
  }, [token]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Trips</h1>
      {trips.length === 0 ? (
        <p>No trips yet. Create one!</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li key={trip._id} className="bg-purple-700 p-4 rounded-lg shadow-lg">
              <a href={`/trips/${trip._id}`} className="text-xl font-semibold hover:underline">
                {trip.destination} ({trip.days} days)
              </a>
              <p className="text-sm">Budget: {trip.budgetType}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
