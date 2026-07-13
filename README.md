# PetHome — Pet Adoption Platform (Client)

## Purpose

PetHome is a full-stack MERN pet adoption platform. This is the **client-side** (React + Vite)
repository. It lets people browse pets available for adoption (dogs, cats, birds, rabbits, and
more), view detailed profiles, and submit adoption requests — while pet owners/shelters can list
pets, manage their own listings, and approve or reject the requests they receive.

## Live URL

🔗 **https://pet-adoption-platform-client-side.vercel.app**

## Server-side Repository

🔗 https://github.com/Ayaka0711/Pet-Adoption-Platform---server---side

## Features

- 🔐 **Authentication** with email/password and Google sign-in, secure HTTPOnly session cookies,
  and no "logged out on refresh" bug on private routes.
- 🐾 **Browse & search pets** — All Pets page with live search by name, species filtering, sorting
  by fee/age, and an option to hide already-adopted pets.
- 📋 **Full pet CRUD** — owners can add, update, and delete their own listings from a protected
  dashboard.
- 💌 **Adoption request workflow** — adopters submit a request with a pickup date and message from
  a modal on the Pet Details page; owners approve or reject from a Requests modal on My Listings.
  Approving one request automatically rejects the pet's other pending requests and marks the pet
  as adopted.
- 📊 **Dashboard** — My Listings (with live stats: total / available / adopted), My Requests, and
  Add Pet, all under a protected dashboard layout with its own sidebar.
- 🌗 **Dark/Light theme toggle** and **Framer Motion animations** throughout (optional
  requirements).
- 🔔 Toast notifications everywhere (no native `alert()`), a custom 404 page, and a loading spinner
  while data fetches.
- 📱 Fully responsive layout for mobile, tablet, and desktop.

## NPM Packages Used

- `react`, `react-dom` — UI library
- `react-router-dom` — client-side routing
- `axios` — HTTP requests to the API
- `better-auth` — authentication client (email/password + Google OAuth, session handling)
- `react-toastify` — toast notifications
- `react-icons` — icon set used across the UI
- `framer-motion` — animations
- `recharts` — available for chart/stat visuals
- `tailwindcss` — utility-first styling

## Tech Stack

React 18 · Vite · React Router · Tailwind CSS · BetterAuth · Axios

## Running Locally

```bash
npm install
cp .env.example .env   # set VITE_API_URL to your running server
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the deployed/local Express server (e.g. `http://localhost:5000`) |

## Deployment

Deployed on **Vercel**. `vercel.json` includes an SPA rewrite rule so that reloading any client
route (e.g. `/all-pets`, `/dashboard/my-listings`) does not throw a 404.
