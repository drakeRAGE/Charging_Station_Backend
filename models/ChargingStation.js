import mongoose from 'mongoose';

const chargingStationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  powerOutput: {
    type: Number,
    required: true
  },
  connectorType: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const ChargingStation = mongoose.model('ChargingStation', chargingStationSchema);

export default ChargingStation;