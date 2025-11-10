import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/fittrack';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'fittrack' });
  console.log('MongoDB connected');
}
