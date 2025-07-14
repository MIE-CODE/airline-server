const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: false,
    },
    type: {
      type: String,
      enum: ["general", "gate-change", "delay", "boarding", "cancellation"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    createdBy: {
      type: String,
      default: "System",
    },
    expiresAt: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
