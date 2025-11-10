import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import User from '../models/User.js';

const router = Router();

router.use(auth, requireRole('admin'));

router.get('/users', async (req,res)=>{
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json(users);
});

export default router;
