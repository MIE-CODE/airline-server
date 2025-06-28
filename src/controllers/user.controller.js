const mongoose = require("mongoose");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    if (newUser) {
      res.status(200).json({ message: "User Created", data: newUser });
    }
  } catch (error) {
    console.log(error.message);
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (users) {
      res.status(200).json({ message: "Users", data: users });
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
const getUserBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "User id must be a valid id" });
  }
  try {
    const booking = await Booking.find({ user: id }).sort({ createdAt: -1 });
    if (!booking) {
      return res.status(404).json({ message: "User bookings not found" });
    }
    res.status(200).json({ message: "User Bookings", data: booking });
  } catch (error) {
    throw new Error(error.message);
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "User id must be a valid id" });
  }
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Deleted", data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "User id must be a valid id" });
  }
  try {
    const user = await User.findByIdAndUpdate(id, { ...req.body });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User Updated", data: user });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
  getUserBooking,
};
