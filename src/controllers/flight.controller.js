const mongoose = require("mongoose");
const Flight = require("../models/flight.model");
const User = require("../models/user.model");

const getFlights = async (req, res) => {
  try {
    const flight = await Flight.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: "Flights", data: flight });
  } catch (error) {
    console.log(error.message);
  }
};

const createFlight = async (req, res) => {
  const {
    airline,
    flightNumber,
    from,
    to,
    departureTime,
    arrivalTime,
    totalSeats,
    seatsAvailable,
    price,
    flightClass,
    user,
  } = req.body;
  try {
    const adminUser = await User.find({ _id: user });
    if (adminUser.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create flight" });
    }
    const flight = await Flight.create({
      airline,
      flightNumber,
      from,
      to,
      departureTime,
      arrivalTime,
      totalSeats,
      seatsAvailable,
      price,
      flightClass,
    });
    res.status(201).json({ message: "Flight created", data: flight });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getFlight = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Flight id must be a mongodb id" });
  }
  try {
    const flight = await Flight.findById(id);
    if (!flight) {
      return res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json({ message: flight });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const updateFlight = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Flight id must be a mongodb id" });
  }
  try {
    const flight = await Flight.findByIdAndUpdate(id, { ...req.body });
    if (!flight) {
      res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json({ message: "Flight Updated", data: flight });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
const deleteFlight = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Flight id must be a mongodb id" });
  }
  try {
    const flight = await Flight.findByIdAndDelete(id);
    if (!flight) {
      res.status(404).json({ message: "Flight not found" });
    }
    res.status(200).json({ message: "Flight deleted", data: flight });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  getFlights,
  createFlight,
  getFlight,
  updateFlight,
  deleteFlight,
};
