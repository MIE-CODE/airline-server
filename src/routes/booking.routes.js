const express = require("express");
const router = express.Router();

const {
  bookFlight,
  getBookingById,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/booking.controller");
router.post("/bookings", bookFlight);
router.get("/bookings", getAllBookings);
router.get("/bookings/:id", getBookingById);
router.patch("/bookings/:id", updateBooking);
router.delete("/bookings/:id", deleteBooking);
module.exports = router;
