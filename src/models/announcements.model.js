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
      enum: ["General", "Gate-change", "Delay", "Boarding", "Cancellation"],
      default: "general",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
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
