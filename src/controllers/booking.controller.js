const mongoose = require("mongoose");
const Booking = require("../models/booking.model");
const Flight = require("../models/flight.model");
const bookFlight = async (req, res) => {
  const { flight, user, seatNumber, bookingDate, status, payment } = req.body;

  try {
    const booking = await Booking.create({
      flight,
      user,
      seatNumber,
      bookingDate,
      status,
      payment,
    });
    if (!booking) {
      res.status(400).json({ message: "Failed to book" });
    }
    res.status(201).json({ message: "Booked", data: booking });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occured" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find(req.id).sort({ createdAt: -1 });

    const populatedBookings = await Promise.all(
      bookings.map(async (val) => {
        const flight = await Flight.findById(val.flight);
        return {
          ...val.toObject(),
          flight,
        };
      })
    );

    if (bookings) {
      res.status(200).json({
        message: "Bookings",
        data: populatedBookings,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getBookingById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Provide a valid booking id" });
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking", data: booking });
  } catch (error) {
    res.status(400).json({ message: "An Error occured" });
  }
};
const updateBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Provide a valid booking id" });
  try {
    const booking = await Booking.findByIdAndUpdate(id, { ...req.body });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking updated", data: booking });
  } catch (error) {
    res.status(400).json({ message: "An Error occured" });
  }
};
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Provide a valid booking id" });
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted", data: booking });
  } catch (error) {
    res.status(400).json({ message: "An Error occured" });
  }
};
module.exports = {
  bookFlight,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
