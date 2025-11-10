import { Router } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { registerValidator, loginValidator } from '../utils/validators.js';
import { auth, signToken, logoutToken } from '../middleware/auth.js';
import { sendMail } from '../config/email.js';

const router = Router();

router.post('/register', registerValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password });
  try {
    await sendMail({
      to: email,
      subject: 'Welcome to FitTrack!',
      html: `<p>Hello ${name},</p><p>Thanks for registering at FitTrack. Let's smash those goals! 💪</p>`
    });
  } catch(e) {  }
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
});

router.post('/login', loginValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

router.post('/logout', auth, async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) await logoutToken(token);
  res.json({ message: 'Logged out' });
});

router.get('/me', auth, async (req,res)=>{
  res.json({ user: req.user });
});

export default router;
