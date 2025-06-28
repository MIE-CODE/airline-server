const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    flight: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatNumber: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
