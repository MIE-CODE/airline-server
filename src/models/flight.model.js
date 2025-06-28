const mongoose = require("mongoose");
const flightSchema = new mongoose.Schema(
  {
    airline: {
      type: String,
      required: true,
    },
    flightNumber: {
      type: String,
      required: true,
      unique: true,
    },
    from: {
      type: String,
      required: true,
      uppercase: true,
    },
    to: {
      type: String,
      required: true,
      uppercase: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    totalSeats: {
      type: Number,
      default: 10,
      required: true,
    },
    seatsAvailable: {
      type: Number,
      default: 10,
    },
    price: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      enum: ["economy", "business", "first"],
      default: "economy",
    },
  },
  { collection: "flights" },
  { timestamps: true }
);

module.exports = mongoose.model("flights", flightSchema);
