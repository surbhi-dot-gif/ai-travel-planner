# AI Travel Planner

A full‑stack travel planning application built with **Next.js + TailwindCSS (frontend)**, **Express + MongoDB (backend)**, and integrated AI features for itinerary generation, hotel suggestions, and packing lists.

---

## Features
- User Authentication: JWT + bcrypt secure login/registration.
- Trip Management: Create, view, edit, and regenerate itineraries.
- AI Integration:
  - Itinerary generation and day‑wise regeneration (Ollama LLM).
  - Hotel suggestions (stubbed, AI integration in progress).
  - Packing list generator (stubbed, AI integration in progress).
- Frontend UI: Responsive Tailwind cards for trips, hotels, and packing lists.
- Deployment Ready:
  - Frontend → Vercel  
  - Backend → Render/Heroku  
  - Database → MongoDB Atlas

---

## Current Status
- Phases 1–4 complete (auth, trip CRUD, itinerary generation, regeneration).
- Backend endpoints for hotels and packing list (static JSON stubs).
- Frontend itinerary cards, hotel cards, packing list cards.
- AI hotel and packing list prompts are in progress — code is ready, endpoints return JSON, and can be extended with AI later.
- Deployment setup ready (Vercel + Render + MongoDB Atlas).
- Loom walkthrough pending.

---

## Tech Stack
- Frontend: Next.js, TailwindCSS
- Backend: Express.js, MongoDB, JWT
- AI: Ollama LLM (itinerary), stubs for hotels/packing list
- Deployment: Vercel, Render/Heroku, MongoDB Atlas

---

## Getting Started

### Clone & Install
```bash
git clone https://github.com/surbhi-dot-gif/ai-travel-planner
cd ai-travel-plsnner
npm install
