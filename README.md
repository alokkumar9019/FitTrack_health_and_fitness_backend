# FitTrack Health & Fitness — Backend (Express + MongoDB + Redis)

A production-ready backend for logging workouts, tracking nutrition, and viewing progress, with JWT auth, RBAC, Redis rate-limiting & token blacklist, Edamam food search, and email notifications.

## Quick Start
```bash
npm i
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


## .env example
PORT=4000
MONGO_URI=mongodb://localhost:27017/fittrack
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
REDIS_URL=redis://localhost:6379
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USER=your_ethereal_user
SMTP_PASS=your_ethereal_pass
EMAIL_FROM="FitTrack <no-reply@fittrack.app>"
EDAMAM_APP_ID=your_app_id
EDAMAM_APP_KEY=your_app_key
CLIENT_URL=http://localhost:5173


