// models/BookingAttempt.js
const mongoose = require("mongoose");

const bookingAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  attemptCount: {
    type: Number,
    default: 1,
  },
  firstAttemptTime: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Auto-delete old records after 15 minutes (cleanup)
bookingAttemptSchema.index({ firstAttemptTime: 1 }, { expireAfterSeconds: 900 });

module.exports = mongoose.model("BookingAttempt", bookingAttemptSchema);