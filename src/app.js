import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';
import workoutRoutes from './routes/workout.routes.js';
import nutritionRoutes from './routes/nutrition.routes.js';
import progressRoutes from './routes/progress.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(',') || '*', credentials: true }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req,res)=>res.json({status:'ok'}));

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/nutrition', nutritionRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
