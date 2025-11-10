import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true, min: 1 }, // minutes
  calories: { type: Number, required: true, min: 0 }
}, { timestamps: true });

export default mongoose.model('Workout', workoutSchema);
