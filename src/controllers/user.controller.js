const mongoose = require("mongoose");
const User = require("../models/user.model");
const Booking = require("../models/booking.model");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETE, { expiresIn: "3d" });
};
const createUser = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const role = isAdmin ? "admin" : "user";
  if (!name || !email || !password) {
    return res.status(400).json({ massage: "provide all fields" });
  }
  try {
    const newUser = await User.signup(name, email, password, role);
    if (!newUser) {
      return res.status(400).json({ message: "Unknown error", data: newUser });
    }
    const token = createToken(newUser._id);
    res.status(201).json({ name, email, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    if (!users) {
      res.status(400).json({ message: "Failed", data: users });
    }
    res.status(200).json({ message: "Users", data: users });
  } catch (error) {
    return res.status(400).json({ error: error.message });
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
      return res.status(404).json({ message: "Users not found" });
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
  loginUser,
};
