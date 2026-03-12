"use client";
import { useEffect, useState } from "react";

export default function TripsPage() {
  const [trips, setTrips] = useState<any[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/trips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch trips: ${res.status}`);
        const data = await res.json();
        setTrips(data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchTrips();
  }, [token]);

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <ul className="space-y-4">
          {trips.map((trip) => (
            <li key={trip._id} className="bg-purple-700 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{trip.destination}</h2>
              <p>{trip.days} days | Budget: {trip.budgetType}</p>
              <a
                href={`/trips/${trip._id}`}
                className="text-blue-300 underline mt-2 inline-block"
              >
                View Itinerary
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}