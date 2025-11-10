import { Router } from 'express';
import { validationResult } from 'express-validator';
import { auth } from '../middleware/auth.js';
import NutritionLog from '../models/NutritionLog.js';
import { nutritionCreateValidator, nutritionSearchValidator } from '../utils/validators.js';
import { searchFood } from '../services/nutrition.service.js';

const router = Router();
router.use(auth);

router.post('/', nutritionCreateValidator, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const doc = await NutritionLog.create({ user: req.user._id, ...req.body });
  res.status(201).json(doc);
});

router.get('/', async (req,res)=>{
  const page = Math.max(1, parseInt(req.query.page || 1));
  const limit = Math.min(100, parseInt(req.query.limit || 20));
  const docs = await NutritionLog.find({ user: req.user._id }).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit);
  res.json(docs);
});

router.get('/search', nutritionSearchValidator, async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const q = req.query.q;
  const results = await searchFood(q);
  res.json(results);
});

export default router;
