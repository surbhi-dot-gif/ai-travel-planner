"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TripDetailPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<any>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/trips`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t: any) => t._id === id);
        setTrip(found);
      });
  }, [id]);

  const regenerateDay = async (day: number) => {
    await fetch("http://localhost:5000/api/trips/regenerate-day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id, day }),
    });
    location.reload();
  };

  if (!trip) return <p>Loading...</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Itinerary for {trip.destination}
      </h1>
      {trip.itinerary.map((dayPlan: any) => (
        <div
          key={dayPlan.day}
          className="bg-purple-700 p-4 rounded-lg mb-4 shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-2">Day {dayPlan.day}</h2>
          <ul className="list-disc ml-6 mb-2">
            {dayPlan.activities.map((act: string, i: number) => (
              <li key={i}>{act}</li>
            ))}
          </ul>
          <button
            onClick={() => regenerateDay(dayPlan.day)}
            className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded"
          >
            Regenerate Day
          </button>
        </div>
      ))}
    </div>
  );
}
