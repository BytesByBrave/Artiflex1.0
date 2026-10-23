# Dorio — MERN + Tailwind v4

Electric blue / lime / condensed-caps agency site.

## Setup
```bash
npm run install:all
npm run dev                             # API :5001, web :5173 (or next free port)
```

> **Note on MongoDB**: If MongoDB is installed locally or via Atlas, set `MONGO_URI` in `server/.env`. If MongoDB is offline, the API automatically runs in resilient in-memory fallback mode so the app works immediately out of the box!

## Images
Drop files in `client/public/images/`: `hero.jpg`, `founder.jpg`, `cube-1..3.png`, `work-1..4.jpg`.
Sections hide missing images gracefully, so the site runs without them.

## Theme
All tokens live in `client/src/styles/index.css` under `@theme`.
