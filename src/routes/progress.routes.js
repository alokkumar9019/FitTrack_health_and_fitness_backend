import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Workout from '../models/Workout.js';
import NutritionLog from '../models/NutritionLog.js';
import { getRecommendations } from '../services/recommendation.service.js';

const router = Router();
router.use(auth);

router.get('/', async (req,res)=>{
  const since = new Date(Date.now() - 30*24*60*60*1000);
  const [workouts, foods] = await Promise.all([
    Workout.find({ user: req.user._id, createdAt: { $gte: since }}).lean(),
    NutritionLog.find({ user: req.user._id, createdAt: { $gte: since }}).lean(),
  ]);
  const totals = {
    workouts: workouts.length,
    workoutMinutes: workouts.reduce((a,b)=>a+(b.duration||0),0),
    workoutCalories: workouts.reduce((a,b)=>a+(b.calories||0),0),
    foodEntries: foods.length,
    intakeCalories: foods.reduce((a,b)=>a+(b.calories||0),0),
    protein: foods.reduce((a,b)=>a+(b.macros?.protein||0),0),
    carbs: foods.reduce((a,b)=>a+(b.macros?.carbs||0),0),
    fat: foods.reduce((a,b)=>a+(b.macros?.fat||0),0),
  };
  const recommendations = getRecommendations(totals);
  res.json({ totals, recommendations, workouts, foods });
});

export default router;
