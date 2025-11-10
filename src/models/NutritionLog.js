import mongoose from 'mongoose';

const macroSchema = new mongoose.Schema({
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
}, { _id: false });

const nutritionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: String, required: true },
  calories: { type: Number, required: true, min: 0 },
  macros: { type: macroSchema, default: () => ({}) }
}, { timestamps: true });

export default mongoose.model('NutritionLog', nutritionSchema);
