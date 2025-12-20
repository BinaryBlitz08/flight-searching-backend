const mongoose = require("mongoose");

const bookingAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight"
  },
  attemptCount: {
    type: Number,
    default: 1
  },
  firstAttemptTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("BookingAttempt", bookingAttemptSchema);
