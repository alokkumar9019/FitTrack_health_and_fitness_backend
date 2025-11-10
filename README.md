# FitTrack Health & Fitness — Backend (Express + MongoDB + Redis)

A production-ready backend for logging workouts, tracking nutrition, and viewing progress, with JWT auth, RBAC, Redis rate-limiting & token blacklist, Edamam food search, and email notifications.

## Quick Start
```bash
npm i
cp .env.example .env
npm run dev
```
Server runs at `http://localhost:${PORT||4000}`.

## Core Endpoints
- `POST /api/auth/register` — register (sends welcome email)
- `POST /api/auth/login` — get JWT
- `POST /api/auth/logout` — blacklist token (Redis)
- `GET  /api/auth/me` — profile
- `POST /api/workouts` — { type, duration, calories }
- `GET  /api/workouts`
- `POST /api/nutrition` — { food, calories, macros }
- `GET  /api/nutrition`
- `GET  /api/nutrition/search?q=apple` — uses Edamam (falls back to demo when keys missing)
- `GET  /api/progress` — 30-day totals + recommendations
- `GET  /api/admin/users` — admin-only

> Note: You requested no tests, so this zip contains no `tests/` folder. You can add Jest/Supertest later if needed.
