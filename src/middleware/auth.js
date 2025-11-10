import jwt from 'jsonwebtoken';
import { redis } from '../config/redis.js';
import User from '../models/User.js';

export async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });

    const isBlacklisted = await redis.get(`bl:${token}`);
    if (isBlacklisted) return res.status(401).json({ message: 'Token blacklisted' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token', error: err.message });
  }
}

export function signToken(user) {
  const payload = { sub: user._id.toString(), role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
  return token;
}

export async function logoutToken(token) {
  const ttl = 60 * 60 * 24 * 7; // 7 days
  await redis.set(`bl:${token}`, '1', 'EX', ttl);
}
