import { RateLimiterRedis } from 'rate-limiter-flexible';
import { redis } from '../config/redis.js';

const ipLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'rl:ip',
  points: 100, // requests
  duration: 60, // per minute
});

export function rateLimit(req, res, next) {
  const key = req.ip;
  ipLimiter.consume(key, 1)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too many requests' }));
}
