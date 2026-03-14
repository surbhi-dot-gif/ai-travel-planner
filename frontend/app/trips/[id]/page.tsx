"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HotelCard from "@/components/HotelCard";
import PackingListCard from "@/components/PackingListCard";

interface Activity {
  day: number;
  title: string;
  description: string;
}

interface Trip {
  _id: string;
  destination: string;
  activities: Activity[];
}

export default function TripPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);
  const [hotels, setHotels] = useState<any[]>([]);
  const [packingList, setPackingList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchTrip() {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://ai-travel-planner-bzx1.onrender.com/api/trips/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error(`Failed to fetch trip: ${res.status}`);
      const data = await res.json();
      setTrip(data);

      if (data.destination) {
        const hotelRes = await fetch(
          `https://ai-travel-planner-bzx1.onrender.com/api/hotels/${data.destination}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (hotelRes.ok) {
          const hotelData = await hotelRes.json();
          setHotels(hotelData.hotels || []);
        }

        const packRes = await fetch(
          `https://ai-travel-planner-bzx1.onrender.com/api/packing-list?season=summer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (packRes.ok) {
          const packData = await packRes.json();
          setPackingList(packData.items || []);
        }
      }
    }
    fetchTrip();
  }, [id]);

  async function regenerateDay(day: number) {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `https://ai-travel-planner-bzx1.onrender.com/api/trips/${id}/regenerateDay/${day}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) throw new Error(`Failed to regenerate day: ${res.status}`);
    const data = await res.json();
    setTrip(data);
  }

  if (!trip) return <div className="p-6">Loading trip...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">{trip.destination} Itinerary</h1>

      {trip.activities.map((act) => (
        <div
          key={act.day}
          className="border rounded-lg p-4 shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold">
            Day {act.day}: {act.title}
          </h2>
          <p className="text-gray-700">{act.description}</p>
          <button
            onClick={() => regenerateDay(act.day)}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Regenerate Day
          </button>
        </div>
      ))}

      <div>
        <h2 className="text-xl font-bold">Hotels</h2>
        <div className="space-y-4 mt-2">
          {hotels.map((hotel, idx) => (
            <HotelCard key={idx} hotel={hotel} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold">Packing List</h2>
        <PackingListCard items={packingList} />
      </div>
    </div>
  );
}
