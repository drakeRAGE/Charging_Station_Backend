import ChargingStation from '../models/ChargingStation.js';
import asyncHandler from 'express-async-handler';

// @desc    Create a new charging station
// @route   POST /api/charging-stations
// @access  Private
const createChargingStation = asyncHandler(async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;

  const chargingStation = await ChargingStation.create({
    name,
    location,
    status,
    powerOutput,
    connectorType,
    createdBy: req.user._id
  });

  res.status(201).json(chargingStation);
});

// @desc    Get all charging stations
// @route   GET /api/charging-stations
// @access  Public
const getChargingStations = asyncHandler(async (req, res) => {
  const chargingStations = await ChargingStation.find({}).populate('createdBy', 'name email');
  res.json(chargingStations);
});

// @desc    Get single charging station
// @route   GET /api/charging-stations/:id
// @access  Public
const getChargingStationById = asyncHandler(async (req, res) => {
  const chargingStation = await ChargingStation.findById(req.params.id).populate('createdBy', 'name email');

  if (chargingStation) {
    res.json(chargingStation);
  } else {
    res.status(404);
    throw new Error('Charging station not found');
  }
});

// @desc    Update a charging station
// @route   PUT /api/charging-stations/:id
// @access  Private
const updateChargingStation = asyncHandler(async (req, res) => {
  const { name, location, status, powerOutput, connectorType } = req.body;

  const chargingStation = await ChargingStation.findById(req.params.id);

  if (chargingStation) {
    chargingStation.name = name || chargingStation.name;
    chargingStation.location = location || chargingStation.location;
    chargingStation.status = status || chargingStation.status;
    chargingStation.powerOutput = powerOutput || chargingStation.powerOutput;
    chargingStation.connectorType = connectorType || chargingStation.connectorType;

    const updatedChargingStation = await chargingStation.save();
    res.json(updatedChargingStation);
  } else {
    res.status(404);
    throw new Error('Charging station not found');
  }
});

// @desc    Delete a charging station
// @route   DELETE /api/charging-stations/:id
// @access  Private
const deleteChargingStation = asyncHandler(async (req, res) => {
  const chargingStation = await ChargingStation.findById(req.params.id);

  if (chargingStation) {
    await ChargingStation.deleteOne({ _id: req.params.id });
    res.json({ message: 'Charging station removed' });
  } else {
    res.status(404);
    throw new Error('Charging station not found');
  }
});

export {
  createChargingStation,
  getChargingStations,
  getChargingStationById,
  updateChargingStation,
  deleteChargingStation
};