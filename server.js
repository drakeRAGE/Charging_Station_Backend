import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Routes
import { protect } from './middleware/authMiddleware.js';
import {
  createChargingStation,
  getChargingStations,
  getChargingStationById,
  updateChargingStation,
  deleteChargingStation
} from './controllers/chargingStationController.js';

import authRoutes from './routes/authRoutes.js';


// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Charging Station API');
});

app.use('/api/auth', authRoutes);

// Charging Station Routes
app.route('/api/charging-stations')
  .get(getChargingStations)
  .post(protect, createChargingStation);

app.route('/api/charging-stations/:id')
  .get(getChargingStationById)
  .put(protect, updateChargingStation)
  .delete(protect, deleteChargingStation);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});