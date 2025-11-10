import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { redis } from './config/redis.js';

const PORT = process.env.PORT || 4000;

async function start() {
  await connectDB();
  await redis.ping();
  const server = http.createServer(app);
  server.listen(PORT, () => console.log(`FitTrack API listening on http://localhost:${PORT}`));
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
