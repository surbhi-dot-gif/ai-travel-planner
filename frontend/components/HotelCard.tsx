interface Hotel {
  name: string;
  rating: number;
  location: string;
}

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{hotel.name}</h3>
      <p className="text-gray-700">Location: {hotel.location}</p>
      <p className="text-gray-600">Rating: ⭐ {hotel.rating}</p>
    </div>
  );
}
