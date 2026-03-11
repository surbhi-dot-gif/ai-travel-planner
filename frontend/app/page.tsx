import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <main className="flex flex-col items-center gap-8 text-center px-8">
        <h1 className="text-5xl font-extrabold tracking-tight">
          AI Travel Planner ✈️
        </h1>
        <p className="max-w-xl text-lg leading-8">
          Plan smarter, travel better. Your personalized AI assistant for
          seamless journeys.
        </p>
        <div className="flex gap-6">
          <Link
            href="/register"
            className="bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

